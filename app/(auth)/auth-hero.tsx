/* eslint-disable react-hooks/refs */
"use client"

/**
 * Miransas — coming soon (liquid particle)
 * by guglielmogiannattasio.it
 *
 * The sculpture is rebuilt from ~100k GPU-simulated particles sampled from
 * its own pixels. The cursor turns the material liquid; it settles back into
 * the crisp image. Without WebGL2 the static image is shown.
 */

import * as React from "react"

/* ────────────────────────────────────────────────────────────────────
   Engine (WebGL2 GPGPU particles)
   ──────────────────────────────────────────────────────────────────── */

type Rect = { x: number; y: number; w: number; h: number }

interface EngineOptions {
  interactive: boolean
  strength: number
  radius: number
  density: number
  dotSize: number
  spread: number
  turbulence: number
  returnSpeed: number
  streaks: boolean
  restStyle: "image" | "particles"
  ambient: boolean
  ambientIntensity: number
  speed: number
  intro: boolean
  reducedMotion: boolean
  bg: [number, number, number]
  /** null = detected from the image corners */
  imgBg: [number, number, number] | null
  /** 0 – 2: how much the whole sculpture flows while the cursor is over it */
  liquid: number
}

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v))
}

function hexToRgb(hex: string, fallback: [number, number, number]): [number, number, number] {
  if (typeof hex !== "string") return fallback
  const s = hex.trim()
  let m = s.match(/^#?([0-9a-f]{3})$/i)
  if (m) {
    const [r, g, b] = m[1].split("").map((c) => parseInt(c + c, 16) / 255)
    return [r, g, b]
  }
  m = s.match(/^#?([0-9a-f]{6})([0-9a-f]{2})?$/i)
  if (m) {
    const n = parseInt(m[1], 16)
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
  }
  m = s.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i)
  if (m) return [+m[1] / 255, +m[2] / 255, +m[3] / 255]
  return fallback
}

/* ── shaders ─────────────────────────────────────────────────────────── */

const NOISE = `
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*f*(f*(f*6.0-15.0)+10.0);
  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x), mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x), u.y); }
vec2 ambientField(vec2 uv, float t){
  vec2 q = uv*vec2(3.2,1.7);
  vec2 a = vec2(vnoise(q+vec2(t*0.11,0.0))-0.5, vnoise(q+vec2(5.2,t*0.08)+3.1)-0.5);
  vec2 q2 = uv*vec2(7.5,4.0) + vec2(-t*0.19, t*0.13);
  vec2 b = vec2(vnoise(q2+1.7)-0.5, vnoise(q2+9.3)-0.5);
  return a + b*0.45;
}
`

/* energy of the material at a point: shared by image and particles so the
   cross-fade is exactly complementary */
const ENERGY = `
float energyAt(vec2 rectPx, vec2 mouse, float radius, float presence, float wakeEnergy){
  vec2 d = rectPx - mouse;
  float f = exp(-dot(d,d)/(radius*radius))*presence;
  return smoothstep(0.06, 0.5, f*1.15 + wakeEnergy*1.7);
}
`

const QUAD_VS = `#version 300 es
layout(location=0) in vec2 aPos;
out vec2 vUv;
void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }
`

/* Flow map (cursor wake). RGBA8: velocity encoded around 128, energy in B. */
const FLOW_FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uPrev;
uniform vec2 uTexel;
uniform vec2 uMouse;
uniform vec2 uVel;
uniform vec2 uSize;
uniform float uRadius;
uniform float uPresence;
uniform float uDecay;
vec2 decV(vec4 c){ return (c.rg*255.0-128.0)/127.0; }
void main(){
  vec2 v0 = decV(texture(uPrev, vUv));
  vec2 uv = vUv - v0*uTexel*2.5;
  vec4 c = texture(uPrev, uv)*0.52
    + 0.12*(texture(uPrev, uv+vec2(uTexel.x,0.0)) + texture(uPrev, uv-vec2(uTexel.x,0.0))
          + texture(uPrev, uv+vec2(0.0,uTexel.y)) + texture(uPrev, uv-vec2(0.0,uTexel.y)));
  vec2 v = decV(c);
  float p = c.b;
  vec2 d = (vUv-uMouse)*uSize;
  float f = exp(-dot(d,d)/(uRadius*uRadius))*uPresence;
  float sp = clamp(length(uVel)*2.5, 0.0, 1.0);
  v += uVel*f*0.22;
  p = max(p, f*sp);
  v *= uDecay;
  p *= uDecay;
  v = sign(v)*max(abs(v)-1.2/127.0, 0.0);
  p = max(p-1.2/255.0, 0.0);
  v = clamp(v, -1.0, 1.0);
  o = vec4((v*127.0+128.0)/255.0, p, 1.0);
}
`

/* GPGPU step: state = (offset.xy, velocity.xy) in rect CSS px. */
const SIM_FS = `#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uState;
uniform sampler2D uHome;
uniform sampler2D uFlow;
uniform vec2 uSize;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uPresence;
uniform float uStrength;
uniform float uSpread;
uniform float uTurb;
uniform float uReturn;
uniform float uTime;
uniform float uDt;
uniform float uIntro;
${NOISE}
vec2 curl(vec2 p){
  const float e = 0.35;
  float a = vnoise(p+vec2(0.0,e)) - vnoise(p-vec2(0.0,e));
  float b = vnoise(p+vec2(e,0.0)) - vnoise(p-vec2(e,0.0));
  return vec2(a, -b)/(2.0*e);
}
void main(){
  ivec2 ij = ivec2(gl_FragCoord.xy);
  vec4 hm = texelFetch(uHome, ij, 0);
  if(hm.w <= 0.0){ o = vec4(0.0); return; }
  vec4 st = texelFetch(uState, ij, 0);
  vec2 off = st.xy;
  vec2 vel = st.zw;
  float sd = hm.z;
  float light = 0.45 + sd*1.1;

  vec2 p = hm.xy*uSize + off;
  vec4 fl = texture(uFlow, clamp(p/uSize, 0.0, 1.0));
  vec2 wake = (fl.rg*255.0-128.0)/127.0;
  float pr = fl.b;

  vec2 toM = p - uMouse;
  float r2 = dot(toM,toM);
  float f = exp(-r2/(uRadius*uRadius))*uPresence;
  vec2 n = toM*inversesqrt(r2+1.0);
  float e = clamp(pr*2.0 + f, 0.0, 1.0);

  vec2 acc = vec2(0.0);
  // blown outward and swirled around the cursor
  acc += n*f*1.25*uStrength*uSpread*light;
  acc += vec2(-n.y, n.x)*f*1.45*uStrength*uSpread*(0.4+sd);
  // carried by the liquid wake
  acc += (wake*42.0*uSpread*light - vel)*e*0.08;
  // curl-noise turbulence where the material is disturbed (and during the intro)
  vec2 q = p*0.0095 + vec2(uTime*0.35, -uTime*0.2);
  vec2 c = curl(q) + 0.5*curl(q*2.3 + 7.1);
  acc += c*(e*1.2*uSpread + uIntro*1.5)*uTurb*light;
  // elastic return home
  float k = (0.006 + 0.02*uReturn)*(0.65+sd*0.7)*(1.0 - uIntro*0.75);
  acc -= off*k;

  vel += acc*uDt;
  vel *= pow(mix(0.93, 0.955, e), uDt);
  off += vel*uDt;
  if(dot(off,off) < 0.0004 && dot(vel,vel) < 0.0004){ off = vec2(0.0); vel = vec2(0.0); }
  o = vec4(off, vel);
}
`

/* Particles: one instanced quad per particle, a capsule stretched along velocity. */
const PART_VS = `#version 300 es
precision highp float;
layout(location=0) in vec2 aCorner;
uniform sampler2D uState;
uniform sampler2D uHome;
uniform sampler2D uCol;
uniform sampler2D uFlow;
uniform int uTexW;
uniform vec4 uRect;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uPresence;
uniform float uDot;
uniform float uTime;
uniform float uAmbient;
uniform float uStreak;
uniform float uIntroVis;
uniform float uRest;
uniform vec3 uTint;
out vec2 vLocal;
out float vHalfLen;
out float vR;
out vec3 vCol;
out float vA;
${NOISE}
${ENERGY}
void main(){
  int id = gl_InstanceID;
  ivec2 ij = ivec2(id % uTexW, id / uTexW);
  vec4 hm = texelFetch(uHome, ij, 0);
  vec4 st = texelFetch(uState, ij, 0);
  vec4 cl = texelFetch(uCol, ij, 0);

  float wakeE = texture(uFlow, hm.xy).b;
  float E = energyAt(hm.xy*uRect.zw, uMouse, uRadius, uPresence, wakeE);
  float lift = smoothstep(0.35, 2.5, length(st.xy));
  float a = max(max(E, lift), max(uRest, 1.0-uIntroVis));
  if(a < 0.01 || hm.w <= 0.0){ gl_Position = vec4(2.0,2.0,2.0,1.0); return; }

  vec2 base = uRect.xy + hm.xy*uRect.zw + st.xy;
  base -= ambientField(hm.xy, uTime)*10.0*uAmbient;

  vec2 v = st.zw;
  float sp = length(v);
  vec2 dir = sp > 0.001 ? v/sp : vec2(1.0,0.0);
  float r = uDot*hm.w*0.5;
  float len = min(sp*1.25, 18.0)*uStreak;
  vec2 lc = aCorner*vec2(r + len*0.5 + 1.0, r + 1.0);
  vec2 center = base - dir*len*0.5;
  vec2 world = center + dir*lc.x + vec2(-dir.y, dir.x)*lc.y;

  vec2 clip = world/uRes*2.0-1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  vLocal = lc;
  vHalfLen = len*0.5;
  vR = r;
  vec3 col = cl.rgb*uTint;
  // fast material catches the light, like liquid metal
  float glint = smoothstep(2.0, 16.0, sp);
  col = mix(col, min(col*1.18 + vec3(0.07,0.075,0.085), vec3(1.0)), glint*0.75);
  vCol = col;
  vA = a;
}
`

const PART_FS = `#version 300 es
precision highp float;
in vec2 vLocal;
in float vHalfLen;
in float vR;
in vec3 vCol;
in float vA;
uniform float uDpr;
out vec4 o;
void main(){
  vec2 q = vec2(max(abs(vLocal.x)-vHalfLen, 0.0), vLocal.y);
  float d = length(q) - vR;
  float a = clamp(0.5 - d*uDpr, 0.0, 1.0);
  // comet tail: the trailing end thins out
  float tail = vHalfLen > 0.0 ? clamp(0.5 - vLocal.x/(2.0*(vHalfLen+vR)), 0.0, 1.0) : 0.0;
  a *= 1.0 - tail*0.55;
  a *= vA;
  if(a < 0.004) discard;
  o = vec4(vCol*a, a);
}
`

/* Image pass: the crisp sculpture, gently lensed, fading out where the
   material has turned liquid. */
const IMAGE_FS = `#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uImg;
uniform sampler2D uFlow;
uniform vec2 uRes;
uniform float uDpr;
uniform vec4 uRect;
uniform vec3 uBg;
uniform vec3 uImgBg;
uniform vec2 uMouse;
uniform float uPresence;
uniform float uRadius;
uniform float uStrength;
uniform float uTime;
uniform float uAmbient;
uniform float uIntroVis;
uniform float uRest;
uniform float uAlphaMode;
${NOISE}
${ENERGY}
void main(){
  vec2 px = vec2(gl_FragCoord.x, uRes.y*uDpr - gl_FragCoord.y)/uDpr;
  vec2 size = uRect.zw;
  vec2 uv = (px-uRect.xy)/size;
  if(uv.x < -0.05 || uv.x > 1.05 || uv.y < -0.12 || uv.y > 1.12){ o = vec4(0.0); return; }
  vec4 fl = texture(uFlow, clamp(uv,0.0,1.0));
  vec2 vel = (fl.rg*255.0-128.0)/127.0;
  vec2 rp = uv*size;
  vec2 toM = rp - uMouse;
  float fall = exp(-dot(toM,toM)/(uRadius*uRadius))*uPresence;
  vec2 disp = -toM*0.22*uStrength*fall - vel*10.0*uStrength;
  disp += ambientField(uv, uTime)*10.0*uAmbient;
  vec2 suv = uv + disp/size;
  vec4 tx = texture(uImg, suv);
  vec3 col = tx.rgb;
  vec2 e = smoothstep(vec2(0.0), vec2(0.004,0.01), suv) * smoothstep(vec2(1.0), vec2(0.996,0.99), suv);
  // cut-out images carry their own alpha; flat-background images are keyed by colour
  float key = uAlphaMode > 0.5 ? tx.a : smoothstep(0.012, 0.05, length(col-uImgBg));
  float k = key*e.x*e.y;
  float E = energyAt(rp, uMouse, uRadius, uPresence, fl.b);
  float show = (1.0 - max(E, uRest))*uIntroVis;
  vec3 mat = uAlphaMode > 0.5 ? col : col*(uBg/max(uImgBg, vec3(0.001)));
  // premultiplied: empty areas stay transparent so the page (and the backdrop word) shows through
  float A = k*show;
  o = vec4(mat*A, A);
}
`

/* ── helpers ─────────────────────────────────────────────────────────── */

type Prog = { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null> }

function compile(gl: WebGL2RenderingContext, vs: string, fs: string): Prog {
  const make = (type: number, src: string) => {
    const sh = gl.createShader(type)!
    gl.shaderSource(sh, src)
    gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(sh)
      gl.deleteShader(sh)
      throw new Error("Shader: " + log)
    }
    return sh
  }
  const p = gl.createProgram()!
  const v = make(gl.VERTEX_SHADER, vs)
  const f = make(gl.FRAGMENT_SHADER, fs)
  gl.attachShader(p, v)
  gl.attachShader(p, f)
  gl.bindAttribLocation(p, 0, "aPos")
  gl.linkProgram(p)
  gl.deleteShader(v)
  gl.deleteShader(f)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error("Link: " + gl.getProgramInfoLog(p))
  const u: Record<string, WebGLUniformLocation | null> = {}
  const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS)
  for (let i = 0; i < n; i++) {
    const info = gl.getActiveUniform(p, i)
    if (info) u[info.name] = gl.getUniformLocation(p, info.name)
  }
  return { p, u }
}

/* ── engine ──────────────────────────────────────────────────────────── */

const TEX_W = 1024
const SETTLE_FRAMES = 270

class LiquidEngine {
  lastImage: HTMLImageElement | null = null
  /** Called once, after the first frame has actually been drawn. */
  onFirstFrame: (() => void) | null = null

  private canvas: HTMLCanvasElement
  private gl: WebGL2RenderingContext
  private opts: EngineOptions
  private onFail: () => void
  private lowPower = false
  private stateFormat: { internal: number; type: number } = { internal: 0, type: 0 }

  private pFlow!: Prog
  private pSim!: Prog
  private pPart!: Prog
  private pImg!: Prog
  private vao!: WebGLVertexArrayObject
  private quad!: WebGLBuffer

  private imgTex: WebGLTexture | null = null
  private flowTex: WebGLTexture[] = []
  private flowFb: WebGLFramebuffer[] = []
  private flowW = 256
  private flowH = 104
  private flowIdx = 0
  private flowDirty = false

  private homeTex: WebGLTexture | null = null
  private colTex: WebGLTexture | null = null
  private stateTex: WebGLTexture[] = []
  private stateFb: WebGLFramebuffer[] = []
  private stateIdx = 0
  private texH = 1
  private n = 0
  private gridW = 1
  private stateDirty = false
  private alphaMode = false
  private imgBg: [number, number, number] = [0.918, 0.914, 0.906]
  private flowing = 0

  private aspect = 2.5
  private rect: Rect = { x: 0, y: 0, w: 1, h: 1 }
  private cssW = 1
  private cssH = 1

  private target = { x: -9999, y: -9999 }
  private mouse = { x: -9999, y: -9999 }
  private prevMouse = { x: -9999, y: -9999 }
  private mvel = { x: 0, y: 0 }
  private presence = 0
  private presenceTarget = 0
  private burst = 0
  private lastInput = -1e9
  private settle = 1e9
  private touchRelease = 0

  private time = 0
  private introT = 1
  private raf = 0
  private running = false
  private last = 0
  private skip = 0
  private visible = true
  private ready = false
  private destroyed = false
  private lost = false

  constructor(canvas: HTMLCanvasElement, opts: EngineOptions, onFail: () => void) {
    this.canvas = canvas
    this.opts = opts
    this.onFail = onFail
    // alpha: an unpresented canvas stays transparent, so the static image under it shows
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    }) as WebGL2RenderingContext | null
    if (!gl) throw new Error("WebGL2 unavailable")
    this.gl = gl
    const nav = navigator as Navigator & { deviceMemory?: number }
    this.lowPower =
      (nav.hardwareConcurrency || 8) <= 4 ||
      (nav.deviceMemory || 8) <= 4 ||
      window.matchMedia("(pointer: coarse)").matches
    this.initGL()
    canvas.addEventListener("webglcontextlost", this.onLost, false)
  }

  private onLost = (e: Event) => {
    e.preventDefault()
    this.lost = true
    this.stop()
    this.onFail()
  }

  private initGL() {
    const gl = this.gl
    // float render targets: RGBA16F is enough (offsets in px, sub-pixel precision)
    const full = gl.getExtension("EXT_color_buffer_float")
    const half = full ? null : gl.getExtension("EXT_color_buffer_half_float")
    if (!full && !half) throw new Error("No float render targets")
    this.stateFormat = { internal: gl.RGBA16F, type: gl.HALF_FLOAT }

    this.pFlow = compile(gl, QUAD_VS, FLOW_FS)
    this.pSim = compile(gl, QUAD_VS, SIM_FS)
    this.pPart = compile(gl, PART_VS, PART_FS)
    this.pImg = compile(gl, QUAD_VS, IMAGE_FS)

    this.vao = gl.createVertexArray()!
    gl.bindVertexArray(this.vao)
    this.quad = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    for (let i = 0; i < 2; i++) {
      const t = this.makeTex(gl.RGBA8, this.flowW, this.flowH, gl.RGBA, gl.UNSIGNED_BYTE, null, gl.LINEAR)
      const fb = gl.createFramebuffer()!
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0)
      this.flowTex.push(t)
      this.flowFb.push(fb)
    }
    this.clearFlow()
  }

  private makeTex(
    internal: number,
    w: number,
    h: number,
    format: number,
    type: number,
    data: ArrayBufferView | null,
    filter: number
  ) {
    const gl = this.gl
    const t = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_2D, t)
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, data)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    return t
  }

  private clearFlow() {
    const gl = this.gl
    for (const fb of this.flowFb) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
      gl.viewport(0, 0, this.flowW, this.flowH)
      gl.clearColor(128 / 255, 128 / 255, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    this.flowDirty = false
  }

  private clearState() {
    const gl = this.gl
    for (const fb of this.stateFb) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
      gl.viewport(0, 0, TEX_W, this.texH)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    this.stateDirty = false
  }

  setImage(img: HTMLImageElement) {
    if (this.destroyed || this.lost) return
    const gl = this.gl
    this.lastImage = img
    this.aspect = img.naturalWidth / img.naturalHeight || 2.5
    this.flowH = Math.max(32, Math.round(this.flowW / this.aspect))
    for (const t of this.flowTex) {
      gl.bindTexture(gl.TEXTURE_2D, t)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, this.flowW, this.flowH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    }
    this.clearFlow()
    if (this.imgTex) gl.deleteTexture(this.imgTex)
    this.imgTex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this.imgTex)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
    gl.generateMipmap(gl.TEXTURE_2D)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    this.buildParticles(img)
    this.ready = true
    if (this.opts.intro && !this.opts.reducedMotion) this.startIntro()
    this.wake()
  }

  /** One particle per material pixel of a grid laid over the image. */
  private buildParticles(img: HTMLImageElement) {
    const gl = this.gl
    const baseGrid = this.lowPower ? 640 : 1000
    const gw = Math.round(baseGrid * Math.sqrt(clamp(this.opts.density, 0.15, 2)))
    const gh = Math.max(1, Math.round(gw / this.aspect))
    this.gridW = gw
    let data: Uint8ClampedArray
    try {
      const c = document.createElement("canvas")
      c.width = gw
      c.height = gh
      const ctx = c.getContext("2d", { willReadFrequently: true })!
      ctx.imageSmoothingQuality = "high"
      ctx.drawImage(img, 0, 0, gw, gh)
      data = ctx.getImageData(0, 0, gw, gh).data
    } catch {
      throw new Error("Image is not CORS-readable")
    }
    // a cut-out (transparent) image is sampled by alpha, a flat one by colour distance
    let transparent = 0
    for (let i = 3; i < data.length; i += 4 * 7) if (data[i] < 250) transparent++
    this.alphaMode = transparent > data.length / (4 * 7) / 20
    if (this.opts.imgBg) this.imgBg = this.opts.imgBg
    else if (!this.alphaMode) {
      // flat background: average the four corners
      let r = 0, g = 0, b = 0, n = 0
      const pw = Math.max(2, Math.round(gw * 0.012))
      for (const [cx, cy] of [[0, 0], [gw - pw, 0], [0, gh - pw], [gw - pw, gh - pw]]) {
        for (let y = cy; y < cy + pw; y++)
          for (let x = cx; x < cx + pw; x++) {
            const i = (y * gw + x) * 4
            r += data[i]; g += data[i + 1]; b += data[i + 2]; n++
          }
      }
      this.imgBg = [r / n / 255, g / n / 255, b / n / 255]
    }
    const home: number[] = []
    const col: number[] = []
    for (let y = 0; y < gh; y++) {
      for (let x = 0; x < gw; x++) {
        const i = (y * gw + x) * 4
        const r = data[i] / 255
        const g = data[i + 1] / 255
        const b = data[i + 2] / 255
        if (this.alphaMode) {
          const a = data[i + 3] / 255
          if (a < 0.12) continue
          if (a < 0.5 && Math.random() > a * 2) continue
        } else {
          const dev = Math.hypot(r - this.imgBg[0], g - this.imgBg[1], b - this.imgBg[2])
          if (dev < 0.03) continue
          if (dev < 0.07 && Math.random() > (dev - 0.03) / 0.04) continue
        }
        const jx = (Math.random() - 0.5) * 0.6
        const jy = (Math.random() - 0.5) * 0.6
        home.push((x + 0.5 + jx) / gw, (y + 0.5 + jy) / gh, Math.random(), 0.85 + Math.random() * 0.3)
        col.push(data[i], data[i + 1], data[i + 2], 255)
      }
    }
    const n = home.length / 4
    this.n = n
    this.texH = Math.max(1, Math.ceil(n / TEX_W))
    const total = TEX_W * this.texH
    const homeArr = new Float32Array(total * 4)
    homeArr.set(home)
    const colArr = new Uint8Array(total * 4)
    colArr.set(col)

    for (const t of [this.homeTex, this.colTex, ...this.stateTex]) if (t) gl.deleteTexture(t)
    for (const f of this.stateFb) gl.deleteFramebuffer(f)
    this.stateTex = []
    this.stateFb = []
    this.homeTex = this.makeTex(gl.RGBA32F, TEX_W, this.texH, gl.RGBA, gl.FLOAT, homeArr, gl.NEAREST)
    this.colTex = this.makeTex(gl.RGBA8, TEX_W, this.texH, gl.RGBA, gl.UNSIGNED_BYTE, colArr, gl.NEAREST)
    for (let i = 0; i < 2; i++) {
      const t = this.makeTex(this.stateFormat.internal, TEX_W, this.texH, gl.RGBA, this.stateFormat.type, null, gl.NEAREST)
      const fb = gl.createFramebuffer()!
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0)
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) throw new Error("Float FBO incomplete")
      this.stateTex.push(t)
      this.stateFb.push(fb)
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    this.homeData = homeArr
    this.clearState()
  }

  private homeData: Float32Array | null = null

  private startIntro() {
    const gl = this.gl
    const home = this.homeData
    if (!home) return
    const w = this.rect.w > 10 ? this.rect.w : 1300
    const total = TEX_W * this.texH
    const st = new Float32Array(total * 4)
    for (let i = 0; i < this.n; i++) {
      const hx = home[i * 4] - 0.5
      const hy = home[i * 4 + 1] - 0.5
      const sd = home[i * 4 + 2]
      const ang = (Math.random() - 0.5) * 0.9 + (hx > 0 ? 0 : Math.PI)
      const dist = w * (0.04 + Math.random() * 0.14) * (0.5 + Math.abs(hx) * 1.4)
      st[i * 4] = Math.cos(ang) * dist + hx * w * 0.25 * sd
      st[i * 4 + 1] = Math.sin(ang) * dist * 0.55 + hy * 120 * (Math.random() - 0.5)
    }
    gl.bindTexture(gl.TEXTURE_2D, this.stateTex[this.stateIdx])
    gl.texImage2D(gl.TEXTURE_2D, 0, this.stateFormat.internal, TEX_W, this.texH, 0, gl.RGBA, gl.FLOAT, st)
    this.introT = 0
    this.stateDirty = true
  }

  setOptions(o: Partial<EngineOptions>) {
    const rebuild =
      (o.density !== undefined && o.density !== this.opts.density) ||
      (o.imgBg !== undefined && String(o.imgBg) !== String(this.opts.imgBg))
    this.opts = { ...this.opts, ...o }
    if (rebuild && this.ready && this.lastImage) {
      try {
        this.buildParticles(this.lastImage)
      } catch {
        this.onFail()
      }
    }
    this.wake()
  }

  resize(cssW: number, cssH: number, rect: Rect) {
    this.cssW = Math.max(1, cssW)
    this.cssH = Math.max(1, cssH)
    this.rect = rect
    let dpr = Math.min(window.devicePixelRatio || 1, this.lowPower ? 1.5 : 2)
    const px = this.cssW * this.cssH * dpr * dpr
    if (px > 4.5e6) dpr = Math.max(1, Math.sqrt(4.5e6 / (this.cssW * this.cssH)))
    const w = Math.round(this.cssW * dpr)
    const h = Math.round(this.cssH * dpr)
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w
      this.canvas.height = h
    }
    this.draw()
  }

  setVisible(v: boolean) {
    this.visible = v
    if (v) this.wake()
    else this.stop()
  }

  pointer(type: "move" | "down" | "up" | "leave", x: number, y: number, touch: boolean) {
    if (!this.opts.interactive || this.lost) return
    const now = performance.now()
    if (type === "leave" || type === "up") {
      if (touch) this.touchRelease = now + 260
      else this.presenceTarget = 0
      this.wake()
      return
    }
    if (this.mouse.x < -9000 || type === "down") {
      this.mouse.x = this.prevMouse.x = x
      this.mouse.y = this.prevMouse.y = y
    }
    this.target.x = x
    this.target.y = y
    this.presenceTarget = 1
    this.lastInput = now
    this.settle = 0
    if (type === "down") {
      this.burst = 1
      this.touchRelease = 0
    }
    this.wake()
  }

  private wake() {
    if (!this.ready || this.running || !this.visible || this.destroyed || this.lost) {
      if (this.ready && !this.running) this.draw()
      return
    }
    this.running = true
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.frame)
  }

  private stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  private radiusPx() {
    return this.opts.radius * clamp(this.rect.w / 1400, 0.6, 1.25)
  }

  private strength() {
    return this.opts.strength * (this.opts.reducedMotion ? 0.5 : 1)
  }

  private frame = (now: number) => {
    if (!this.running) return
    const rawMs = now - this.last
    const dt = clamp(rawMs / 16.6667, 0.25, 3)
    this.last = now
    const o = this.opts
    const ambientOn = o.ambient && !o.reducedMotion

    if (this.touchRelease && now > this.touchRelease) {
      this.presenceTarget = 0
      this.touchRelease = 0
    }
    const ease = 1 - Math.pow(1 - 0.22, dt)
    this.mouse.x += (this.target.x - this.mouse.x) * ease
    this.mouse.y += (this.target.y - this.mouse.y) * ease
    const vx = (this.mouse.x - this.prevMouse.x) / dt
    const vy = (this.mouse.y - this.prevMouse.y) / dt
    this.prevMouse.x = this.mouse.x
    this.prevMouse.y = this.mouse.y
    this.mvel.x += (clamp(vx, -60, 60) - this.mvel.x) * 0.5
    this.mvel.y += (clamp(vy, -60, 60) - this.mvel.y) * 0.5
    const pk = this.presenceTarget > this.presence ? 0.1 : 0.035
    this.presence += (this.presenceTarget - this.presence) * (1 - Math.pow(1 - pk, dt))
    if (this.presence < 0.001 && this.presenceTarget === 0) this.presence = 0
    const fk = this.presenceTarget > this.flowing ? 0.05 : 0.018
    this.flowing += (this.presenceTarget - this.flowing) * (1 - Math.pow(1 - fk, dt))
    if (this.flowing < 0.002 && this.presenceTarget === 0) this.flowing = 0
    if (this.introT < 1) this.introT = Math.min(1, this.introT + Math.min(rawMs, 100) / 3200)

    const interacting = this.presence > 0.001 || this.burst > 0
    // settle is counted in simulated frames, so slow devices never snap mid-return
    this.settle = interacting ? 0 : this.settle + dt
    const active = interacting || this.settle < SETTLE_FRAMES || this.introT < 1

    if (!active) {
      if (this.flowDirty) this.clearFlow()
      if (this.stateDirty) this.clearState()
      if (!ambientOn) {
        this.draw()
        this.firstFrame()
        this.stop()
        return
      }
      this.raf = requestAnimationFrame(this.frame)
      if (this.skip++ % 2) return
      this.time += (dt * 2 * o.speed) / 60
      this.draw()
      this.firstFrame()
      return
    }
    this.raf = requestAnimationFrame(this.frame)
    // the field speeds up while the material is being stirred
    this.time += (dt * o.speed * (1 + this.flowing * 1.6)) / 60
    this.stepFlow(dt)
    this.stepSim(dt)
    this.burst = Math.max(0, this.burst - 0.1 * dt)
    this.draw()
    this.firstFrame()
  }

  private firstFrame() {
    if (this.onFirstFrame) {
      const cb = this.onFirstFrame
      this.onFirstFrame = null
      // one more frame so the compositor has presented the canvas
      requestAnimationFrame(() => cb())
    }
  }

  private stepFlow(dt: number) {
    const gl = this.gl
    const P = this.pFlow
    const dst = 1 - this.flowIdx
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.flowFb[dst])
    gl.viewport(0, 0, this.flowW, this.flowH)
    gl.disable(gl.BLEND)
    gl.useProgram(P.p)
    gl.bindVertexArray(this.vao)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx])
    gl.uniform1i(P.u.uPrev, 0)
    gl.uniform2f(P.u.uTexel, 1 / this.flowW, 1 / this.flowH)
    const r = this.rect
    gl.uniform2f(P.u.uMouse, (this.mouse.x - r.x) / r.w, (this.mouse.y - r.y) / r.h)
    gl.uniform2f(P.u.uVel, clamp(this.mvel.x / 40, -1, 1), clamp(this.mvel.y / 40, -1, 1))
    gl.uniform2f(P.u.uSize, r.w, r.h)
    gl.uniform1f(P.u.uRadius, this.radiusPx())
    gl.uniform1f(P.u.uPresence, Math.max(this.presence, this.burst))
    gl.uniform1f(P.u.uDecay, Math.pow(0.968, dt))
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    this.flowIdx = dst
    this.flowDirty = true
  }

  private stepSim(dt: number) {
    if (!this.n) return
    const gl = this.gl
    const P = this.pSim
    const o = this.opts
    const r = this.rect
    const dst = 1 - this.stateIdx
    const intro = o.reducedMotion || !o.intro ? 0 : Math.pow(1 - this.introT, 2)
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.stateFb[dst])
    gl.viewport(0, 0, TEX_W, this.texH)
    gl.disable(gl.BLEND)
    gl.useProgram(P.p)
    gl.bindVertexArray(this.vao)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.stateTex[this.stateIdx])
    gl.uniform1i(P.u.uState, 0)
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, this.homeTex)
    gl.uniform1i(P.u.uHome, 1)
    gl.activeTexture(gl.TEXTURE2)
    gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx])
    gl.uniform1i(P.u.uFlow, 2)
    gl.uniform2f(P.u.uSize, r.w, r.h)
    gl.uniform2f(P.u.uMouse, this.mouse.x - r.x, this.mouse.y - r.y)
    gl.uniform1f(P.u.uRadius, this.radiusPx())
    gl.uniform1f(P.u.uPresence, Math.max(this.presence, this.burst))
    gl.uniform1f(P.u.uStrength, this.strength() * (1 + this.burst * 1.5))
    gl.uniform1f(P.u.uSpread, clamp(o.spread, 0, 2))
    gl.uniform1f(P.u.uTurb, clamp(o.turbulence, 0, 2) * (o.reducedMotion ? 0.3 : 1))
    gl.uniform1f(P.u.uReturn, clamp(o.returnSpeed, 0, 2))
    gl.uniform1f(P.u.uTime, this.time)
    gl.uniform1f(P.u.uDt, dt)
    gl.uniform1f(P.u.uIntro, intro)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    this.stateIdx = dst
    this.stateDirty = true
  }

  private draw() {
    if (!this.ready || this.lost || this.destroyed) return
    const gl = this.gl
    const o = this.opts
    const r = this.rect
    const rm = o.reducedMotion
    const introVis = rm || !o.intro ? 1 : Math.pow(this.introT, 2.2)
    const base = o.ambient && !rm ? clamp(o.ambientIntensity, 0, 2) : 0
    const amb = base + this.flowing * 0.85 * clamp(o.liquid, 0, 2) * (rm ? 0.3 : 1)
    const rest = o.restStyle === "particles" ? 1 : 0
    const [br, bg, bb] = o.bg
    const [ir, ig, ib] = this.imgBg
    const dpr = this.canvas.width / this.cssW
    const pres = Math.max(this.presence, this.burst)
    const mx = this.mouse.x - r.x
    const my = this.mouse.y - r.y

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)
    gl.bindVertexArray(this.vao)
    gl.disable(gl.BLEND)

    const I = this.pImg
    gl.useProgram(I.p)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.imgTex)
    gl.uniform1i(I.u.uImg, 0)
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx])
    gl.uniform1i(I.u.uFlow, 1)
    gl.uniform2f(I.u.uRes, this.cssW, this.cssH)
    gl.uniform1f(I.u.uDpr, dpr)
    gl.uniform4f(I.u.uRect, r.x, r.y, r.w, r.h)
    gl.uniform3f(I.u.uBg, br, bg, bb)
    gl.uniform3f(I.u.uImgBg, ir, ig, ib)
    gl.uniform2f(I.u.uMouse, mx, my)
    gl.uniform1f(I.u.uPresence, pres)
    gl.uniform1f(I.u.uRadius, this.radiusPx())
    gl.uniform1f(I.u.uStrength, this.strength())
    gl.uniform1f(I.u.uTime, this.time)
    gl.uniform1f(I.u.uAmbient, amb)
    gl.uniform1f(I.u.uIntroVis, introVis)
    gl.uniform1f(I.u.uRest, rest)
    gl.uniform1f(I.u.uAlphaMode, this.alphaMode ? 1 : 0)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

    // particles are invisible at rest in "image" mode: skip them entirely
    if (!this.n || (!this.stateDirty && rest === 0 && introVis >= 1)) return

    const P = this.pPart
    gl.useProgram(P.p)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.stateTex[this.stateIdx])
    gl.uniform1i(P.u.uState, 0)
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, this.homeTex)
    gl.uniform1i(P.u.uHome, 1)
    gl.activeTexture(gl.TEXTURE2)
    gl.bindTexture(gl.TEXTURE_2D, this.colTex)
    gl.uniform1i(P.u.uCol, 2)
    gl.activeTexture(gl.TEXTURE3)
    gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx])
    gl.uniform1i(P.u.uFlow, 3)
    gl.uniform1i(P.u.uTexW, TEX_W)
    gl.uniform4f(P.u.uRect, r.x, r.y, r.w, r.h)
    gl.uniform2f(P.u.uRes, this.cssW, this.cssH)
    gl.uniform2f(P.u.uMouse, mx, my)
    gl.uniform1f(P.u.uRadius, this.radiusPx())
    gl.uniform1f(P.u.uPresence, pres)
    const spacing = r.w / this.gridW
    gl.uniform1f(P.u.uDot, spacing * 1.45 * clamp(o.dotSize, 0.2, 3))
    gl.uniform1f(P.u.uTime, this.time)
    gl.uniform1f(P.u.uAmbient, amb)
    gl.uniform1f(P.u.uStreak, (o.streaks ? 1 : 0) * (0.45 + 0.55 * introVis))
    gl.uniform1f(P.u.uIntroVis, introVis)
    gl.uniform1f(P.u.uRest, rest)
    gl.uniform1f(P.u.uDpr, dpr)
    if (this.alphaMode) gl.uniform3f(P.u.uTint, 1, 1, 1)
    else gl.uniform3f(P.u.uTint, br / Math.max(ir, 0.001), bg / Math.max(ig, 0.001), bb / Math.max(ib, 0.001))
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, this.n)
    gl.disable(gl.BLEND)
  }

  destroy() {
    this.destroyed = true
    this.stop()
    this.canvas.removeEventListener("webglcontextlost", this.onLost)
    const gl = this.gl
    if (!this.lost) {
      gl.deleteBuffer(this.quad)
      gl.deleteVertexArray(this.vao)
      for (const t of [...this.flowTex, ...this.stateTex, this.imgTex, this.homeTex, this.colTex]) if (t) gl.deleteTexture(t)
      for (const f of [...this.flowFb, ...this.stateFb]) gl.deleteFramebuffer(f)
      for (const p of [this.pFlow, this.pSim, this.pPart, this.pImg]) if (p) gl.deleteProgram(p.p)
    }
    gl.getExtension("WEBGL_lose_context")?.loseContext()
  }
}

/* ────────────────────────────────────────────────────────────────────
   Miransas — Coming Soon (liquid particle)
   ──────────────────────────────────────────────────────────────────── */

export interface MiransasComingSoonProps {
  src?: string
  darkSrc?: string
  imageAlt?: string
  /** Only for images without transparency: the flat background colour inside the image. */
  imageBackground?: string

  brand?: string
  message?: string

  background?: string
  darkBackground?: string
  theme?: "light" | "dark"
  textColor?: string
  headingFont?: string
  accentFont?: string
  loadFonts?: boolean

  height?: string
  className?: string
  style?: React.CSSProperties
}

const DEFAULTS = {
  src: "https://cdn.21st.dev/assets/mirror/ae/ae8c3de9003460e59182e950ccd345f68f27f9d0e4808b64c92c962a4eca7120.webp",
  darkSrc: "https://cdn.21st.dev/assets/mirror/a1/a1fa387b6e417b26a25f317559c87cce4d241c1052c52a2b3bc2966b2aaf9b65.webp",
  imageAlt: "Abstract sculpture of interwoven metallic filaments and particles",
  imageBackground: "#EAE9E7",
  brand: "MİRANSAS",
  message: "Yakında",
  background: "#EBE9E5",
  darkBackground: "#111110",
  headingFont: "'Geist', 'Helvetica Neue', Arial, sans-serif",
  accentFont: "'Instrument Serif', 'Times New Roman', serif",
}

/* ── layout ─────────────────────────────────────────────────────────── */

/** The sculpture fills the whole section, centred. */
function computeRect(w: number, h: number, aspect: number): Rect {
  const rw = w * 1.02
  const maxH = h * 1.05
  let r = rw
  if (r / aspect > maxH) r = maxH * aspect
  return { x: (w - r) / 2, y: (h - r / aspect) / 2, w: r, h: r / aspect }
}

/* ── styles ─────────────────────────────────────────────────────────── */

const CSS = `
.ms-root{position:relative;width:100%;height:var(--ms-h);overflow:hidden;isolation:isolate;container-type:size;
  transition:background-color .6s ease,color .6s ease;background:var(--ms-bg);color:var(--ms-fg);
  font-family:var(--ms-body);-webkit-font-smoothing:antialiased;touch-action:pan-y;box-sizing:border-box}
.ms-root *,.ms-root *::before,.ms-root *::after{box-sizing:border-box}
.ms-stage{position:absolute;inset:0;z-index:0;pointer-events:none}
.ms-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity .5s ease}
.ms-fallback{position:absolute;display:block;max-width:none;user-select:none;-webkit-user-drag:none;transition:opacity .5s ease}
.ms-root[data-gl="on"] .ms-canvas{opacity:1}
.ms-root[data-gl="on"] .ms-fallback{opacity:0}
.ms-root[data-swap="1"] .ms-canvas{opacity:0;transition-duration:.25s}
.ms-root[data-swap="1"] .ms-fallback{opacity:0;transition-duration:.25s}
.ms-content{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:clamp(10px,1.6cqh,20px);pointer-events:none;text-align:center;padding:0 20px}
.ms-brand{font-family:var(--ms-head);font-weight:600;font-size:clamp(34px,7cqw,96px);letter-spacing:.02em;line-height:1;margin:0}
.ms-msg{font-family:var(--ms-accent);font-style:italic;font-weight:400;
  font-size:clamp(20px,3cqw,40px);letter-spacing:.01em;margin:0;opacity:.75}
