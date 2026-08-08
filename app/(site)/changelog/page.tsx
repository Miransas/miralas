
"use client";

import { useEffect, useRef } from "react";

// --- SHADER BACKGROUND BİLEŞENİ ---
const VERT = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
uniform vec4 u_scene;      // resolution.xy, time, colour count
uniform vec4 u_shape;      // scale, intensity, paramA, warp
uniform vec4 u_surface;    // detail, contrast, brightness, saturation
uniform vec4 u_finish;     // hue, vignette, blur, grain
uniform vec4 u_transform;  // seed, rotation, drift, OKLab toggle
uniform vec4 u_space;      // offset.xy, pointer.xy
uniform vec4 u_cursor;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w

float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  float n = sin(dot(p, vec2(41.0, 289.0)));
  return fract(vec2(15731.743, 7892.321) * n);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)),
    step(0.04045, c));
}
vec3 linearToSrgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, c));
}
vec3 linToOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
  l = pow(max(l, 0.0), 1.0 / 3.0);
  m = pow(max(m, 0.0), 1.0 / 3.0);
  s = pow(max(s, 0.0), 1.0 / 3.0);
  return vec3(
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);
}
vec3 oklabToLin(vec3 c) {
  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l; m = m * m * m; s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);
}
vec3 mixColour(vec3 a, vec3 b, float t) {
  if (u_oklab > 0.5) {
    vec3 la = linToOklab(srgbToLinear(a));
    vec3 lb = linToOklab(srgbToLinear(b));
    return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);
  }
  return mix(a, b, t);
}

vec3 palette(float x) {
  float n = max(u_colorCount - 1.0, 1.0);
  float f = clamp(x, 0.0, 1.0) * n;
  vec3 col = u_colors[0];
  for (int i = 0; i < 7; i++) {
    if (float(i) < n)
      col = mixColour(col, u_colors[i + 1],
        smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
  }
  return col;
}

vec3 hueRotate(vec3 col, float a) {
  const mat3 toYIQ = mat3(0.299, 0.596, 0.211,
                          0.587, -0.274, -0.523,
                          0.114, -0.322, 0.312);
  const mat3 toRGB = mat3(1.0, 1.0, 1.0,
                          0.956, -0.272, -1.106,
                          0.621, -0.647, 1.703);
  vec3 yiq = toYIQ * col;
  float ca = cos(a), sa = sin(a);
  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);
  return toRGB * yiq;
}

