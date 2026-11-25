import type { Settings, Surface } from './types';
import { VERTEX, FRAGMENT } from './shaders';
import { createLaserProgram } from './program';
import { createSurfaceGeometry } from './surface-geometry';

const TINTS = [
  [0, 1],
  [-11.5, 0.77],
  [9.5, 0.95],
  [-53.5, 0.79],
  [39.5, 0.77],
  [16, 0.81],
  [-16.3, 0.92],
  [13.3, 0.96],
  [3, 1.01],
  [1, 0.68],
  [1, 1.15],
  [142.5, 0.51],
  [113.6, 0.28],
  [-7.5, 0.13],
  [-2.7, 0.32],
  [7.5, 0.81]
];

const BASE_SATURATION = 0.78;
const MAX_RENDER_DIM = 2048;
const INTRO_DROP = 1.25;
const INTRO_END = 5;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const easeOut = (x: number) => 1 - Math.pow(1 - clamp(x, 0, 1), 3);
const spring = (time: number) => {
  const omega = 8;
  const zeta = 0.62;
  const damped = omega * Math.sqrt(1 - zeta * zeta);
  return (
    1 - Math.exp(-zeta * omega * time) * (Math.cos(damped * time) + ((zeta * omega) / damped) * Math.sin(damped * time))
  );
};

const toHsv = ([r, g, b]: number[]): [number, number] => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue = 0;
  if (delta > 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
  }
  return [(hue * 60 + 360) % 360, max > 0 ? delta / max : 0];
};

const fromHsv = (hue: number, saturation: number): number[] => {
  const h = (((hue % 360) + 360) % 360) / 60;
  const c = saturation;
  const x = c * (1 - Math.abs((h % 2) - 1));
  const m = 1 - c;
  const [r, g, b] =
    h < 1 ? [c, x, 0] : h < 2 ? [x, c, 0] : h < 3 ? [0, c, x] : h < 4 ? [0, x, c] : h < 5 ? [x, 0, c] : [c, 0, x];
  return [r + m, g + m, b + m];
};

const buildTints = (rgb: number[]) => {
  const [hue, saturation] = toHsv(rgb);
  const strength = saturation / BASE_SATURATION;
  const data = new Float32Array(TINTS.length * 3);
  TINTS.forEach(([shift, scale], index) => {
    data.set(fromHsv(hue + shift, clamp(BASE_SATURATION * scale * strength, 0, 1)), index * 3);
  });
  return data;
};

const locate = (gl: WebGL2RenderingContext, program: WebGLProgram, names: string[]) => {
  const result: Record<string, WebGLUniformLocation | null> = {};
  for (const name of names) result[name] = gl.getUniformLocation(program, name);
  return result;
};

type Ref<T> = { current: T };

