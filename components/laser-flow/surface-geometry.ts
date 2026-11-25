import type { Surface } from './types';

// Opacity/color animations do not change alignment. CSS/WAAPI geometry animations
// must be sampled while active; ResizeObserver alone cannot see transforms.
// https://developer.mozilla.org/en-US/docs/Web/API/Element/getAnimations
const geometryProperty = /^(transform|translate|rotate|scale|perspective|offset[A-Z]|width|height|minWidth|maxWidth|minHeight|maxHeight|top|right|bottom|left|inset|margin|padding|border|font|lineHeight|gap|grid|flex|position|zoom|--)/;

export function createSurfaceGeometry(container: HTMLElement, onChange: (resized: boolean) => void) {
  let element: HTMLElement | null = null;
  let dirty = true;
  let radiusDirty = true;
  let radius = 0;
  let surface: Surface | null = null;
  let box: DOMRect | null = null;
  let lineage: HTMLElement[] = [];
  let animationRoot: HTMLElement = container;
  let animationNodes: HTMLElement[] = [];
  const parents = new Map<HTMLElement, HTMLElement | null>();
  let wasAnimating = false;
  let wasRadiusAnimating = false;
  const animationKinds = new WeakMap<Animation, { geometry: boolean; layout: boolean; radius: boolean }>();
  const invalidate = (style = true, resized = false) => {
    dirty = true;
    radiusDirty ||= style;
    onChange(resized);
  };
  const resize = new ResizeObserver(() => invalidate(true, true));
  const mutation = new MutationObserver(() => invalidate());
  const onScroll = () => invalidate(false);
  const onResize = () => invalidate(true, true);
  const onAnimation = (event: Event) => { if (lineage.includes(event.target as HTMLElement) || animationRoot.contains(event.target as Node)) invalidate(); };
  // Capture nested scrollers too. Rects are viewport-relative, so a scroll can
  // move either side independently (including sticky surfaces).
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('resize', onResize, { passive: true });
  container.ownerDocument.addEventListener('animationstart', onAnimation, true);
  container.ownerDocument.addEventListener('animationend', onAnimation, true);
  container.ownerDocument.addEventListener('animationcancel', onAnimation, true);
  container.ownerDocument.addEventListener('transitionrun', onAnimation, true);
  container.ownerDocument.addEventListener('transitionend', onAnimation, true);
  container.ownerDocument.addEventListener('transitioncancel', onAnimation, true);

  function observe(next: HTMLElement | null) {
    element = next;
    resize.disconnect();
    mutation.disconnect();
    const ancestors = new Set<HTMLElement>();
    for (const start of [container, element]) {
      for (let node = start; node; node = node.parentElement) ancestors.add(node);
    }
    lineage = [...ancestors];
    parents.clear();
    for (const node of lineage) {
      parents.set(node, node.parentElement);
      mutation.observe(node, { attributes: true, attributeFilter: ['class', 'style', 'hidden'], childList: true });
      resize.observe(node);
    }
    // Child insertion, font/content changes or inline layout animation in the
    // shared hero can change the surface position without resizing the canvas.
    let common = container.parentElement;
    while (common && element && !common.contains(element)) common = common.parentElement;
    if (common) mutation.observe(common, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
    animationRoot = common ?? container;
    animationNodes = [animationRoot, ...lineage.filter(node => node !== animationRoot && !animationRoot.contains(node))];
    dirty = radiusDirty = true;
  }

  function read(next: HTMLElement | null, width: number, height: number) {
    if (next !== element || !lineage.length || lineage.some(node => node.parentElement !== parents.get(node))) observe(next);
    let animating = false;
    let radiusAnimating = false;
    for (const node of animationNodes) {
      for (const animation of node.getAnimations({ subtree: node === animationRoot })) {
        if (animation.playState !== 'running' && !animation.pending) continue;
        if (!(animation.effect instanceof KeyframeEffect)) continue;
        const target = animation.effect.target;
        const direct = target !== null && parents.has(target as HTMLElement);
        // Descendant decorations cannot move an enclosing surface. Its size is
        // observed separately. Sibling layout animations can move it, though.
        if (!direct && target && (container.contains(target) || element?.contains(target))) continue;
        let kind = animationKinds.get(animation);
        if (!kind) {
          const keys = animation.effect.getKeyframes().flatMap(frame => Object.keys(frame));
          kind = { geometry: keys.some(key => geometryProperty.test(key)), layout: keys.some(key => geometryProperty.test(key) && !/^(transform|translate|rotate|scale|perspective|offset|border.*Radius)/.test(key)), radius: keys.some(key => /^(border.*Radius|--)/.test(key)) };
          animationKinds.set(animation, kind);
        }
        animating ||= direct ? kind.geometry : kind.layout;
        radiusAnimating ||= direct && kind.radius;
      }
    }
    if (dirty || animating || wasAnimating) {
      box = container.getBoundingClientRect();
      // Convert viewport pixels back into the canvas's CSS coordinate system
      // during axis-aligned scale animations of the containing hero.
      const scaleX = box.width > 0 ? width / box.width : 1;
      const scaleY = box.height > 0 ? height / box.height : 1;
      const rect = element?.getBoundingClientRect();
      surface = null;
      if (element && rect && rect.width > 0) {
        if (radiusDirty || radiusAnimating || wasRadiusAnimating) {
          const computed = getComputedStyle(element);
          radius = Math.max(parseFloat(computed.borderTopLeftRadius) || 0, parseFloat(computed.borderTopRightRadius) || 0);
        }
        surface = { left: (rect.left - box.left) * scaleX, top: (rect.top - box.top) * scaleY, right: (rect.right - box.left) * scaleX, bottom: (rect.bottom - box.top) * scaleY, radius: Math.min(radius, rect.width * scaleX / 2, rect.height * scaleY / 2), real: true };
      }
      dirty = radiusDirty = false;
    }
    wasAnimating = animating;
    wasRadiusAnimating = radiusAnimating;
    return { box: box!, surface, animating };
  }

  return {
    read,
    invalidate,
    dispose() {
      resize.disconnect();
      mutation.disconnect();
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
      for (const event of ['animationstart', 'animationend', 'animationcancel', 'transitionrun', 'transitionend', 'transitioncancel']) container.ownerDocument.removeEventListener(event, onAnimation, true);
    },
  };
}
