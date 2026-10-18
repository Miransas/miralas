"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type Ref } from "react";

const SIZE = 650; // tasarım boyutu, kutu bu boyda çizilip kapsayıcıya ölçeklenir

// --- Ayarlar -------------------------------------------------------------
const MAX_X = 14; // yatay azami kayma (px, tasarım boyutunda)
const MAX_Y = 9; // dikey azami kayma
const TAU = 70; // takip hızı (ms). Küçük = daha çevik
const IDLE_AFTER = 2500; // imleç bu kadar sessizse göz kendi kendine bakar
// -------------------------------------------------------------------------

function RobotEye({
  ref,
  side,
  closed,
}: {
  ref?: Ref<HTMLDivElement>;
  side: "left" | "right";
  closed: boolean;
}) {
  const isRight = side === "right";
  const shut = closed ? "scale-y-[0.05] opacity-0" : "scale-y-100 opacity-100";

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute z-20"
      style={{
        top: "40.8%",
        left: isRight ? undefined : "34.6%",
        right: isRight ? "34.6%" : undefined,
        willChange: "transform",
      }}
    >
      {/* dış ışıma */}
      <div
        className={`absolute left-1/2 top-1/2 h-[94px] w-[68px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#72b8ff]/30 blur-[20px] transition-all duration-100 ease-out ${shut}`}
      />
      {/* ikinci mavi ışıma */}
      <div
        className={`absolute left-1/2 top-1/2 h-[78px] w-[50px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b9ddff]/30 blur-[12px] transition-all duration-100 ease-out ${shut}`}
      />

      {/* göz */}
      <div
        className={`relative h-[64px] w-[34px] overflow-hidden rounded-[50%] transition-transform duration-100 ease-out ${
          closed ? "scale-x-[1.12] scale-y-[0.055]" : "scale-x-100 scale-y-100"
        }`}
        style={{
          background: `radial-gradient(ellipse at 50% 43%, #ffffff 0%, #ffffff 15%, #f5fbff 28%, #e0f1ff 42%, #b9dcff 57%, #82baff 72%, rgba(111,174,255,0.45) 84%, rgba(111,174,255,0) 100%)`,
          boxShadow: `0 0 7px rgba(255,255,255,0.95), 0 0 15px rgba(194,226,255,0.95), 0 0 28px rgba(110,180,255,0.55), 0 0 42px rgba(80,150,255,0.22)`,
        }}
      >
        <div className="absolute left-1/2 top-1/2 h-[39px] w-[17px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-95 blur-[2.5px]" />
        <div className="absolute left-1/2 top-1/2 h-[27px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[2px]" />
        <div className="absolute left-[7px] top-[8px] h-[14px] w-[6px] rounded-full bg-white opacity-75 blur-[2px]" />
        <div className="absolute bottom-[7px] left-1/2 h-[12px] w-[11px] -translate-x-1/2 rounded-full bg-[#d9edff] opacity-60 blur-[5px]" />
      </div>

      {/* göz kapakları */}
      <div
        className={`absolute -left-[8px] -right-[8px] -top-[8px] h-[38px] origin-top rounded-b-[50%] bg-[#050505] transition-transform duration-100 ease-in-out ${
          closed ? "scale-y-100" : "scale-y-0"
        }`}
      />
      <div
        className={`absolute -bottom-[8px] -left-[8px] -right-[8px] h-[18px] origin-bottom rounded-t-[50%] bg-[#050505] transition-transform duration-100 ease-in-out ${
          closed ? "scale-y-100" : "scale-y-0"
        }`}
      />
    </div>
  );
}

export default function RobotEyes({ priority = false }: { priority?: boolean }) {
  const box = useRef<HTMLDivElement>(null); // ölçülen dış kutu
  const stage = useRef<HTMLDivElement>(null); // 650px tasarım kutusu (ölçeklenir)
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  const [blink, setBlink] = useState(false);
  const [wink, setWink] = useState(false);

  // 1) Tasarım kutusunu kapsayıcının genişliğine sığdır (gözler de birlikte ölçeklenir)
  useEffect(() => {
    const outer = box.current;
    const inner = stage.current;
    if (!outer || !inner) return;

    const fit = () => {
      inner.style.transform = `scale(${outer.clientWidth / SIZE})`;
    };
    fit();

    const ro = new ResizeObserver(fit);
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  // 2) Bakış: React state'i yok, sadece transform yazılıyor
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = true;
    let raf = 0;
    let last = performance.now();
    let pointer: { x: number; y: number; at: number } | null = null;

    const cur = { x: 0, y: 0 };
    const idle = { x: 0, y: 0, until: 0 };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY, at: performance.now() };
    };

    const tick = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }

      const dt = Math.min(now - last, 50);
      last = now;

      let tx = 0;
      let ty = 0;

      if (pointer && now - pointer.at < IDLE_AFTER) {
        const rect = el.getBoundingClientRect();
        const dx = pointer.x - (rect.left + rect.width / 2);
        const dy = pointer.y - (rect.top + rect.height * 0.41);
        const dist = Math.hypot(dx, dy) || 1;
        const reach = 1 - Math.exp(-dist / 220); // yakında hızla doyar
        tx = (dx / dist) * reach * MAX_X;
        ty = (dy / dist) * reach * MAX_Y;
      } else {
        if (now > idle.until) {
          idle.x = (Math.random() * 2 - 1) * MAX_X * 0.6;
          idle.y = (Math.random() * 2 - 1) * MAX_Y * 0.5;
          idle.until = now + 1800 + Math.random() * 2600;
        }
        tx = idle.x;
        ty = idle.y;
      }

      const a = 1 - Math.exp(-dt / TAU); // kare hızından bağımsız yumuşatma
      cur.x += (tx - cur.x) * a;
      cur.y += (ty - cur.y) * a;

      const t = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`;
      if (left.current) left.current.style.transform = t;
      if (right.current) right.current.style.transform = t;

      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // 3) Göz kırpma ve göz kırpma-wink: tüm zamanlayıcılar kayıtlı, temizlenebilir
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    const ids = new Set<number>();

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        ids.delete(id);
        if (alive) fn();
      }, ms);
      ids.add(id);
    };

    const blinkOnce = (done: () => void) => {
      setBlink(true);
      later(() => {
        setBlink(false);
        done();
      }, 95 + Math.random() * 55);
    };

    const blinkLoop = () =>
      later(() => {
        blinkOnce(() => {
          if (Math.random() > 0.72) later(() => blinkOnce(blinkLoop), 110);
          else blinkLoop();
        });
      }, 2800 + Math.random() * 4200);

    const winkLoop = () =>
      later(() => {
        setWink(true);
        later(() => {
          setWink(false);
          winkLoop();
        }, 180 + Math.random() * 100);
      }, 10000 + Math.random() * 14000);

    blinkLoop();
    winkLoop();

    return () => {
      alive = false;
      ids.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div
      ref={box}
      className="relative mx-auto aspect-square w-full max-w-[850px] overflow-hidden"
    >
      <div
        ref={stage}
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: SIZE, height: SIZE }}
      >
        <Image
          src="https://res.cloudinary.com/dwdk20m6q/image/upload/v1790282774/Firefly_RemoveBackground_mre4pp.png"
          alt="Miralas robot mascot"
          fill
          sizes="850px"
          quality={90}
          priority={priority}
          draggable={false}
          className="pointer-events-none select-none object-contain"
        />
        <RobotEye ref={left} side="left" closed={blink} />
        <RobotEye ref={right} side="right" closed={blink || wink} />
      </div>
    </div>
  );
}