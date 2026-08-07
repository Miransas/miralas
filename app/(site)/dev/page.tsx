"use client";

import { useEffect, useRef } from "react";

// --- CANLI AKIŞKAN CAM SHADER (Mavi/Beyaz, Soldan Sağa Yatay) ---
const VERT = `
  attribute vec2 a_position;
  void main() { 
    gl_Position = vec4(a_position, 0.0, 1.0); 
  }
`;

const FRAG = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;

    // Arka plan temel karanlık renk
    vec3 color = vec3(0.02, 0.02, 0.03);

    // Hareket zamanı
    float t = u_time * 0.4;
    vec2 flowUV = p;
    
    // Mouse etkileşimi
    vec2 mouseOffset = (u_mouse * 2.0 - 1.0) * 0.1;
    flowUV -= mouseOffset;

    // Soldan sağa yatay akış
    flowUV.x -= t;

    float wave1 = sin(flowUV.x * 2.5 + cos(flowUV.y * 2.0));
    float wave2 = cos(flowUV.y * 3.0 - sin(flowUV.x * 1.5 + t));
    vec2 dist = vec2(wave1, wave2) * 0.3;
    vec2 warpedUV = flowUV + dist;

    // Sadece Mavi ve Beyaz bantlar
    float blueBand = sin(warpedUV.x * 3.0 + warpedUV.y * 2.0);
    color = mix(color, vec3(0.1, 0.35, 1.0), smoothstep(0.1, 0.9, blueBand));

    float whiteBand = cos(warpedUV.x * -4.0 + warpedUV.y * 4.0 + t * 1.2);
    color = mix(color, vec3(0.9, 0.95, 1.0), smoothstep(0.7, 0.95, whiteBand));

    // Sıcak yansımalar (Sadece ufak parıltılar)
    float warmBand = sin(warpedUV.x * 2.0 - warpedUV.y * 3.0 - t * 0.8);
    color = mix(color, vec3(1.0, 0.65, 0.3), smoothstep(0.65, 1.0, warmBand) * 0.85);

    // Derin siyah boşluklar
    float darkBand = sin(warpedUV.x * 5.0 + warpedUV.y * 5.0 + t * 0.5);
    color *= smoothstep(0.0, 0.6, darkBand + 0.4);

    float glow = exp(-length(p + mouseOffset) * 1.5);
    color += vec3(0.1, 0.2, 0.5) * glow * 0.4;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function AliveFluidShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram()!;
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    
    const loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u_resolution = gl.getUniformLocation(program, "u_resolution");
    const u_time = gl.getUniformLocation(program, "u_time");
    const u_mouse = gl.getUniformLocation(program, "u_mouse");

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let raf = 0;
    const start = performance.now();

    const render = (now: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, width * dpr, height * dpr);
      }
      
      gl.uniform2f(u_resolution, width, height);
      gl.uniform1f(u_time, (now - start) / 1000);
      gl.uniform2f(u_mouse, mouseRef.current.x, mouseRef.current.y);
      
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}

// --- MAKSİMUM BOYUTLANDIRILMIŞ SVG ŞEKİLLERİ ---
// viewBox 1000x1000 yapıldı, kartlar içerideki boşluğu tamamen dolduracak şekilde büyütüldü.
const svgShapes = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
    <g transform="rotate(45 500 500)">
      <rect x="148" y="148" width="340" height="340" rx="96" fill="black"/>
      <rect x="512" y="148" width="340" height="340" rx="96" fill="black"/>
      <rect x="148" y="512" width="340" height="340" rx="96" fill="black"/>
      <rect x="512" y="512" width="340" height="340" rx="96" fill="black"/>
    </g>
  </svg>
`;

const maskStyle = {
  WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(svgShapes)}")`,
  WebkitMaskSize: "100% 100%",
  WebkitMaskPosition: "center",
  WebkitMaskRepeat: "no-repeat",
  maskImage: `url("data:image/svg+xml,${encodeURIComponent(svgShapes)}")`,
  maskSize: "100% 100%",
  maskPosition: "center",
  maskRepeat: "no-repeat",
};

// --- ANA BİLEŞEN ---
export default function AliveGlassSection() {
  return (
    <section className="relative w-full min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white flex items-center justify-center p-8 overflow-hidden font-sans transition-colors duration-500">
      
      {/* Light ve Dark mode uyumlu Nokta Deseni (Dot Pattern) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none transition-all duration-500
                   bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08)_1px,transparent_1px)]
                   dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)]"
        style={{ backgroundSize: "24px 24px" }}
      />

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* SOL: DEVASA KARTLAR VE GÜÇLÜ GÖLGE */}
        {/* max-w-[800px] ile alan genişletildi */}
        <div className="relative w-full aspect-square max-w-[800px] mx-auto flex items-center justify-center group">
          
          {/* ÇOK DAHA GÜÇLÜ ARKA GÖLGE (Drop BG Shadow) */}
          {/* Opaklık artırıldı ve daha kalın bir blur uygulandı */}
          <div className="absolute inset-0 scale-[1.15] blur-[80px] opacity-60 dark:opacity-80 transition-all duration-700 group-hover:scale-[1.20] group-hover:opacity-70 dark:group-hover:opacity-100">
             <div className="w-full h-full" style={maskStyle}>
                <AliveFluidShader className="w-full h-full" />
             </div>
          </div>

          {/* KESKİN VE BÜYÜK GÖLGE (Light Mode'da özellikle patlaması için eklendi) */}
          <div className="absolute inset-0 drop-shadow-[0_50px_100px_rgba(0,0,0,0.6)] dark:drop-shadow-[0_50px_100px_rgba(0,0,0,0.9)] transition-all duration-500" style={maskStyle}>
            <AliveFluidShader className="w-full h-full" />
          </div>

          {/* Cam Çerçevesi Yansımaları (Borders & Highlights) - 1000x1000 viewBox uyumlu */}
          <svg viewBox="0 0 1000 1000" className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl opacity-90">
            <defs>
              <linearGradient id="edge-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb070" stopOpacity="0.9" />
                <stop offset="25%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="75%" stopColor="#4a70ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#4a70ff" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <g transform="rotate(45 500 500)">
              <rect x="148" y="148" width="340" height="340" rx="96" fill="none" stroke="url(#edge-glow)" strokeWidth="3" />
              <rect x="512" y="148" width="340" height="340" rx="96" fill="none" stroke="url(#edge-glow)" strokeWidth="3" />
              <rect x="148" y="512" width="340" height="340" rx="96" fill="none" stroke="url(#edge-glow)" strokeWidth="3" />
              <rect x="512" y="512" width="340" height="340" rx="96" fill="none" stroke="url(#edge-glow)" strokeWidth="3" />
            </g>
          </svg>

        </div>

        {/* SAĞ: METİN */}
        <div className="space-y-8 flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
            Full home <br /> 
            automation <br />
            <span className="font-serif italic text-blue-600 dark:text-blue-400 font-medium tracking-normal drop-shadow-sm transition-colors duration-500">made agentic</span>
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto lg:mx-0 leading-relaxed transition-colors duration-500">
            Tune every room to the rhythm of your day — warm at dawn, clear by noon, and golden as it fades to night.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
            <button className="px-8 py-3.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold hover:scale-105 transition-all active:scale-95 shadow-2xl dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Reserve yours
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors group">
              <span className="font-medium text-sm tracking-wide">Watch the film</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}