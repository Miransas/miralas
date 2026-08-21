"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  #define TWO_PI 6.2831853072
  #define PI 3.14159265359

  precision highp float;
  uniform vec2 resolution;
  uniform float time;

  out vec4 fragColor;

  float random(in float x) {
    return fract(sin(x) * 1e4);
  }

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main(void) {
    // Proper aspect-ratio-corrected UVs
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;

    // Dynamic mosaic scale based on resolution (responsive)
    float aspect = resolution.x / resolution.y;
    vec2 fMosaicScal = vec2(
      mix(2.0, 6.0, smoothstep(0.5, 2.0, aspect)),
      mix(3.0, 2.0, smoothstep(0.5, 2.0, aspect))
    );

    // Base grid size - larger on mobile for smoother look
    float baseGrid = mix(180.0, 256.0, smoothstep(0.5, 2.0, aspect));
    vec2 vScreenSize = vec2(baseGrid);

    // Apply mosaic
    vec2 mosaicUV = uv;
    mosaicUV.x = floor(mosaicUV.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
    mosaicUV.y = floor(mosaicUV.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

    // Time with random offset per column for organic feel
    float t = time * 0.06 + random(mosaicUV.x) * 0.4;
    float lineWidth = 0.0012;

    // Color accumulation
    vec3 color = vec3(0.0);
    for (int j = 0; j < 3; j++) {
      for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float fj = float(j);
        float wave = fract(t - 0.01 * fj + fi * 0.01) * 1.0;
        float dist = length(mosaicUV);
        color[j] += lineWidth * fi * fi / abs(wave - dist);
      }
    }

    // Purple-tinted output matching the brand
    vec3 finalColor = vec3(color[2] * 0.9, color[1] * 0.6, color[0] * 1.2);

    // Vignette for depth
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv * 0.7));
    finalColor *= vignette * 0.8 + 0.2;

    // Subtle grain
    float grain = random(gl_FragCoord.xy + time) * 0.03;
    finalColor += grain;

    fragColor = vec4(finalColor, 1.0);
  }
`;

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      glslVersion: THREE.GLSL3,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "low-power",
    });

    renderer.setClearColor(0x000000, 0);

    // Cap pixel ratio for performance
    const dpr = Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2);
    renderer.setPixelRatio(dpr);

    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height, false);
      uniforms.resolution.value.set(
        width * renderer.getPixelRatio(),
        height * renderer.getPixelRatio()
      );
    };

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);
    updateSize();

    let animationFrameId: number;
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);

      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
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