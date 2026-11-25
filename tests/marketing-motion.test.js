import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RevealContainer, RevealHeading, RevealParagraph, RevealCard } from "../components/motion/primitives";
import { observeReveal } from "../components/motion/viewport";

function setup() {
  const listeners = new Map();
  const media = { matches: false, addEventListener: (name, listener) => listeners.set(`media:${name}`, listener), removeEventListener: (name) => listeners.delete(`media:${name}`) };
  let instances = 0;
  let callback = () => {};
  const observed = new Set();
  class FakeNode {}
  class FakeObserver {
    constructor(fn) { instances++; callback = fn; }
    observe(element) { observed.add(element); }
    unobserve(element) { observed.delete(element); }
    disconnect() { observed.clear(); }
  }
  const prior = new Map();
  for (const [key, value] of Object.entries({
    Node: FakeNode,
    IntersectionObserver: FakeObserver,
    window: { innerHeight: 800, matchMedia: () => media, addEventListener: (n, f) => listeners.set(n, f), removeEventListener: (n) => listeners.delete(n) },
    document: { addEventListener: (n, f) => listeners.set(n, f), removeEventListener: (n) => listeners.delete(n) },
  })) {
    prior.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
  }
  const element = { contains: (target) => target instanceof FakeNode, getBoundingClientRect: () => ({ top: 1000 }) };
  return { element, media, listeners, observed, instances: () => instances, focusTarget: new FakeNode(), notify: (entries) => callback(entries), restore: () => { for (const [key, descriptor] of prior) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else Reflect.deleteProperty(globalThis, key); } } };
}

test("server-rendered headings, body and cards stay visible without animation initialization", () => {
  const html = renderToStaticMarkup(
    createElement(
      RevealContainer,
      null,
      createElement(RevealHeading, null, "A voice with intention."),
      createElement(RevealParagraph, null, "Readable before JavaScript runs."),
      createElement(RevealCard, null, "Audio controls")
    )
  );
  assert.match(html, /A voice with intention\./);
  assert.match(html, /Readable before JavaScript runs\./);
  assert.match(html, /Audio controls/);
  assert.doesNotMatch(html, /opacity:0|visibility:hidden|translateY/);
  assert.equal((html.match(/A voice with intention\./g) ?? []).length, 1);
});

test("one observer serves multiple groups, waits for 12%, and reveals each once", () => {
  const env = setup(); let calls = 0;
  const other = { ...env.element };
  const cleanA = observeReveal(env.element, () => calls++);
  const cleanB = observeReveal(other, () => calls++);
  try {
    assert.equal(env.instances(), 1);
    env.notify([{ target: env.element, isIntersecting: true, intersectionRatio: 0.05, boundingClientRect: { height: 300, bottom: 100 } }]);
    assert.equal(calls, 0);
    env.notify([{ target: env.element, isIntersecting: true, intersectionRatio: 0.12, boundingClientRect: { height: 300, bottom: 100 } }]);
    assert.equal(calls, 1);
    assert.equal(env.observed.has(env.element), false);
    env.notify([{ target: env.element, isIntersecting: true, intersectionRatio: 1, boundingClientRect: { height: 300, bottom: 100 } }]);
    assert.equal(calls, 1);
  } finally { cleanA(); cleanB(); assert.equal(env.listeners.size, 0); env.restore(); }
});

test("tall sections and content skipped by a fast scroll cannot remain hidden", () => {
  const env = setup(); let calls = 0;
  const other = { ...env.element };
  const cleanA = observeReveal(env.element, () => calls++);
  const cleanB = observeReveal(other, () => calls++);
  try {
    env.notify([{ target: env.element, isIntersecting: true, intersectionRatio: 0.01, boundingClientRect: { height: 4000, bottom: 100 } }, { target: other, isIntersecting: false, intersectionRatio: 0, boundingClientRect: { height: 300, bottom: -100 } }]);
    assert.equal(calls, 2);
    assert.equal(env.observed.size, 0);
  } finally { cleanA(); cleanB(); env.restore(); }
});

test("keyboard focus and a changed reduced-motion preference recover pending content", () => {
  const env = setup(); let calls = 0;
  const other = { contains: () => false };
  const cleanA = observeReveal(env.element, () => calls++);
  const cleanB = observeReveal(other, () => calls++);
  try {
    env.listeners.get("focusin")?.({ target: env.focusTarget });
    assert.equal(calls, 1);
    env.media.matches = true;
    env.listeners.get("media:change")?.();
    assert.equal(calls, 2);
    assert.equal(env.listeners.size, 0);
  } finally { cleanA(); cleanB(); env.restore(); }
});
