"use client";

import React, { useEffect, useRef } from "react";

export default function VoiceSphere() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width || 800;
      canvas.height = rect.height || 800;
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);

    // Çizgi ve Nokta Yoğunluğu
    const numLatitude = 70;  // Enlem çizgi sayısı (Derinlik)
    const numLongitude = 90; // Boylam çizgi sayısı (Çevre)

    let time = 0;

    const render = () => {
      time += 0.008; // Yavaş ve pürüzsüz dönüş

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 - 10;
      const baseR = Math.min(width, height) * 0.34;

      const cosY = Math.cos(time * 0.2);
      const sinY = Math.sin(time * 0.2);
      const cosX = Math.cos(0.25);
      const sinX = Math.sin(0.25);

      // 3D Yüzey Noktası Hesaplama Fonksiyonu
      const get3DPoint = (u: number, v: number) => {
        // Pürüzsüz Organik Gül / Kumaş Kıvrım Matematiği
        const fold1 = Math.sin(v * 3 + time * 1.5) * Math.sin(u * 2) * 0.32;
        const fold2 = Math.cos(v * 2 - u * 2.5 + time * 0.9) * 0.22;
        const fold3 = Math.sin(u * 3 + time * 1.2) * 0.12;

        const distortion = 1 + fold1 + fold2 + fold3;
        const r = baseR * distortion;

        // Kartezyen Koordinatlar
        let x = r * Math.sin(u) * Math.cos(v);
        let y = r * Math.sin(u) * Math.sin(v);
        let z = r * Math.cos(u);

        // Y Ekseninde Döndürme
        let rx = x * cosY - z * sinY;
        let rz = x * sinY + z * cosY;
        let ry = y;

        // X Ekseninde Eğme
        let finalY = ry * cosX - rz * sinX;
        let finalZ = ry * sinX + rz * cosX;
        let finalX = rx;

        // Kamera Perspektifi
        const fov = 550;
        const scale = fov / (fov + finalZ + baseR);
        const screenX = centerX + finalX * scale;
        const screenY = centerY + finalY * scale;

        return {
          x: screenX,
          y: screenY,
          z: finalZ,
          scale,
          distortion,
        };
      };

      // 1. Enlem Eğrilerini Oluştur (Latitude Rings)
      const rings: {
        avgZ: number;
        points: { x: number; y: number; z: number; scale: number; distortion: number }[];
      }[] = [];

      for (let i = 1; i < numLatitude - 1; i++) {
        const u = (i / numLatitude) * Math.PI;
        const ringPoints = [];
        let sumZ = 0;

        for (let j = 0; j <= numLongitude; j++) {
          const v = (j / numLongitude) * Math.PI * 2;
          const pt = get3DPoint(u, v);
          ringPoints.push(pt);
          sumZ += pt.z;
        }

        rings.push({
          avgZ: sumZ / ringPoints.length,
          points: ringPoints,
        });
      }

      // Derinliğe Göre Sırala (Arka plan önce, ön yüzey sonra çizilsin)
      rings.sort((a, b) => b.avgZ - a.avgZ);

      // 2. Çizim İşlemi (Pürüzsüz Çizgiler + Nokta Matrisi)
      for (let r = 0; r < rings.length; r++) {
        const ring = rings[r];
        const pts = ring.points;

        // Derinlik Oranı (0 = En ön, 1 = En arka)
        const depth = (ring.avgZ + baseR) / (2 * baseR);
        const alpha = Math.max(0.08, Math.min(1, (1 - depth) * 1.4));

        // Enlem Çizgisini Çiz (Wireframe Ribbon)
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);

        for (let j = 1; j < pts.length; j++) {
          ctx.lineTo(pts[j].x, pts[j].y);
        }

        // Derinlik ve Bükülmeye Göre Dinamik Çizgi Rengi
        const avgDist = pts[0].distortion;
        if (avgDist > 1.25) {
          ctx.strokeStyle = `rgba(224, 242, 254, ${alpha * 0.9})`; // Parlak Tepe Noktaları
        } else if (depth > 0.5) {
          ctx.strokeStyle = `rgba(3, 105, 161, ${alpha * 0.4})`;  // Gölgeli Derinlikler
        } else {
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.75})`; // Canlı Cyan Mavi
        }

        ctx.lineWidth = Math.max(0.5, 1.2 * pts[0].scale * (1 - depth * 0.5));
        ctx.stroke();

        // Çizgi Üzerine Nokta Matrisi Yerleştir (ElevenLabs Izgara Etkisi)
        for (let j = 0; j < pts.length; j += 2) {
          const p = pts[j];
          if (p.distortion > 1.15 || depth < 0.4) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.4, 1.1 * p.scale), 0, Math.PI * 2);
            ctx.fillStyle = p.distortion > 1.28
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(186, 230, 253, ${alpha * 0.85})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[600px] md:min-h-[750px] flex items-center justify-center">
      {/* Merkezdeki Mavi Parlama (Glow) */}
      <div className="absolute w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] bg-sky-300/25 blur-[130px] rounded-full pointer-events-none -z-10" />
      
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Zemin Yansıması */}
      <div className="absolute -bottom-8 w-[320px] sm:w-[480px] h-[35px] bg-sky-400/25 blur-2xl rounded-[100%] pointer-events-none -z-10" />
    </div>
  );
}