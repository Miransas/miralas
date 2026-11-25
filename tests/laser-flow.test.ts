import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mountLaserFlow } from '../components/laser-flow/renderer';
import { createLaserProgram } from '../components/laser-flow/program';
import { FRAGMENT } from '../components/laser-flow/shaders';
import { laserEnvironment } from './helpers/laser-environment';

function mounted() {
  const env = laserEnvironment();
  const clean = mountLaserFlow(env.container, env.canvas, env.settings, env.wake)!;
  env.intersect(true); env.tick();
  return { env, clean, finish() { clean(); env.rawCanvas.isConnected = false; env.tick(); env.restoreGlobals(); } };
}

test('600 stable frames reuse surface rects/radii; pointer bursts perform no synchronous geometry reads', () => {
  const { env, finish } = mounted();
  try {
    env.resetMetrics(); env.tick(600);
    assert.equal(env.metrics.draws, 600);
    assert.equal(env.metrics.rect, 0); assert.equal(env.metrics.style, 0);
    env.resetMetrics();
    for (let i = 0; i < 1000; i++) env.pointer(450 + i / 100, 350);
    assert.equal(env.metrics.rect, 0); assert.equal(env.metrics.animations, 0);
    env.tick(); assert.equal(env.metrics.rect, 0); assert.equal(env.metrics.draws, 1);
    assert.deepEqual(env.uniforms.get('uLens')?.slice(0, 2), [359.99, 250]);
  } finally { finish(); }
});

test('scroll, resize, mutation and replaced refs refresh geometry; scroll keeps the cached radius', () => {
  const { env, finish } = mounted();
  try {
    env.resetMetrics();
    env.rawContainer.rect.top = -100; env.surface.rect.top = 480;
    env.win.dispatchEvent(new Event('scroll')); env.tick();
    assert.equal(env.metrics.rect, 2); assert.equal(env.metrics.style, 0);
    assert.equal(env.uniforms.get('uSurface')?.[1], 580);
    env.surface.radius = '48px'; env.mutate(); env.tick();
    assert.deepEqual(env.uniforms.get('uRadius'), [48]);
    env.rawContainer.rect.width = 800; env.resize(env.rawContainer); env.tick();
    assert.deepEqual(env.uniforms.get('uResolution'), [800, 800]);
    const previous = env.surface;
    env.settings.current.surfaceRef = { current: null }; env.wake.current?.(); env.tick();
    assert.equal(env.uniforms.get('uSurface')?.[0], -1600);
    env.settings.current.surfaceRef.current = previous as unknown as HTMLElement; env.wake.current?.(); env.tick();
    assert.equal(env.uniforms.get('uSurface')?.[0], 200);
  } finally { finish(); }
});

test('WAAPI transforms refresh alignment each frame, opacity does not; final radius is sampled', () => {
  const { env, finish } = mounted();
  try {
    env.resetMetrics();
    env.surface.animations = [env.animation([{ opacity: 0, offset: 0 }, { opacity: 1, offset: 1 }])];
    env.tick(3); assert.equal(env.metrics.rect, 0);
    env.surface.animations = [env.animation([{ transform: 'translateY(0px)' }, { transform: 'translateY(40px)' }])];
    for (let i = 0; i < 3; i++) { env.surface.rect.top += 10; env.tick(); assert.equal(env.uniforms.get('uSurface')?.[1], 510 + i * 10); }
    assert.equal(env.metrics.rect, 6); assert.equal(env.metrics.style, 0);
    env.surface.animations = [env.animation([{ borderTopLeftRadius: '32px' }, { borderTopLeftRadius: '64px' }])];
    env.surface.radius = '60px'; env.tick();
    env.surface.animations = []; env.surface.radius = '64px'; env.tick();
    assert.deepEqual(env.uniforms.get('uRadius'), [64]);
    env.resetMetrics(); env.tick(3); assert.equal(env.metrics.rect, 0);
  } finally { finish(); }
});