vec3 shade(vec2 uv, vec2 p, float t) {
  float cells = 18.0 + u_intensity * 30.0;
  vec2 f = fract(p * cells) - 0.5;
  float field = 0.5 + 0.5 * sin(p.x * 3.0 + t + u_seed) * sin(p.y * 2.4 - t * 0.7);
  float r = (0.06 + u_paramA * 0.34) + field * 0.2;
  float dotMask = 1.0 - smoothstep(r - 0.08, r, length(f));
  return mix(u_colors[0], palette(field), dotMask);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 screenUv = uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)
    / min(u_resolution.x, u_resolution.y);
  float cursorMask = 0.0;

  if (u_cursorPresence > 0.001) {
    vec2 cursor = (0.5 * u_mouse * u_resolution.xy)
      / min(u_resolution.x, u_resolution.y);
    vec2 cursorDelta = p - cursor;
    if (u_cursorEffect < 0.5) {
      p += cursor * u_cursorPresence * u_cursorStrength * 0.55;
    } else {
      float cursorDistance = length(cursorDelta);
      vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);
      cursorMask = u_cursorPresence
        * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));
      if (u_cursorEffect < 1.5) {
        p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;
      } else if (u_cursorEffect < 2.5) {
        float cursorAngle = cursorMask * u_cursorStrength * 2.2;
        float cc = cos(cursorAngle), cs = sin(cursorAngle);
        p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;
      } else if (u_cursorEffect < 3.5) {
        float ripple = sin(
          cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);
        p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;
      }
    }
  }

  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;
  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }
  p += u_offset;
  if (u_drift > 0.0001)
    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));
  if (u_warp > 0.0) {
    p += u_warp * (vec2(
      fbm(p * u_detail + u_seed),
      fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }
  vec3 col;
  if (u_blur > 0.0) {
    float e = u_blur;
    float pe = e * u_scale;
    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;
    col  = shade(uv, p, u_time) * 0.36;
    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;
    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;
  } else {
    col = shade(uv, p, u_time);
  }
  if (abs(u_contrast - 1.0) > 0.0001)
    col = (col - 0.5) * u_contrast + 0.5;
  if (abs(u_saturation - 1.0) > 0.0001) {
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);
  }
  if (abs(u_hue) > 0.0001)
    col = hueRotate(col, u_hue);
  if (abs(u_brightness) > 0.0001)
    col += u_brightness;
  if (u_vignette > 0.0001) {
    float vd = length(screenUv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }
  if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5)
    col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;
  if (u_grain > 0.0001)
    col += (grainHash(
      gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

const UNIFORMS = {
  colors: [[0.00784313725490196, 0.00392156862745098, 0.0392156862745098], [0.01568627450980392, 0.0196078431372549, 0.1803921568627451], [0.23921568627450981, 0.17254901960784313, 0.5529411764705883], [0.5686274509803921, 0.4196078431372549, 0.7490196078431373], [0.5686274509803921, 0.4196078431372549, 0.7490196078431373], [0.5686274509803921, 0.4196078431372549, 0.7490196078431373], [0.5686274509803921, 0.4196078431372549, 0.7490196078431373], [0.5686274509803921, 0.4196078431372549, 0.7490196078431373]] as [number, number, number][],
  colorCount: 4,
  scale: 1.100,
  intensity: 0.290,
  paramA: 0.500,
  warp: 0.000,
  detail: 2.400,
  contrast: 1.176,
  brightness: 0.000,
  saturation: 1.000,
  hue: 0.0000,
  vignette: 0.000,
  blur: 0.0000,
  grain: 0.063,
  seed: 3420.0,
  rotate: 0.0000,
  offsetX: 0.000,
  offsetY: 0.000,
  drift: 0.000,
  cursorEnabled: false,
  cursorEffect: 2.0,
  cursorStrength: 0.650,
  cursorRadius: 0.460,
  oklab: 0.0,
  timeScale: 0.784,
};

const pendingContextReleases = new WeakMap<HTMLCanvasElement, number>();

function ShaderBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const pendingRelease = pendingContextReleases.get(canvas);
    if (pendingRelease !== undefined) window.clearTimeout(pendingRelease);
    pendingContextReleases.delete(canvas);
    const gl = canvas.getContext("webgl", { antialias: false }) as WebGLRenderingContext;
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    const vertexShader = compile(gl.VERTEX_SHADER, VERT);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAG);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uni = {
      colors: gl.getUniformLocation(program, "u_colors"),
      scene: gl.getUniformLocation(program, "u_scene"),
      shape: gl.getUniformLocation(program, "u_shape"),
      surface: gl.getUniformLocation(program, "u_surface"),
      finish: gl.getUniformLocation(program, "u_finish"),
      transform: gl.getUniformLocation(program, "u_transform"),
      space: gl.getUniformLocation(program, "u_space"),
      cursor: gl.getUniformLocation(program, "u_cursor"),
    };
    gl.uniform3fv(uni.colors, new Float32Array(UNIFORMS.colors.flat()));
    gl.uniform4f(
      uni.shape,
      UNIFORMS.scale,
      UNIFORMS.intensity,
      UNIFORMS.paramA,
      UNIFORMS.warp,
    );
    gl.uniform4f(
      uni.surface,
      UNIFORMS.detail,
      UNIFORMS.contrast,
      UNIFORMS.brightness,
      UNIFORMS.saturation,
    );
    gl.uniform4f(
      uni.finish,
      UNIFORMS.hue,
      UNIFORMS.vignette,
      UNIFORMS.blur,
      UNIFORMS.grain,
    );
    gl.uniform4f(
      uni.transform,
      UNIFORMS.seed,
      UNIFORMS.rotate,
      UNIFORMS.drift,
      UNIFORMS.oklab,
    );
    gl.uniform4f(
      uni.cursor,
      0,
      UNIFORMS.cursorEffect,
      UNIFORMS.cursorStrength,
      UNIFORMS.cursorRadius,
    );

    let targetX = 0;
    let targetY = 0;
    let targetPresence = 0;
    let mouseX = 0;
    let mouseY = 0;
    let cursorPresence = 0;
    let pointerKnown = false;
    let pointerClientX = 0;
    let pointerClientY = 0;
    let bounds = canvas.getBoundingClientRect();
    let raf = 0;
    let lastNow: number | null = null;
    let visible = document.visibilityState === "visible";
    let inView = true;
    let disposed = false;
    const start = performance.now();
    const timeAnimated = Math.abs(UNIFORMS.timeScale) > 0.0001;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rawWidth = Math.max(1, Math.round(bounds.width * dpr));
      const rawHeight = Math.max(1, Math.round(bounds.height * dpr));
      const pixelScale = Math.min(
        1,
        Math.sqrt(2_000_000 / Math.max(1, rawWidth * rawHeight)),
      );
      const width = Math.max(1, Math.round(rawWidth * pixelScale));
      const height = Math.max(1, Math.round(rawHeight * pixelScale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    function requestRender() {
      if (!disposed && visible && inView && raf === 0) {
        raf = requestAnimationFrame(render);
      }
    }

    const updatePointerTarget = () => {
      if (!pointerKnown) return;
      if (bounds.width === 0 || bounds.height === 0) return;
      const inside =
        pointerClientX >= bounds.left &&
        pointerClientX <= bounds.right &&
        pointerClientY >= bounds.top &&
        pointerClientY <= bounds.bottom;
      if (!inside) {
        targetPresence = 0;
        requestRender();
        return;
      }
      const nextX = ((pointerClientX - bounds.left) / bounds.width) * 2 - 1;
      const nextY = -(((pointerClientY - bounds.top) / bounds.height) * 2 - 1);
      if (targetPresence === 0 && cursorPresence < 0.01) {
        mouseX = nextX;
        mouseY = nextY;
      }
      targetX = nextX;
      targetY = nextY;
      targetPresence = 1;
      requestRender();
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerKnown = true;
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
      bounds = canvas.getBoundingClientRect();
      updatePointerTarget();
    };
    const onPointerLeave = () => {
      pointerKnown = false;
      targetPresence = 0;
      requestRender();
    };
    const updateLayout = () => {
      bounds = canvas.getBoundingClientRect();
      resizeCanvas();
      updatePointerTarget();
      requestRender();
    };
    window.addEventListener("resize", updateLayout);
    if (UNIFORMS.cursorEnabled) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointercancel", onPointerLeave);
      window.addEventListener("scroll", updateLayout, true);
      window.addEventListener("blur", onPointerLeave);
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      if (inView) requestRender();
      else if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastNow = null;
      }
    });
    intersectionObserver.observe(canvas);
    const onVisibilityChange = () => {
      visible = document.visibilityState === "visible";
      if (visible) requestRender();
      else if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastNow = null;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    function render(now: number) {
      raf = 0;
      if (disposed || !visible || !inView) return;
      const dt = lastNow === null ? 0 : Math.min((now - lastNow) / 1000, 0.1);
      lastNow = now;
      const follow = 1 - Math.exp(-12 * dt);
      mouseX += (targetX - mouseX) * follow;
      mouseY += (targetY - mouseY) * follow;
      cursorPresence += (targetPresence - cursorPresence) * follow;
      resizeCanvas();
      const width = canvas.width;
      const height = canvas.height;
      gl.uniform4f(
        uni.scene,
        width,
        height,
        ((now - start) / 1000) * UNIFORMS.timeScale,
        UNIFORMS.colorCount,
      );
      gl.uniform4f(
        uni.space,
        UNIFORMS.offsetX,
        UNIFORMS.offsetY,
        mouseX,
        mouseY,
      );
      gl.uniform4f(
        uni.cursor,
        UNIFORMS.cursorEnabled ? cursorPresence : 0,
        UNIFORMS.cursorEffect,
        UNIFORMS.cursorStrength,
        UNIFORMS.cursorRadius,
      );
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      const pointerSettling =
        Math.abs(targetX - mouseX) > 0.001 ||
        Math.abs(targetY - mouseY) > 0.001 ||
        Math.abs(targetPresence - cursorPresence) > 0.001;
      if (timeAnimated || pointerSettling) requestRender();
      else lastNow = null;
    }
    requestRender();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", updateLayout);
      if (UNIFORMS.cursorEnabled) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointercancel", onPointerLeave);
        window.removeEventListener("scroll", updateLayout, true);
        window.removeEventListener("blur", onPointerLeave);
        document.documentElement.removeEventListener(
          "pointerleave",
          onPointerLeave,
        );
      }
      gl.deleteBuffer(buf);
      gl.deleteProgram(program);
      const releaseTimer = window.setTimeout(() => {
        if (pendingContextReleases.get(canvas) !== releaseTimer) return;
        pendingContextReleases.delete(canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        canvas.width = 1;
        canvas.height = 1;
      }, 0);
      pendingContextReleases.set(canvas, releaseTimer);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={className} style={{ display: "block", width: "100%", height: "100%" }} />
  );
}

