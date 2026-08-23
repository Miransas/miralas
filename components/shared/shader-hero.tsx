"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;

  float random(float x) {
    return fract(sin(x) * 1e4);
  }
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;

    float aspect = resolution.x / resolution.y;
    vec2 fMosaicScal = vec2(
      mix(2.0, 6.0, smoothstep(0.5, 2.0, aspect)),
      mix(3.0, 2.0, smoothstep(0.5, 2.0, aspect))
    );
    float baseGrid = mix(180.0, 256.0, smoothstep(0.5, 2.0, aspect));
    vec2 vScreenSize = vec2(baseGrid);

    vec2 mosaicUV = uv;
    mosaicUV.x = floor(mosaicUV.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
    mosaicUV.y = floor(mosaicUV.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

    float t = time * 0.06 + random(mosaicUV.x) * 0.4;
    float lineWidth = 0.0012;
    vec3 color = vec3(0.0);

    for (int j = 0; j < 3; j++) {
      for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float fj = float(j);
        float wave = fract(t - 0.01 * fj + fi * 0.01);
        float dist = length(mosaicUV);
        color[j] += lineWidth * fi * fi / abs(wave - dist);
      }
    }

    vec3 finalColor = vec3(color.b * 0.9, color.g * 0.6, color.r * 1.2);
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv * 0.7));
    finalColor *= vignette * 0.8 + 0.2;
    finalColor += random(gl_FragCoord.xy + time) * 0.03;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      time: { value: 1.2 },
      resolution: { value: new THREE.Vector2() },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    scene.add(new THREE.Mesh(geometry, material));

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 1.75);
    renderer.setPixelRatio(dpr);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height, false);
      uniforms.resolution.value.set(width * renderer.getPixelRatio(), height * renderer.getPixelRatio());
    };

    const ro = new ResizeObserver(updateSize);
    ro.observe(container);
    updateSize();

    let raf = 0;
    let visible = true;
    let last = 0;
    const frameMs = 1000 / 30;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(container);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (reduce || !visible) return;
      if (now - last < frameMs) return;
      last = now;
      uniforms.time.value = now * 0.001;
      renderer.render(scene, camera);
    };

    renderer.render(scene, camera);
    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full overflow-hidden" />;
}