test('offscreen/hidden rendering stops, reduced motion settles, pause freezes the intro and procedural time', () => {
  const { env, finish } = mounted();
  try {
    env.intersect(false); env.resetMetrics(); env.wake.current?.(); env.pointer(400, 300); env.resize(env.rawContainer); env.tick(10);
    assert.equal(env.metrics.draws, 0); assert.equal(env.metrics.rect, 0); assert.equal(env.frames.size, 0);
    env.intersect(true); env.tick(); assert.equal(env.metrics.draws, 1);
    env.doc.hidden = true; env.doc.dispatchEvent(new Event('visibilitychange')); env.resetMetrics(); env.wake.current?.(); env.tick(5);
    assert.equal(env.metrics.draws, 0); assert.equal(env.frames.size, 0);
    env.doc.hidden = false; env.doc.dispatchEvent(new Event('visibilitychange')); env.tick();
    env.pointer(400, 300); env.tick(5);
    env.media.matches = true; env.media.dispatchEvent(new Event('change')); env.tick(3);
    assert.equal(env.frames.size, 0); assert.equal(env.uniforms.get('uLens')?.[3], 0);
    env.resetMetrics(); env.pointer(500, 300); env.tick(3); assert.equal(env.metrics.draws, 0);
    env.media.matches = false; env.media.dispatchEvent(new Event('change')); env.tick(); assert.equal(env.frames.size, 1);
    env.settings.current.paused = true; env.wake.current?.(); env.tick();
    const time = env.uniforms.get('uTime'); const intro = env.uniforms.get('uIntro');
    env.wake.current?.(); env.tick(10);
    assert.deepEqual(env.uniforms.get('uTime'), time); assert.deepEqual(env.uniforms.get('uIntro'), intro); assert.equal(env.frames.size, 0);
  } finally { finish(); }
});

test('axis-aligned hero scaling keeps surface and pointer coordinates in canvas CSS pixels', () => {
  const { env, finish } = mounted();
  try {
    env.rawContainer.layoutWidth = 1000; env.rawContainer.layoutHeight = 800;
    env.rawContainer.rect.width = 1200; env.rawContainer.rect.height = 960;
    env.surface.rect = { left: 340, top: 700, width: 720, height: 360 };
    env.hero.animations = [env.animation([{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }])];
    env.pointer(700, 400); env.tick();
    assert.deepEqual(env.uniforms.get('uSurface'), [200, 500, 800, 800]);
    assert.deepEqual(env.uniforms.get('uRadius'), [32]);
    assert.deepEqual(env.uniforms.get('uLens')?.slice(0, 2), [500, 250]);
  } finally { finish(); }
});

test('sibling layout animations refresh surface position; nested decorative animations do not', () => {
  const { env, finish } = mounted();
  try {
    env.resetMetrics();
    env.rawCanvas.animations = [env.animation([{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }])];
    env.tick(3); assert.equal(env.metrics.rect, 0);
    env.sibling.animations = [env.animation([{ height: '40px' }, { height: '80px' }])];
    env.surface.rect.top = 640; env.tick(); assert.equal(env.uniforms.get('uSurface')?.[1], 540);
    env.surface.rect.top = 680; env.tick(); assert.equal(env.uniforms.get('uSurface')?.[1], 580);
    assert.equal(env.metrics.rect, 4);
  } finally { finish(); }
});

test('context loss cancels pending compilation; restoration recreates all resources; unmount leaves no listeners/observers', () => {
  const env = laserEnvironment(); env.config.parallel = true; env.config.complete = false;
  const clean = mountLaserFlow(env.container, env.canvas, env.settings, env.wake)!;
  try {
    env.intersect(true); env.tick(3); assert.equal(env.metrics.draws, 0);
    assert.equal(env.lose(), true); assert.equal(env.frames.size, 0); assert.equal(env.wake.current, null); assert.equal(env.observers(), 0);
    assert.equal(env.deleted.length, env.created.length);
    env.config.complete = true; env.restoreContext(); env.intersect(true); env.tick();
    assert.equal(env.metrics.draws, 1); assert.equal(env.created.filter(r => r.kind === 'createProgram').length, 2);
    assert.deepEqual(env.uniforms.get('uSurface'), [200, 500, 800, 800]);
    env.rawCanvas.isConnected = false; clean();
    assert.equal(env.deleted.length, env.created.length); assert.equal(new Set(env.deleted).size, env.deleted.length);
    assert.equal(env.metrics.lost, 1); assert.equal(env.frames.size, 0); assert.equal(env.observers(), 0);
    assert.equal(env.win.count() + env.doc.count() + env.doc.documentElement.count() + env.media.count() + env.rawCanvas.count(), 0);
  } finally { clean(); env.restoreGlobals(); }
});

test('Strict Mode replay cancels deferred context release, and partial GPU allocation cleans up', () => {
  const env = laserEnvironment();
  try {
    const first = mountLaserFlow(env.container, env.canvas, env.settings, env.wake)!;
    first(); assert.equal(env.frames.size, 1);
    const second = mountLaserFlow(env.container, env.canvas, env.settings, env.wake)!;
    env.intersect(true); env.tick(); assert.equal(env.metrics.lost, 0); assert.equal(env.metrics.draws, 1);
    env.rawCanvas.isConnected = false; second(); assert.equal(env.frames.size, 0);
    for (const allocation of ['createVertexArray', 'createBuffer', 'createTexture']) {
      env.config.failAllocation = allocation;
      const error = console.error; console.error = () => {};
      try { mountLaserFlow(env.container, env.canvas, env.settings, env.wake)!(); } finally { console.error = error; }
      assert.equal(env.created.length, env.deleted.length); assert.equal(env.observers(), 0);
    }
  } finally { env.restoreGlobals(); }
});