.ms-root a:focus-visible{outline:2px solid var(--ms-fg);outline-offset:4px}
@media (prefers-reduced-motion:reduce){
  .ms-canvas,.ms-fallback{transition:none}
}
`

let fontsInjected = false
function injectFonts() {
  if (fontsInjected || typeof document === "undefined") return
  fontsInjected = true
  const id = "ms-fonts"
  if (document.getElementById(id)) return
  const l = document.createElement("link")
  l.id = id
  l.rel = "stylesheet"
  l.href =
    "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
  document.head.appendChild(l)
}

/* ── component ──────────────────────────────────────────────────────── */

export default function MiransasComingSoon(props: MiransasComingSoonProps) {
  const {
    src = DEFAULTS.src,
    darkSrc = DEFAULTS.darkSrc,
    imageAlt = DEFAULTS.imageAlt,
    imageBackground,
    brand = DEFAULTS.brand,
    message = DEFAULTS.message,
    background: lightBackground = DEFAULTS.background,
    darkBackground = DEFAULTS.darkBackground,
    theme = "light",
    textColor,
    headingFont = DEFAULTS.headingFont,
    accentFont = DEFAULTS.accentFont,
    loadFonts = true,
    height = "100svh",
    className,
    style,
  } = props

  const rootRef = React.useRef<HTMLElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)
  const engineRef = React.useRef<LiquidEngine | null>(null)
  const aspectRef = React.useRef(1983 / 793)

  const [mode, setMode] = React.useState<"light" | "dark">(theme)
  React.useEffect(() => setMode(theme), [theme])
  const background = mode === "dark" ? darkBackground : lightBackground
  const bgRgb = React.useMemo(() => hexToRgb(background, [0.92, 0.91, 0.9]), [background])
  const darkBg = bgRgb[0] * 0.2126 + bgRgb[1] * 0.7152 + bgRgb[2] * 0.0722 < 0.45
  const fg = textColor || (darkBg ? "#F1EFEA" : "#151514")
  const imgBgRgb = React.useMemo(
    () => (imageBackground ? hexToRgb(imageBackground, [0.918, 0.914, 0.906]) : null),
    [imageBackground]
  )

  const activeSrc = (mode === "dark" && darkSrc) || src

  const engineOpts = (rm: boolean): EngineOptions => ({
    interactive: true,
    strength: 1,
    radius: 220,
    density: 1,
    dotSize: 1,
    spread: 1,
    turbulence: 1,
    liquid: 1,
    streaks: true,
    restStyle: "image",
    returnSpeed: 1,
    ambient: false,
    ambientIntensity: 1,
    speed: 1,
    intro: false,
    reducedMotion: rm,
    bg: bgRgb,
    imgBg: imgBgRgb,
  })
  const optsRef = React.useRef(engineOpts)
  optsRef.current = engineOpts

  React.useEffect(() => {
    if (loadFonts) injectFonts()
  }, [loadFonts])

  const relayout = React.useCallback(() => {
    const root = rootRef.current
    if (!root) return
    const w = root.clientWidth
    const h = root.clientHeight
    const rect = computeRect(w, h, aspectRef.current)
    const img = imgRef.current
    if (img) {
      img.style.left = rect.x + "px"
      img.style.top = rect.y + "px"
      img.style.width = rect.w + "px"
      img.style.height = rect.h + "px"
    }
    engineRef.current?.resize(w, h, rect)
  }, [])

  // engine lifecycle
  React.useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage) return
    const canvas = document.createElement("canvas")
    canvas.className = "ms-canvas"
    stage.appendChild(canvas)
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let engine: LiquidEngine | null = null
    const fail = () => {
      root.dataset.gl = "off"
    }
    try {
      engine = new LiquidEngine(canvas, optsRef.current(mq.matches), fail)
      engineRef.current = engine
    } catch {
      fail()
    }

    const ro = new ResizeObserver(() => relayout())
    ro.observe(root)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) engine?.setVisible(e.isIntersecting && !document.hidden)
    })
    io.observe(root)
    const onVis = () => engine?.setVisible(!document.hidden)
    document.addEventListener("visibilitychange", onVis)
    const onMq = () => engine?.setOptions({ reducedMotion: mq.matches })
    mq.addEventListener?.("change", onMq)

    const pos = (e: PointerEvent) => {
      const b = root.getBoundingClientRect()
      return [e.clientX - b.left, e.clientY - b.top] as const
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" && e.buttons === 0 && e.pressure === 0) return
      const [x, y] = pos(e)
      engine?.pointer("move", x, y, e.pointerType === "touch")
    }
    const onDown = (e: PointerEvent) => {
      const [x, y] = pos(e)
      engine?.pointer("down", x, y, e.pointerType === "touch")
    }
    const onUp = (e: PointerEvent) => {
      const [x, y] = pos(e)
      engine?.pointer("up", x, y, e.pointerType === "touch")
    }
    const onLeave = (e: PointerEvent) => {
      const [x, y] = pos(e)
      engine?.pointer("leave", x, y, e.pointerType === "touch")
    }
    root.addEventListener("pointermove", onMove, { passive: true })
    root.addEventListener("pointerdown", onDown, { passive: true })
    root.addEventListener("pointerup", onUp, { passive: true })
    root.addEventListener("pointercancel", onUp, { passive: true })
    root.addEventListener("pointerleave", onLeave, { passive: true })

    return () => {
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      mq.removeEventListener?.("change", onMq)
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerdown", onDown)
      root.removeEventListener("pointerup", onUp)
      root.removeEventListener("pointercancel", onUp)
      root.removeEventListener("pointerleave", onLeave)
      engine?.destroy()
      engineRef.current = null
      canvas.remove()
      delete root.dataset.gl
    }
  }, [relayout])

  // (re)load the sculpture when the theme changes
  React.useEffect(() => {
    const root = rootRef.current
    const engine = engineRef.current
    if (!root) return
    let cancelled = false
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.decoding = "async"
    const swapping = root.dataset.gl === "on"
    if (swapping) root.dataset.swap = "1"
    image.onload = () => {
      if (cancelled) return
      aspectRef.current = image.naturalWidth / image.naturalHeight || aspectRef.current
      relayout()
      if (engine && root.dataset.gl !== "off") {
        try {
          engine.onFirstFrame = () => {
            if (cancelled) return
            root.dataset.gl = "on"
            delete root.dataset.swap
          }
          engine.setImage(image)
          relayout()
        } catch {
          root.dataset.gl = "off"
        }
      } else delete root.dataset.swap
    }
    image.onerror = () => {
      delete root.dataset.swap
    }
    const t = window.setTimeout(() => (image.src = activeSrc), swapping ? 280 : 0)
    return () => {
      cancelled = true
      window.clearTimeout(t)
      image.onload = null
      image.onerror = null
    }
  }, [activeSrc, relayout])

  // live option updates (background / image key colour)
  React.useEffect(() => {
    const e = engineRef.current
    if (!e) return
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    e.setOptions(optsRef.current(rm))
  }, [bgRgb, imgBgRgb])

  const vars = {
    "--ms-bg": background,
    "--ms-fg": fg,
    "--ms-head": headingFont,
    "--ms-accent": accentFont,
    "--ms-body": headingFont,
    "--ms-h": height,
  } as React.CSSProperties

  return (
    <section
      ref={rootRef}
      className={"ms-root" + (className ? " " + className : "")}
      style={{ ...vars, ...style }}
    >
      <style>{CSS}</style>
      <div ref={stageRef} className="ms-stage" aria-hidden="true">
        <img ref={imgRef} className="ms-fallback" src={activeSrc} alt="" crossOrigin="anonymous" draggable={false} />
      </div>
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{imageAlt}</span>

      <div className="ms-content">
        <h1 className="ms-brand">{brand}</h1>
        <p className="ms-msg">{message}</p>
      </div>
    </section>
  )
}