function createRenderer(container: HTMLDivElement, canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, settingsRef: Ref<Settings>, wakeRef: Ref<(() => void) | null>, onStatus?: (ready: boolean) => void) {
  const shaderProgram = createLaserProgram(gl, VERTEX, FRAGMENT);
  if (!shaderProgram) return undefined;
  const { program } = shaderProgram;

  const vao = gl.createVertexArray();
  const buffer = gl.createBuffer();
  const revealTexture = gl.createTexture();
  if (!vao || !buffer || !revealTexture) {
    if (process.env.NODE_ENV !== 'production' && !gl.isContextLost()) console.error('[LaserFlow] Unable to allocate GPU resources.');
    if (vao) gl.deleteVertexArray(vao);
    if (buffer) gl.deleteBuffer(buffer);
    if (revealTexture) gl.deleteTexture(revealTexture);
    shaderProgram.dispose();
    return undefined;
  }
  let uniforms: Record<string, WebGLUniformLocation | null> = {};
  let ready = false;
  let drewFrame = false;

  const linked = shaderProgram.complete;

  const resolveProgram = () => {
    if (!shaderProgram.resolve()) return false;
    uniforms = locate(gl, program, [
      'uResolution',
      'uDpr',
      'uScale',
      'uTime',
      'uBeamX',
      'uSurface',
      'uRadius',
      'uIntro',
      'uPour',
      'uRun',
      'uLens',
      'uReveal',
      'uRevealMap',
      'uRevealInfo',
      'uAtmosphere',
      'uAmount',
      'uShape',
      'uExtra',
      'uTheme',
      'uTint'
    ]);
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);
    ready = true;
    return true;
  };

  gl.bindTexture(gl.TEXTURE_2D, revealTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const probe = document.createElement('canvas');
  probe.width = 1;
  probe.height = 1;
  const probeContext = probe.getContext('2d', { willReadFrequently: true });
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduce = motionPreference.matches;
  const state = {
    time: 0,
    introTime: settingsRef.current.intro && !reduce ? 0 : INTRO_END,
    width: 1,
    height: 1,
    ratio: 1,
    colorKey: '',
    tints: buildTints([0.22, 0.28, 1]),
    pointer: { x: 0, y: 0, clientX: 0, clientY: 0, known: false, inside: false },
    lens: { x: 0, y: 0, vx: 0, vy: 0, strength: 0, placed: false },
    reveal: { src: '', ready: false, width: 1, height: 1, image: null as HTMLImageElement | null }
  };
  let raf = 0;
  let last = 0;
  let visible = false;
  let alive = true;
  let needsResize = true;
  const geometry = createSurfaceGeometry(container, resized => { needsResize ||= resized; wake(); });

  const toRgb = (value: string): number[] => {
    if (!probeContext) return [0.22, 0.28, 1];
    probeContext.clearRect(0, 0, 1, 1);
    probeContext.fillStyle = '#3847ff';
    probeContext.fillStyle = value;
    probeContext.fillRect(0, 0, 1, 1);
    const [r, g, b] = probeContext.getImageData(0, 0, 1, 1).data;
    return [r / 255, g / 255, b / 255];
  };

  const resolveColor = (s: Settings) => {
    if (s.color === state.colorKey) return;
    state.colorKey = s.color;
    state.tints = buildTints(toRgb(s.color));
  };

  const resolveReveal = (s: Settings) => {
    const src = s.revealImage ? String(s.revealImage) : '';
    const reveal = state.reveal;
    if (src === reveal.src) return;
    reveal.src = src;
    reveal.ready = false;
    if (reveal.image) reveal.image.onload = reveal.image.onerror = null;
    reveal.image = null;
    if (!src) return;
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.decoding = 'async';
    image.onload = () => {
      if (!alive || gl.isContextLost() || reveal.src !== src) return;
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      if (!width || !height) return;
      const scale = Math.min(1, 2048 / Math.max(width, height));
      const sheet = document.createElement('canvas');
      sheet.width = Math.max(1, Math.round(width * scale));
      sheet.height = Math.max(1, Math.round(height * scale));
      const context = sheet.getContext('2d');
      if (!context) return;
      try {
        context.drawImage(image, 0, 0, sheet.width, sheet.height);
        gl.bindTexture(gl.TEXTURE_2D, revealTexture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sheet);
        reveal.width = sheet.width;
        reveal.height = sheet.height;
        reveal.ready = true;
        wakeRef.current?.();
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') console.error('[LaserFlow] Reveal image upload failed:', error);
      } finally {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      }
    };
    image.onerror = () => {
      if (alive && reveal.src === src && process.env.NODE_ENV !== 'production') console.error('[LaserFlow] revealImage must be a decodable image asset with permitted CORS access.');
    };
    image.src = src;
    reveal.image = image;
  };

  const resize = () => {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    const s = settingsRef.current;
    const baseDpr = Math.min(s.dpr || window.devicePixelRatio || 1, 2);
    const longest = Math.max(width, height) * baseDpr;
    const ratio = longest > MAX_RENDER_DIM ? (baseDpr * MAX_RENDER_DIM) / longest : baseDpr;
    const pixelWidth = Math.max(1, Math.round(width * ratio));
    const pixelHeight = Math.max(1, Math.round(height * ratio));
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    state.width = width;
    state.height = height;
    state.ratio = canvas.width / width;
  };

  const render = (measured: ReturnType<typeof geometry.read>) => {
    if (!ready || !alive || gl.isContextLost()) return;
    const s = settingsRef.current;
    resolveColor(s);
    const { width, height } = state;
    const scale = Math.max(0.2, Math.min(width / 585, height / 507));
    let surface: Surface = measured.surface ?? {
      left: -width * 2, top: s.surfaceLevel * height, right: width * 3, bottom: height * 3, radius: 0, real: false
    };
    let beamX = s.beamPosition * width;
    if (surface.real) {
      const margin = surface.radius + 6;
      if (beamX >= surface.left && beamX <= surface.right) {
        beamX = clamp(beamX, surface.left + margin, surface.right - margin);
      } else {
        surface = { left: -width * 2, top: height, right: width * 3, bottom: height * 3, radius: 0, real: false };
      }
    }
    const startY = -0.15 * height;
    const span = surface.top - startY + 0.3 * height;
    const it = state.introTime;
    const settled = it >= INTRO_END;
    const front = settled ? surface.top + 0.3 * height : startY + span * Math.pow(clamp(it / INTRO_DROP, 0, 1), 1.3);
    const impact = INTRO_DROP * Math.pow(Math.max(0, surface.top - startY) / span, 1 / 1.3);
    const tau = it - impact;
    const bloom = settled ? 1 : tau <= 0 ? 0 : spring(tau);
    const flash = settled || tau <= 0 ? 0 : Math.exp(-tau / 0.35) * (1 - Math.exp(-tau / 0.05));
    const runRange = s.spread * 250 * 1.3 + 80;
    const runFront = settled ? 100000 : tau <= 0 ? -40 : runRange * (1 - Math.exp(-1.15 * tau));
    const beadStrength = settled || tau <= 0 ? 0 : Math.exp(-1.15 * tau) * (1 - Math.exp(-tau / 0.08));
    const pour = (reach: number): [number, number] => {
      if (settled) return [1000, 1];
      if (tau <= 0) return [-reach, 0];
      const target = Math.min(reach, runRange * 0.97);
      const arrival = -Math.log(1 - target / runRange) / 1.15;
      const elapsed = tau - arrival;
      const ease = clamp((elapsed + 0.15) / 0.8, 0, 1);
      const fill = ease * ease * ease * (ease * (ease * 6 - 15) + 10);
      if (elapsed <= 0) return [runFront - target, fill];
      const speed = 1.15 * (runRange - target);
      return [speed * elapsed + 260 * elapsed * elapsed, fill];
    };
    const [frontL, fillL] = pour((beamX - surface.left) / scale);
    const [frontR, fillR] = pour((surface.right - beamX) / scale);
    const atmosphere = settled
      ? 1
      : tau <= 0
        ? 0.3 * easeOut(it / INTRO_DROP)
        : 0.3 + 0.7 * (1 - Math.exp(-1.3 * tau));
    const seedValue = Number(s.seed) || 0;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform2f(uniforms.uResolution, width, height);
    gl.uniform1f(uniforms.uDpr, state.ratio);
    gl.uniform1f(uniforms.uScale, scale);
    gl.uniform1f(uniforms.uTime, state.time);
    gl.uniform1f(uniforms.uBeamX, beamX);
    gl.uniform4f(uniforms.uSurface, surface.left, surface.top, surface.right, surface.bottom);
    gl.uniform1f(uniforms.uRadius, surface.radius);
    gl.uniform3f(uniforms.uIntro, front, bloom, flash);
    gl.uniform4f(uniforms.uPour, frontL, frontR, fillL, fillR);
    gl.uniform2f(uniforms.uRun, runFront, beadStrength);
    gl.uniform4f(uniforms.uLens, state.lens.x, state.lens.y, 95 * scale, state.lens.strength);
    resolveReveal(s);
    const { reveal } = state;
    const cover = Math.max(width / reveal.width, height / reveal.height);
    const coverWidth = reveal.width * cover;
    const coverHeight = reveal.height * cover;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, revealTexture);
    gl.uniform1i(uniforms.uReveal, 0);
    gl.uniform4f(
      uniforms.uRevealMap,
      1 / coverWidth,
      1 / coverHeight,
      (coverWidth - width) / 2 / coverWidth,
      (coverHeight - height) / 2 / coverHeight
    );
    gl.uniform2f(uniforms.uRevealInfo, s.revealRadius, reveal.ready ? s.revealOpacity : 0);
    gl.uniform1f(uniforms.uAtmosphere, atmosphere);
    gl.uniform4f(uniforms.uAmount, s.intensity, s.fog, s.dust, s.streaks);
    gl.uniform4f(uniforms.uShape, s.beamWidth, s.flare, s.spread, s.spill);
    gl.uniform4f(uniforms.uExtra, s.pulse, s.dots, 34.34 + seedValue * 7.31, 11.58 + seedValue * 3.17);
    gl.uniform1f(uniforms.uTheme, s.theme === 'light' ? 1 : 0);
    gl.uniform3fv(uniforms.uTint, state.tints);
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
    if (!drewFrame) { drewFrame = true; onStatus?.(true); }
  };

  const frame = (now: number) => {
    raf = 0;
    if (!alive || !visible || document.hidden || gl.isContextLost()) return;
    if (!ready) {
      if (!gl.isContextLost() && !linked()) {
        raf = requestAnimationFrame(frame);
        return;
      }
      if (!resolveProgram()) {
        dispose();
        return;
      }
    }
    if (needsResize) { needsResize = false; resize(); }
    const s = settingsRef.current;
    const measured = geometry.read(s.surfaceRef?.current ?? null, state.width, state.height);
    if (state.pointer.known) {
      state.pointer.x = (state.pointer.clientX - measured.box.left) * (measured.box.width > 0 ? state.width / measured.box.width : 1);
      state.pointer.y = (state.pointer.clientY - measured.box.top) * (measured.box.height > 0 ? state.height / measured.box.height : 1);
      state.pointer.inside = state.pointer.x >= 0 && state.pointer.y >= 0 && state.pointer.x <= measured.box.width && state.pointer.y <= measured.box.height;
    }
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
    last = now;
    const moving = !s.paused && !reduce && s.speed !== 0;
    if (moving) state.time += dt * s.speed;
    const introducing = !s.paused && state.introTime < INTRO_END;
    if (introducing) state.introTime = Math.min(INTRO_END, state.introTime + dt);

    const { pointer, lens } = state;
    const active = s.mouseInteraction && pointer.inside && !reduce;
    if (active && !lens.placed) {
      lens.x = pointer.x;
      lens.y = pointer.y;
      lens.vx = 0;
      lens.vy = 0;
      lens.placed = true;
    }
    const ax = reduce ? 0 : 120 * (pointer.x - lens.x) - 19 * lens.vx;
    const ay = reduce ? 0 : 120 * (pointer.y - lens.y) - 19 * lens.vy;
    lens.vx += ax * dt;
    lens.vy += ay * dt;
    lens.x += lens.vx * dt;
    lens.y += lens.vy * dt;
    const goal = active ? 1 : 0;
    lens.strength += (goal - lens.strength) * (1 - Math.exp(-dt / (goal > lens.strength ? 0.3 : 0.55)));
    if (lens.strength < 0.001 && !active) lens.placed = false;

    render(measured);
    const settling = !reduce && (
      Math.abs(state.lens.strength - goal) > 0.002 ||
      Math.hypot(state.lens.vx, state.lens.vy) > 0.5);
    if (moving || introducing || settling || measured.animating) raf = requestAnimationFrame(frame);
    else last = 0;
  };

  const wake = () => {
    if (!raf && alive && visible && !document.hidden && !gl.isContextLost()) raf = requestAnimationFrame(frame);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (reduce || !visible || document.hidden || !settingsRef.current.mouseInteraction) return;
    state.pointer.clientX = event.clientX;
    state.pointer.clientY = event.clientY;
    state.pointer.known = true;
    wake();
  };

  const onPointerLeave = () => {
    state.pointer.known = false;
    state.pointer.inside = false;
    wake();
  };

  const onMotionPreference = () => {
    reduce = motionPreference.matches;
    if (reduce) {
      state.introTime = INTRO_END;
      state.pointer.known = false;
      state.pointer.inside = false;
      state.lens.strength = 0;
      state.lens.vx = 0;
      state.lens.vy = 0;
      state.lens.placed = false;
    }
    last = 0;
    wake();
  };

  const onVisibility = () => {
    last = 0;
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
    else { geometry.invalidate(); wake(); }
  };
  const intersection = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    last = 0;
    if (visible) geometry.invalidate();
    else { cancelAnimationFrame(raf); raf = 0; }
  });
  intersection.observe(container);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onPointerLeave);
  document.addEventListener('visibilitychange', onVisibility);
  motionPreference.addEventListener('change', onMotionPreference);

  const dispose = () => {
    if (!alive) return;
    alive = false;
    cancelAnimationFrame(raf);
    raf = 0;
    wakeRef.current = null;
    geometry.dispose();
    if (state.reveal.image) {
      state.reveal.image.onload = state.reveal.image.onerror = null;
      state.reveal.image = null;
    }
    intersection.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    document.removeEventListener('visibilitychange', onVisibility);
    motionPreference.removeEventListener('change', onMotionPreference);
    gl.useProgram(null);
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.deleteTexture(revealTexture);
    gl.deleteBuffer(buffer);
    gl.deleteVertexArray(vao);
    shaderProgram.dispose();
  };

  wakeRef.current = () => {
    needsResize = true;
    geometry.invalidate();
  };

  if (!gl.isContextLost()) {
    wake();
  } else {
    dispose();
  }

  return dispose;
}

