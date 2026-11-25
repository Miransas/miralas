export function laserEnvironment() {
  const metrics = { rect: 0, style: 0, animations: 0, keyframes: 0, draws: 0, lost: 0 };
  const config = { parallel: false, complete: true, link: true, shader: true, contextLost: false, uploadFails: false, failAllocation: '' };
  const uniforms = new Map();
  const created = [];
  const deleted = [];
  let id = 0;
  const constants = new Map([['LINK_STATUS', 10], ['COMPILE_STATUS', 11]]);
  const gl = new Proxy({}, { get: (_, key) => {
    if (key.toUpperCase() === key) { if (!constants.has(key)) constants.set(key, constants.size + 20); return constants.get(key); }
    if (key === 'getExtension') return (name) => name === 'KHR_parallel_shader_compile' && config.parallel ? { COMPLETION_STATUS_KHR: 99 } : name === 'WEBGL_lose_context' ? { loseContext: () => metrics.lost++ } : null;
    if (key === 'isContextLost') return () => config.contextLost;
    if (key === 'getProgramParameter') return (_program, parameter) => parameter === 99 ? config.complete : config.link;
    if (key === 'getShaderParameter') return () => config.shader;
    if (key === 'getShaderInfoLog' || key === 'getProgramInfoLog') return () => 'test diagnostic';
    if (key === 'getUniformLocation') return (_program, name) => name;
    if (key === 'getAttribLocation') return () => 0;
    if (key.startsWith('create')) return () => {
      if (config.failAllocation === key) return null;
      const resource = { kind: key, id: ++id }; created.push(resource); return resource;
    };
    if (key.startsWith('delete')) return (resource) => deleted.push(resource);
    if (key.startsWith('uniform')) return (name, ...values) => uniforms.set(name, values);
    if (key === 'drawArrays') return () => metrics.draws++;
    if (key === 'texImage2D') return (...args) => { if (args.length === 6 && config.uploadFails) throw new Error('blocked upload'); };
    return () => {};
  } });
  class Target extends EventTarget {
    listeners = new Map();
    addEventListener(type, callback, options) {
      if (callback) { if (!this.listeners.has(type)) this.listeners.set(type, new Set()); this.listeners.get(type).add(callback); }
      super.addEventListener(type, callback, options);
    }
    removeEventListener(type, callback, options) {
      if (callback) this.listeners.get(type)?.delete(callback);
      super.removeEventListener(type, callback, options);
    }
    count() { return [...this.listeners.values()].reduce((n, set) => n + set.size, 0); }
  }
  class Effect {
    target = null;
    constructor(keys) {
      this.keys = keys;
    }
    getKeyframes() { metrics.keyframes++; return this.keys; }
  }
  const elements = [];
  class ElementMock extends Target {
    constructor() { super(); elements.push(this); }
    parentElement = null;
    ownerDocument = null;
    animations = [];
    radius = '32px';
    layoutWidth = undefined;
    layoutHeight = undefined;
    rect = { left: 100, top: 100, width: 1000, height: 800 };
    get clientWidth() { return this.layoutWidth ?? this.rect.width; }
    get clientHeight() { return this.layoutHeight ?? this.rect.height; }
    getBoundingClientRect() { metrics.rect++; return { ...this.rect, right: this.rect.left + this.rect.width, bottom: this.rect.top + this.rect.height }; }
    getAnimations(options) {
      metrics.animations++;
      const nodes = options?.subtree ? elements.filter(node => this.contains(node)) : [this];
      return nodes.flatMap(node => node.animations.map(animation => { animation.effect.target = node; return animation; }));
    }
    contains(node) { for (let current = node; current; current = current.parentElement) if (current === this) return true; return false; }
  }
  const context2d = { fillStyle: '', clearRect() {}, fillRect() {}, getImageData: () => ({ data: [15, 96, 228, 255] }), drawImage() {} };
  class CanvasMock extends ElementMock {
    width = 1; height = 1; isConnected = true;
    getContext(name) { return name === 'webgl2' ? gl : context2d; }
  }
  const media = Object.assign(new Target(), { matches: false });
  const win = Object.assign(new Target(), { devicePixelRatio: 2, matchMedia: () => media });
  const doc = Object.assign(new Target(), { hidden: false, documentElement: new ElementMock(), createElement: () => new CanvasMock() });
  const hero = new ElementMock(); hero.parentElement = doc.documentElement;
  const container = new ElementMock(); container.parentElement = hero;
  const surface = new ElementMock(); surface.parentElement = hero; surface.rect = { left: 300, top: 600, width: 600, height: 300 };
  const sibling = new ElementMock(); sibling.parentElement = hero;
  const canvas = new CanvasMock(); canvas.parentElement = container;
  for (const node of [doc.documentElement, hero, container, surface, sibling, canvas]) node.ownerDocument = doc;
  const resizers = [];
  class ResizeMock {
    elements = new Set();
    constructor(callback) { this.callback = callback; resizers.push(this); }
    observe(node) { this.elements.add(node); }
    unobserve(node) { this.elements.delete(node); }
    disconnect() { this.elements.clear(); }
  }
  const mutations = [];
  class MutationMock {
    active = false;
    constructor(callback) { this.callback = callback; mutations.push(this); }
    observe() { this.active = true; }
    disconnect() { this.active = false; }
  }
  const intersections = [];
  class IntersectionMock {
    active = true;
    constructor(callback) { this.callback = callback; intersections.push(this); }
    observe() {}
    disconnect() { this.active = false; }
  }
  const images = [];
  class ImageMock {
    onload = null; onerror = null;
    naturalWidth = 400; naturalHeight = 200; crossOrigin = ''; decoding = ''; src = '';
    constructor() { images.push(this); }
  }
  const frames = new Map();
  let nextFrame = 0; let now = 0;
  const descriptors = new Map();
  for (const [key, value] of Object.entries({
    window: win, document: doc, ResizeObserver: ResizeMock, MutationObserver: MutationMock,
    IntersectionObserver: IntersectionMock, KeyframeEffect: Effect, Image: ImageMock,
    getComputedStyle: (node) => { metrics.style++; return { borderTopLeftRadius: node.radius, borderTopRightRadius: node.radius }; },
    requestAnimationFrame: (callback) => { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame: (frame) => frames.delete(frame),
  })) {
    descriptors.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  const settings = {
    surfaceRef: { current: surface }, beamPosition: .59, surfaceLevel: 1,
    color: '#0F60E4', intensity: 1.65, beamWidth: 1.1, flare: 1.4, spread: 1.35, spill: .95,
    fog: .45, dust: .85, streaks: 1.45, dots: .3, pulse: .9, speed: 1.65, seed: 8,
    mouseInteraction: true, revealRadius: 220, revealOpacity: .6, intro: true, theme: 'dark', paused: false,
  };
  return {
    metrics, config, uniforms, created, deleted, container,
    canvas, surface, hero, sibling, rawContainer: container, rawCanvas: canvas,
    gl, images, settings: { current: settings }, wake: { current: null }, frames, media, win, doc,
    tick(count = 1) { for (let i = 0; i < count; i++) { const batch = [...frames.values()]; frames.clear(); now += 1000 / 60; batch.forEach(callback => callback(now)); } },
    intersect(visible) { intersections.filter(observer => observer.active).forEach(observer => observer.callback([{ isIntersecting: visible }])); },
    resize(node) { resizers.filter(observer => observer.elements.has(node)).forEach(observer => observer.callback()); },
    mutate() { mutations.filter(observer => observer.active).forEach(observer => observer.callback()); },
    animation(keys) { return { playState: 'running', pending: false, effect: new Effect(keys) }; },
    pointer(x, y) { const event = new Event('pointermove'); Object.assign(event, { clientX: x, clientY: y }); win.dispatchEvent(event); },
    lose() { config.contextLost = true; const event = new Event('webglcontextlost', { cancelable: true }); canvas.dispatchEvent(event); return event.defaultPrevented; },
    restoreContext() { config.contextLost = false; canvas.dispatchEvent(new Event('webglcontextrestored')); },
    observers() { return resizers.filter(r => r.elements.size).length + mutations.filter(m => m.active).length + intersections.filter(i => i.active).length; },
    resetMetrics() { metrics.rect = metrics.style = metrics.animations = metrics.keyframes = metrics.draws = 0; },
    restoreGlobals() { for (const [key, descriptor] of descriptors) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else Reflect.deleteProperty(globalThis, key); } },
  };
}
