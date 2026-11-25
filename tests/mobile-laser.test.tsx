import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { HeroLaser } from '../components/laser-flow/hero-laser';
import LaserHero from '../components/shared/laser-hero';
import { DESKTOP_HERO_LASER, MOBILE_HERO_LASER, MOBILE_LASER_QUERY, mobileLaserSnapshot, serverLaserSnapshot, subscribeMobileLaser } from '../components/laser-flow/hero-presets';
import { mountLaserFlow } from '../components/laser-flow/renderer';
import { laserEnvironment } from './helpers/laser-environment';

const widths = [320, 375, 390, 430, 768, 1440];

test('mobile and desktop presets match the requested/current settings exactly', () => {
  assert.deepEqual(MOBILE_HERO_LASER, {
    beamPosition: .82, color: '#0F60E4', intensity: 1.15, flare: 1.1, spread: .95,
    spill: .65, fog: .22, dust: .35, beamWidth: .85, streaks: .8, dots: .1,
    pulse: .5, speed: 1.2, seed: 8, dpr: 1, mouseInteraction: false,
  });
  assert.deepEqual(DESKTOP_HERO_LASER, {
    beamPosition: .59, color: '#0F60E4', intensity: 1.65, flare: 1.4, spread: 1.35,
    spill: .95, fog: .45, dust: .85, beamWidth: 1.1, streaks: 1.45, dots: .30,
    pulse: .9, speed: 1.65, seed: 8, mouseInteraction: true,
  });
});

test('the media store updates and cleans up; SSR has one canvas and a stable hydration snapshot', () => {
  const env = laserEnvironment();
  let changes = 0; const queries: string[] = [];
  const match = env.win.matchMedia;
  Reflect.set(env.win, 'matchMedia', (query: string) => { queries.push(query); return env.media; });
  try {
    env.media.matches = false;
    const clean = subscribeMobileLaser(() => changes++);
    assert.equal(mobileLaserSnapshot(), false);
    env.media.matches = true; env.media.dispatchEvent(new Event('change'));
    assert.equal(mobileLaserSnapshot(), true); assert.equal(changes, 1);
    assert.equal(serverLaserSnapshot(), false);
    assert.ok(queries.every(query => query === MOBILE_LASER_QUERY));
    const mobileSSR = renderToStaticMarkup(<HeroLaser surfaceRef={{ current: null }} />);
    env.media.matches = false;
    const desktopSSR = renderToStaticMarkup(<HeroLaser surfaceRef={{ current: null }} />);
    assert.equal(mobileSSR, desktopSSR);
    assert.equal((mobileSSR.match(/<canvas\b/g) ?? []).length, 1);
    assert.match(mobileSSR, /data-hero-laser="true" class="pointer-events-none absolute inset-0"/);
    assert.match(mobileSSR, /data-laser-fallback/); assert.match(mobileSSR, /left-\[82%\]/);
    assert.doesNotMatch(mobileSSR, /onTouch|touch-action/);
    clean(); assert.equal(env.media.count(), 0);
  } finally { Reflect.set(env.win, 'matchMedia', match); env.restoreGlobals(); }
});

for (const width of widths) test(`controlled ${width}px viewport fixture preserves surface/beam alignment and canvas sizing`, () => {
  const env = laserEnvironment();
  const mobile = width < 1024;
  Object.assign(env.settings.current, mobile ? MOBILE_HERO_LASER : DESKTOP_HERO_LASER);
  const height = width >= 768 ? 1200 : 1000;
  env.rawContainer.rect = { left: 0, top: 0, width, height };
  const left = width >= 768 ? .18 * width : .05 * width;
  const right = width >= 768 ? .88 * width : .95 * width;
  const top = width >= 768 ? .65 * height : 650;
  env.surface.rect = { left, top, width: right-left, height: height-top };
  const clean = mountLaserFlow(env.container, env.canvas, env.settings, env.wake)!;
  try {
    env.intersect(true); env.tick();
    assert.deepEqual(env.uniforms.get('uResolution'), [width, height]);
    const expectedRatio = mobile ? 1 : Math.min(2, 2048 / Math.max(width, height));
    assert.equal(env.rawCanvas.width, Math.round(width * expectedRatio));
    assert.equal(env.rawCanvas.height, Math.round(height * expectedRatio));
    assert.equal(env.uniforms.get('uBeamX')?.[0], width * (mobile ? .82 : .59));
    assert.deepEqual(env.uniforms.get('uSurface'), [left, top, right, height]);
    assert.deepEqual(env.uniforms.get('uAmount'), mobile ? [1.15, .22, .35, .8] : [1.65, .45, .85, 1.45]);
    const beam = env.uniforms.get('uBeamX')![0] as number;
    assert.ok(beam >= left + 38 && beam <= right - 38);
    if (mobile) {
      env.resetMetrics(); env.pointer(width*.82, 300); env.tick();
      assert.equal(env.metrics.rect, 0); assert.equal(env.uniforms.get('uLens')?.[3], 0);
    }
    env.intersect(false); env.resetMetrics(); env.wake.current?.(); env.tick(10);
    assert.equal(env.metrics.draws, 0); assert.equal(env.frames.size, 0);
    env.intersect(true); env.tick(); env.media.matches = true; env.media.dispatchEvent(new Event('change')); env.tick(3);
    assert.equal(env.frames.size, 0); assert.equal(env.uniforms.get('uLens')?.[3], 0);
  } finally { env.rawCanvas.isConnected = false; clean(); env.restoreGlobals(); }
});