const pendingRelease = new WeakMap<HTMLCanvasElement, number>();

/** A restored WebGL context invalidates every old resource and uniform location.
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextrestored_event
 * https://react.dev/reference/react/useEffect#connecting-to-an-external-system
 */
export function mountLaserFlow(container: HTMLDivElement, canvas: HTMLCanvasElement, settings: Ref<Settings>, wake: Ref<(() => void) | null>, onStatus?: (ready: boolean) => void) {
  cancelAnimationFrame(pendingRelease.get(canvas) ?? 0);
  pendingRelease.delete(canvas);
  let gl: WebGL2RenderingContext | null;
  onStatus?.(false);
  try {
    gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
  } catch {
    return;
  }
  if (!gl) return;
  let dispose: (() => void) | undefined;
  let mounted = true;
  const onLost = (event: Event) => {
    event.preventDefault();
    onStatus?.(false);
    dispose?.();
    dispose = undefined;
  };
  const onRestored = () => { dispose?.(); dispose = createRenderer(container, canvas, gl, settings, wake, onStatus); };
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onRestored);
  if (!gl.isContextLost()) dispose = createRenderer(container, canvas, gl, settings, wake, onStatus);
  return () => {
    if (!mounted) return;
    mounted = false;
    canvas.removeEventListener('webglcontextlost', onLost);
    canvas.removeEventListener('webglcontextrestored', onRestored);
    dispose?.();
    const release = () => {
      pendingRelease.delete(canvas);
      if (!canvas.isConnected && !gl.isContextLost()) gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // Defer context release to distinguish Strict Mode replay from a real unmount.
    if (canvas.isConnected) pendingRelease.set(canvas, requestAnimationFrame(release));
    else release();
  };
}