test('pausing early freezes the intro; render-resolution prop updates keep the existing cap', () => {
  const { env, finish } = mounted();
  try {
    const intro = env.uniforms.get('uIntro'); const time = env.uniforms.get('uTime');
    env.settings.current.paused = true; env.wake.current?.(); env.tick(10);
    assert.deepEqual(env.uniforms.get('uIntro'), intro); assert.deepEqual(env.uniforms.get('uTime'), time);
    assert.equal(env.frames.size, 0);
    env.settings.current.dpr = 1; env.wake.current?.(); env.tick(); assert.deepEqual(env.uniforms.get('uDpr'), [1]);
    env.settings.current.paused = false; env.wake.current?.(); env.tick();
    assert.notDeepEqual(env.uniforms.get('uIntro'), intro); assert.equal(env.frames.size, 1);
  } finally { finish(); }
});

test('partial allocation and failed linking release resources; diagnostics are development-only', () => {
  const env = laserEnvironment(); const error = console.error; const logs: unknown[][] = []; console.error = (...args) => logs.push(args);
  const previousMode = process.env.NODE_ENV;
  try {
    Reflect.set(process.env, 'NODE_ENV', 'development');
    env.config.failAllocation = 'createShader';
    assert.equal(createLaserProgram(env.gl, 'vertex', 'fragment'), null);
    assert.equal(env.created.length, env.deleted.length);
    env.config.failAllocation = ''; env.config.link = false; env.config.shader = false;
    const program = createLaserProgram(env.gl, 'vertex', 'fragment')!; assert.equal(program.resolve(), false); program.dispose(); program.dispose();
    assert.equal(logs.length, 4); // allocation, two shaders, link
    assert.equal(env.created.length, env.deleted.length);
    logs.length = 0; Reflect.set(process.env, 'NODE_ENV', 'production');
    const production = createLaserProgram(env.gl, 'vertex', 'fragment')!; production.resolve(); production.dispose(); assert.equal(logs.length, 0);
    assert.equal(env.created.length, env.deleted.length);
  } finally { if (previousMode === undefined) Reflect.deleteProperty(process.env, 'NODE_ENV'); else Reflect.set(process.env, 'NODE_ENV', previousMode); console.error = error; env.restoreGlobals(); }
});

test('reveal textures use decoded image dimensions, ignore stale loads and detach callbacks on teardown', () => {
  const { env, clean, finish } = mounted(); const error = console.error; const logs: unknown[][] = []; console.error = (...args) => logs.push(args);
  try {
    assert.equal(env.images.length, 0); // actual hero omits revealImage
    env.settings.current.revealImage = '/images/hero-studio.jpg'; env.wake.current?.(); env.tick();
    const first = env.images[0]; const stale = first.onload!;
    env.settings.current.revealImage = '/img/mono.png'; env.wake.current?.(); env.tick();
    assert.equal(first.onload, null); assert.equal(first.onerror, null);
    stale(); assert.equal(env.uniforms.get('uRevealInfo')?.[1], 0);
    env.images[1].onload!(); env.tick(); assert.equal(env.uniforms.get('uRevealInfo')?.[1], .6);
    env.settings.current.revealImage = '/not-an-image'; env.wake.current?.(); env.tick(); env.images[2].onerror!();
    assert.equal(env.uniforms.get('uRevealInfo')?.[1], 0); assert.equal(logs.length, 1);
    env.settings.current.revealImage = '/blocked.png'; env.wake.current?.(); env.tick(); env.config.uploadFails = true; env.images[3].onload!();
    assert.equal(logs.length, 2); assert.equal(env.uniforms.get('uRevealInfo')?.[1], 0);
    clean(); assert.equal(env.images[3].onload, null); assert.equal(env.images[3].onerror, null);
  } finally { console.error = error; finish(); }
});

test('defined ascending smoothstep complements retain the descending mask profile', () => {
  assert.match(FRAGMENT, /1\.0 - smoothstep\(front - 110\.0, front \+ 10\.0, p\.y\)/);
  assert.match(FRAGMENT, /1\.0 - smoothstep\(front - 40\.0, front \+ 80\.0, p\.y\)/);
  const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x-a)/(b-a))); return t*t*(3-2*t); };
  for (const [a, b] of [[10, -110], [80, -40]]) for (let x = -200; x <= 200; x += .25) assert.ok(Math.abs(smooth(a, b, x) - (1-smooth(b, a, x))) < 1e-14);
});