// --- CHANGELOG VERİLERİ ---
interface ChangelogItem {
  version: string;
  date: string;
  title: string;
  description: string;
  tagType: "new" | "improvement" | "fix";
  tagLabel: string;
  features: string[];
}

const changelogData: ChangelogItem[] = [
  {
    version: "v2.5.0",
    date: "Avgust 2026",
    title: "Real-time Superchat va Ovoz Klonlash Yangilanishi",
    description: "Jonli efirlar va muloqotlar uchun mo'ljallangan superchat tizimi yanada tezkorlashtirildi. Ovoz klonlashda hissiyotlar va intonatsiya aniqligi sezilarli darajada oshirildi.",
    tagType: "new",
    tagLabel: "Yangi imkoniyat",
    features: [
      "Superchat xabarlarini 250ms dan kam kechikish bilan ovozga aylantirish",
      "Ovoz klonlash uchun talab qilinadigan audio uzunligi 10 soniyagacha qisqartirildi",
      "O'zbek tilidagi urg'u va ohanglarni aniqlash modeli yaxshilandi"
    ]
  },
  {
    version: "v2.4.1",
    date: "Iyul 2026",
    title: "Donate Tizimi va Xavfsizlik Optimizatsiyasi",
    description: "Streamerlar va ijodkorlar uchun to'g'ridan-to'g'ri efirda ishlaydigan donate ovozli xabarlar paneli va xavfsizlik protokollari qo'shildi.",
    tagType: "improvement",
    tagLabel: "Muhim yaxshilanish",
    features: [
      "Donate xabarlarini maxsus filtrlar orqali moderatsiya qilish",
      "API so'rovlari uchun shifrlangan xavfsizlik qatlami kuchaytirildi",
      "Server infratuzilmasi kengaytirilib, yuklamalarga chidamlilik oshirildi"
    ]
  },
  {
    version: "v2.3.0",
    date: "Iyun 2026",
    title: "Ko'p tilli hissiy boshqaruv va Dashboard",
    description: "Foydalanuvchilarga qulay bo'lgan yangi boshqaruv paneli ishga tushirildi. Ovoz chiqishidagi emotsiyalarni to'g'ridan-to'g'ri boshqarish imkoniyati.",
    tagType: "new",
    tagLabel: "Yangi reliz",
    features: [
      "Interaktiv ovoz sozlash slayderlari va emotsiya paneli",
      "Tarmoq statistikasini real vaqt rejimida kuzatish uchun analitika",
      "Dark va Light mod dizayn optimizatsiyalari yakunlandi"
    ]
  }
];