test('orientation/breakpoint changes resize the same renderer without allocating another program', () => {
  const env = laserEnvironment();
  Object.assign(env.settings.current, MOBILE_HERO_LASER);
  const clean = mountLaserFlow(env.container, env.canvas, env.settings, env.wake)!;
  try {
    env.rawContainer.rect = { left: 0, top: 0, width: 390, height: 1000 };
    env.surface.rect = { left: 19.5, top: 650, width: 351, height: 350 };
    env.intersect(true); env.tick();
    for (const [width, height] of [[768, 1200], [1024, 1200], [390, 1100], [430, 1000], [1440, 1200], [320, 1200]]) {
      env.settings.current = { ...env.settings.current, ...DESKTOP_HERO_LASER, dpr: undefined, ...(width < 1024 ? MOBILE_HERO_LASER : {}) };
      env.rawContainer.rect.width = width;
      env.rawContainer.rect.height = height;
      env.surface.rect = { left: .05*width, top: .65*height, width: .9*width, height: .35*height };
      env.resize(env.rawContainer); env.wake.current?.(); env.tick();
      assert.deepEqual(env.uniforms.get('uResolution'), [width, height]);
      assert.equal(env.created.filter(resource => resource.kind === 'createProgram').length, 1);
    }
  } finally { env.rawCanvas.isConnected = false; clean(); assert.equal(env.created.length, env.deleted.length); env.restoreGlobals(); }
});

test('fallback status covers unavailable/throwing WebGL and real renderer loss/restoration', () => {
  for (const unavailable of ['null', 'throw']) {
    const env = laserEnvironment(); const status: boolean[] = [];
    Reflect.set(env.rawCanvas, 'getContext', () => { if (unavailable === 'throw') throw new Error('unavailable'); return null; });
    try {
      assert.equal(mountLaserFlow(env.container, env.canvas, env.settings, env.wake, value => status.push(value)), undefined);
      assert.deepEqual(status, [false]); assert.equal(env.frames.size, 0); assert.equal(env.observers(), 0); assert.equal(env.created.length, 0);
    } finally { env.restoreGlobals(); }
  }
  const env = laserEnvironment(); const status: boolean[] = [];
  const clean = mountLaserFlow(env.container, env.canvas, env.settings, env.wake, value => status.push(value))!;
  try {
    assert.deepEqual(status, [false]); env.intersect(true); env.tick(3); assert.deepEqual(status, [false, true]);
    env.lose(); assert.deepEqual(status, [false, true, false]);
    env.restoreContext(); env.intersect(true); env.tick(); assert.deepEqual(status, [false, true, false, true]);
  } finally { env.rawCanvas.isConnected = false; clean(); env.restoreGlobals(); }
});

test('hero preserves copy and original video/poster, with one shader layer', () => {
  const html = renderToStaticMarkup(<LaserHero />);
  assert.equal((html.match(/<canvas\b/g) ?? []).length, 1);
  assert.match(html, /Give intelligence/); assert.match(html, /a natural voice\./);
  assert.match(html, /src="\/hero.mp4"/); assert.match(html, /poster="\/portraits\/hero.png"/);
  assert.match(html, /md:h-\[1200px\]/); assert.match(html, /bg-\[#050505\]/);
});
