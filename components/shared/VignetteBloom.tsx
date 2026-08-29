"use client";

import React, { useEffect, useRef } from "react";

// 1. TypeScript Arayüzleri (Interfaces)
interface Config {
  src: string;
  cellSize: number;
  bgOpacity: number;
  brightness: number;
  contrast: number;
  pfx: {
    vignette: { enabled: boolean; intensity: number };
    bloom: { enabled: boolean; intensity: number };
  };
  animated: boolean;
  animSpeed: number;
  animIntensity: number;
}

interface GridCell {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
}

// JSON Yapılandırması
const config: Config = {
  src: "./hero.png", 
  cellSize: 16,
  bgOpacity: 0.9,
  brightness: 12,
  contrast: 115,
  pfx: {
    vignette: { enabled: true, intensity: 38 },
    bloom: { enabled: true, intensity: 25 },
  },
  animated: true,
  animSpeed: 100,
  animIntensity: 60,
};

export default function VignetteBloom() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Bloom efekti için offscreen (gizli) canvas
    const bloomCanvas = document.createElement("canvas");
    const bloomCtx = bloomCanvas.getContext("2d");
    if (!bloomCtx) return;

    let animationFrameId: number;
    let gridCells: GridCell[] = [];
    let imgWidth = 0;
    let imgHeight = 0;

    // 2. Görsel Yükleme ve Başlatma
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = config.src;

    img.onload = () => init(img);
    img.onerror = () => {
      console.warn("Görsel yüklenemedi, test verisi (fallback) oluşturuluyor.");
      initDummyData();
    };

    function init(source: HTMLImageElement | HTMLCanvasElement) {
      imgWidth = source.width;
      imgHeight = source.height;
      canvas!.width = bloomCanvas.width = imgWidth;
      canvas!.height = bloomCanvas.height = imgHeight;

      // Görsel verisini geçici bir canvas ile okuma
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = imgWidth;
      tempCanvas.height = imgHeight;
      const tCtx = tempCanvas.getContext("2d");
      if (!tCtx) return;
      
      tCtx.drawImage(source, 0, 0);
      const imgData = tCtx.getImageData(0, 0, imgWidth, imgHeight).data;

      // Adım 2 & 4: Grid oluşturma, renk ortalamalarını alma ve Contrast/Brightness ayarı
      gridCells = [];
      const contrastFactor = config.contrast / 100;

      for (let y = 0; y < imgHeight; y += config.cellSize) {
        for (let x = 0; x < imgWidth; x += config.cellSize) {
          let r = 0, g = 0, b = 0, count = 0;

          // Hücre içi pikselleri örnekleme
          for (let cy = 0; cy < config.cellSize; cy++) {
            for (let cx = 0; cx < config.cellSize; cx++) {
              const px = x + cx;
              const py = y + cy;
              if (px < imgWidth && py < imgHeight) {
                const index = (py * imgWidth + px) * 4;
                r += imgData[index];
                g += imgData[index + 1];
                b += imgData[index + 2];
                count++;
              }
            }
          }

          r /= count; g /= count; b /= count;

          // Parlaklık ve Kontrast uygulama
          r = ((r / 255 - 0.5) * contrastFactor + 0.5) * 255 + config.brightness;
          g = ((g / 255 - 0.5) * contrastFactor + 0.5) * 255 + config.brightness;
          b = ((b / 255 - 0.5) * contrastFactor + 0.5) * 255 + config.brightness;

          // Renk sınırlarını (0-255) koruma
          r = Math.max(0, Math.min(255, r));
          g = Math.max(0, Math.min(255, g));
          b = Math.max(0, Math.min(255, b));

          gridCells.push({ x, y, r, g, b });
        }
      }

      // Render döngüsünü başlat
      render(0);
    }

    // 3. Ana Render Döngüsü
    function render(timestamp: number) {
      if (!ctx) return;

      // Adım 1: Arkaplanı temizleme/doldurma
      ctx.fillStyle = `rgba(0, 0, 0, ${config.bgOpacity})`;
      ctx.fillRect(0, 0, imgWidth, imgHeight);

      // Adım 8: Animasyon (Wave) parametreleri
      const t = timestamp * 0.0001 * config.animSpeed;

      // Adım 3: Hücreleri (Mosaic) çizdirme
      gridCells.forEach((cell) => {
        let size = config.cellSize;
        let offset = 0;

        if (config.animated) {
          // Uzamsal koordinatlar üzerinden sinüs dalgası
          const wave = Math.sin((cell.x + cell.y) * 0.01 + t);
          const variance = (config.animIntensity / 100) * 0.5;
          const scale = 1 - wave * variance;

          size = config.cellSize * scale;
          offset = (config.cellSize - size) / 2; // Merkezde tut
        }

        ctx.fillStyle = `rgb(${cell.r}, ${cell.g}, ${cell.b})`;
        ctx.fillRect(cell.x + offset, cell.y + offset, size, size);
      });

      // Adım 5: Post-proses efektleri
      applyPostEffects();

      animationFrameId = requestAnimationFrame(render);
    }

    // 4. Efekt Fonksiyonları (Vignette & Bloom)
    function applyPostEffects() {
      if (!ctx || !bloomCtx || !canvas) return;

      // Bloom Efekti
      if (config.pfx.bloom.enabled) {
        bloomCtx.clearRect(0, 0, imgWidth, imgHeight);
        bloomCtx.drawImage(canvas, 0, 0);

        ctx.globalCompositeOperation = "screen";
        ctx.filter = `blur(${config.pfx.bloom.intensity / 2}px)`;
        ctx.globalAlpha = config.pfx.bloom.intensity / 100;

        ctx.drawImage(bloomCanvas, 0, 0);

        // State'leri sıfırla
        ctx.filter = "none";
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = "source-over";
      }

      // Vignette Efekti
      if (config.pfx.vignette.enabled) {
        const cx = imgWidth / 2;
        const cy = imgHeight / 2;
        const radius = Math.sqrt(cx * cx + cy * cy);

        const grad = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius);
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, `rgba(0,0,0,${config.pfx.vignette.intensity / 50})`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, imgWidth, imgHeight);
      }
    }

    // Görsel yoksa çalışacak Fallback fonksiyonu
    function initDummyData() {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = 800;
      tempCanvas.height = 600;
      const tCtx = tempCanvas.getContext("2d");
      if (!tCtx) return;

      const grad = tCtx.createLinearGradient(0, 0, 800, 600);
      grad.addColorStop(0, "#ff3c3c");
      grad.addColorStop(0.5, "#3ca6ff");
      grad.addColorStop(1, "#3cff5a");
      tCtx.fillStyle = grad;
      tCtx.fillRect(0, 0, 800, 600);

      init(tempCanvas);
    }

    // Cleanup: Bileşen unmount olduğunda animasyonu durdur ve memory sızıntısını engelle
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Bağımlılık dizisi boş, sadece mount edildiğinde çalışır

  return (
    // Tailwind CSS ile stilleme
    <div className="flex h-screen w-full items-center justify-center bg-background overflow-hidden">
      <canvas
        ref={canvasRef}
        className="max-h-screen max-w-full bg-background shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
}