// --- ANA CHANGELOG SAYFASI ---
export default function ChangelogPage() {
  return (
    <main className="relative w-full min-h-screen bg-zinc-100 dark:bg-[#060608] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-500 overflow-hidden">

      {/* --- ARKA PLAN SHADER BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-90 transition-opacity duration-500">
        <ShaderBackground className="absolute inset-0" />
      </div>

      {/* Light modda o'qish qulayligi uchun engil qatlam */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-zinc-50/80 via-transparent to-zinc-100/90 dark:from-transparent dark:to-transparent" />

      {/* --- HERO / BAŞLIK --- */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-300/80 dark:border-zinc-800 text-xs font-mono tracking-wide uppercase mb-6 shadow-md backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Tizim Yangiliklari
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
          Changelog & <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Rivojlanish tarixi
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed font-medium">
          Platformaga kiritilayotgan yangi funksiyalar, yaxshilanishlar va texnologik yangiliklar haqida batafsil ma&apos;lumot oling.
        </p>
      </section>

      {/* --- TIMELINE / LİSTE --- */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-32">
        <div className="relative border-l border-zinc-300 dark:border-zinc-800 ml-4 sm:ml-8 space-y-16">

          {changelogData.map((item, index) => (
            <div key={index} className="relative pl-8 sm:pl-12 group">

              {/* Timeline Nuqtasi */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-blue-500 flex items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              </div>

              {/* İçerik Kartı (Light ve Dark modda tek tek belirgin olması için özel arkaplan ve gölgeler) */}
              <div className="p-8 rounded-[2rem] bg-white/90 dark:bg-zinc-900/85 border border-zinc-200 dark:border-zinc-800 shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50">

                {/* Üst Bilgi (Versiyon, Tarih ve Etiket) */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-mono font-bold text-zinc-900 dark:text-white">
                      {item.version}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {item.date}
                    </span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider ${item.tagType === "new"
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                      : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                    }`}>
                    {item.tagLabel}
                  </span>
                </div>

                {/* Başlık ve Açıklama */}
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  {item.description}
                </p>

                {/* Özellikler Alt Listesi */}
                <div className="space-y-2.5 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                  {item.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                      <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">✦</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          ))}

        </div>
      </section>

      {/* --- ALT BİLGİ --- */}
      <div className="max-w-4xl mx-auto px-6 py-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-400">
        <div>© {new Date().getFullYear()} Barcha huquqlar himoyalangan.</div>
        <div className="flex items-center gap-6 mt-4 sm:mt-0">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Tizimlar faol ishlamoqda
          </span>
        </div>
      </div>

    </main>
  );
}