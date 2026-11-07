"use client"
import React, { useEffect, useRef } from 'react'

const BG = '#060608'
const FACE = '#0a0a0d'
const LABELS = ['Stream alerts', 'Telegram bot', 'REST API']

type Pt = [number, number]

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (v: number) => { v = clamp(v); return v * v * (3 - 2 * v) }
const hash = (n: number) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
const trap = (p: number, a: number, b: number, c: number, d: number) =>
  smooth((p - a) / (b - a)) * (1 - smooth((p - c) / (d - c)))

// Dağ yüksekliği (0..1), zamanla nefes alıyor
const height = (x: number, z: number, t: number) => {
  const env = Math.pow(Math.sin(Math.PI * x) * Math.sin(Math.PI * z), 0.4)
  const r = 1 - Math.abs(Math.sin(x * 6 + Math.sin(z * 5 + t * 0.5) * 1.3))
  const a = 0.5 + 0.5 * Math.sin(x * 14 + z * 9 + t * 0.9)
  const b = 0.5 + 0.5 * Math.sin(z * 4.5 - x * 3 + t * 0.4)
  const voice = 0.85 + 0.15 * Math.sin(t * 2 + x * 10)
  return env * (0.35 * r * r + 0.25 * a + 0.4 * b * r) * voice
}

const bez = (a: Pt, b: Pt, c: Pt, d: Pt, n: number): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t
    return [
      u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
      u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
    ] as Pt
  })

export default function VoiceBranchFooter() {
  const wrapRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const capRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const wrap = wrapRef.current!
    const stage = stageRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    let W = 0, H = 0, raf = 0, visible = true, sp = 0
    let geo = { ox: 0, oy: 0, S: 0, D: 0, A: 0 }
    let paths: Pt[][] = [] // [gövde, dal1, dal2, dal3]
    let ends: Pt[] = []
    let port: Pt = [0, 0]

    const resize = () => {
      const r = stage.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = r.width; H = r.height
      canvas.width = W * dpr; canvas.height = H * dpr
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const wide = W >= 900
      const S = Math.min(W * 0.22, H * 0.24)
      const ox = W * (wide ? 0.55 : 0.4)
      const oy = H * 0.5 - S * 0.525
      geo = { ox, oy, S, D: S * 1.05, A: S }

      const p0: Pt = [ox + S * 0.5, oy + S * 0.75 + geo.D * 0.5]
      const p1: Pt = [p0[0] + W * 0.1, p0[1]]
      const ex = W * (wide ? 0.9 : 0.88)
      const dx = ex - p1[0]
      port = p0
      ends = [[ex, H * 0.2], [ex, H * 0.5], [ex, H * 0.8]]
      paths = [
        bez(p0, [p0[0] + (p1[0] - p0[0]) / 3, p0[1]], [p0[0] + ((p1[0] - p0[0]) * 2) / 3, p0[1]], p1, 24),
        ...ends.map((e) => bez(p1, [p1[0] + dx * 0.5, p1[1]], [ex - dx * 0.45, e[1]], e, 70)),
      ]
    }

    const P = (x: number, y: number, z: number): Pt => [
      geo.ox + (x - z) * geo.S,
      geo.oy + (x + z) * geo.S * 0.5 - y,
    ]

    const poly = (pts: Pt[], fill?: string, stroke?: string) => {
      ctx.beginPath()
      pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])))
      ctx.closePath()
      if (fill) { ctx.fillStyle = fill; ctx.fill() }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke() }
    }

    const trace = (pts: Pt[], prog: number) => {
      const n = Math.floor(prog * (pts.length - 1))
      if (n < 1) return false
      ctx.beginPath()
      ctx.moveTo(pts[0][0], pts[0][1])
      for (let i = 1; i <= n; i++) ctx.lineTo(pts[i][0], pts[i][1])
      ctx.stroke()
      return true
    }

    const render = (t: number, p: number) => {
      const { S, D, A } = geo
      const f = smooth((p - 0.22) / 0.38) // parçalanma
      const b = smooth((p - 0.6) / 0.38)  // dal

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, W, H)

      // arkada turuncu hale
      const cx = geo.ox, cy = geo.oy + S * 0.4
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, S * 2.4)
      g.addColorStop(0, 'rgba(249,115,22,0.16)')
      g.addColorStop(1, 'rgba(249,115,22,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      // küp yüzleri
      poly([P(0, 0, 0), P(1, 0, 0), P(1, 0, 1), P(0, 0, 1)], FACE)
      poly([P(0, 0, 1), P(1, 0, 1), P(1, -D, 1), P(0, -D, 1)], '#0c0c10', 'rgba(255,255,255,0.08)')
      poly([P(1, 0, 1), P(1, 0, 0), P(1, -D, 0), P(1, -D, 1)], '#08080b', 'rgba(255,255,255,0.08)')

      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      const N = 14
      ctx.beginPath()
      for (let k = 1; k < N; k++) {
        const u = k / N
        let a = P(u, 0, 1), c = P(u, -D, 1)
        ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1])
        a = P(0, -u * D, 1); c = P(1, -u * D, 1)
        ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1])
        a = P(1, 0, u); c = P(1, -D, u)
        ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1])
        a = P(1, -u * D, 0); c = P(1, -u * D, 1)
        ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1])
      }
      ctx.stroke()

      // arazi: sadece küpün ön kenarlarının ÜSTÜNDE çizilir (yüzlerin üstüne taşmasın)
      const Pl = P(0, 0, 1), Pb = P(1, 0, 1), Pr = P(1, 0, 0)
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, Pr[1]); ctx.lineTo(Pr[0], Pr[1])
      ctx.lineTo(Pb[0], Pb[1]); ctx.lineTo(Pl[0], Pl[1]); ctx.lineTo(0, Pl[1])
      ctx.closePath()
      ctx.clip()

      const R = 56, C = 108, K = 9
      for (let i = 0; i < R; i++) {
        const z = i / (R - 1)
        for (let c = 0; c * K < C - 1; c++) {
          const j0 = c * K, j1 = Math.min(C - 1, j0 + K)
          const s1 = hash(i * 97 + c * 13 + 1)
          const s2 = hash(i * 53 + c * 29 + 2)
          const s3 = hash(i * 31 + c * 7 + 3)
          const local = smooth((f - s1 * 0.45) / 0.55)
          if (local >= 1) continue

          const dy = -local * (40 + s2 * 280)
          const dx = local * (s3 - 0.35) * 200
          const amp = A * (1 - 0.5 * local)
          const alpha = 1 - local

          const pts: Pt[] = []
          for (let j = j0; j <= j1; j++) {
            const x = j / (C - 1)
            pts.push([
              geo.ox + (x - z) * S + dx,
              geo.oy + (x + z) * S * 0.5 - height(x, z, t) * amp + dy,
            ])
          }

          // perde (arkadaki satırları örter)
          const fd = S * 0.5 * (1 - local)
          ctx.globalAlpha = Math.min(1, alpha * 1.4)
          ctx.beginPath()
          pts.forEach((q, k) => (k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])))
          ctx.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1] + fd)
          ctx.lineTo(pts[0][0], pts[0][1] + fd)
          ctx.closePath()
          ctx.fillStyle = FACE
          ctx.fill()

          // çizgi
          ctx.globalAlpha = (0.25 + 0.65 * z) * alpha
          ctx.beginPath()
          pts.forEach((q, k) => (k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])))
          ctx.strokeStyle = `rgb(255,${Math.round(205 - local * 70)},${Math.round(150 - local * 90)})`
          ctx.lineWidth = 1.2
          ctx.stroke()

          // uçuşan parça noktası
          if (local > 0.05) {
            const m = pts[Math.floor(pts.length / 2)]
            ctx.globalAlpha = alpha * 0.9
            ctx.fillStyle = '#fb923c'
            ctx.fillRect(m[0], m[1], 2, 2)
          }
        }
      }
      ctx.globalAlpha = 1
      ctx.restore()

      // üst yüz çerçevesi
      poly([P(0, 0, 0), P(1, 0, 0), P(1, 0, 1), P(0, 0, 1)], undefined, 'rgba(249,115,22,0.35)')

      // dal
      if (b > 0) {
        ctx.save()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.shadowColor = 'rgba(249,115,22,0.8)'
        ctx.shadowBlur = 14
        ctx.strokeStyle = '#fb923c'
        ctx.lineWidth = 2

        const tb = clamp(b / 0.3)
        const bb = clamp((b - 0.25) / 0.7)

        trace(paths[0], tb)
        if (tb > 0.98) for (let i = 1; i < paths.length; i++) trace(paths[i], bb)

        // çıkış portu
        ctx.beginPath()
        ctx.arc(port[0], port[1], 5, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'
        ctx.fill()

        // düğümler, paketler, etiketler
        if (bb > 0.98) {
          ctx.font = '500 14px ui-sans-serif, system-ui, sans-serif'
          ctx.textAlign = 'center'
          ends.forEach((e, i) => {
            const pulse = 1 + 0.25 * Math.sin(t * 3 + i)
            ctx.beginPath()
            ctx.arc(e[0], e[1], 6 * pulse, 0, Math.PI * 2)
            ctx.fillStyle = '#f97316'
            ctx.fill()
            ctx.shadowBlur = 0
            ctx.fillStyle = 'rgba(255,255,255,0.85)'
            ctx.fillText(LABELS[i], e[0], e[1] - 18)
            ctx.shadowBlur = 14

            const pts = paths[i + 1]
            const u = (t * 0.25 + i * 0.33) % 1
            const q = pts[Math.floor(u * (pts.length - 1))]
            ctx.beginPath()
            ctx.arc(q[0], q[1], 2.6, 0, Math.PI * 2)
            ctx.fillStyle = '#fff'
            ctx.fill()
          })
        }
        ctx.restore()
      }
    }

    const updateCaptions = (p: number) => {
      const v = [trap(p, -1, 0, 0.16, 0.28), trap(p, 0.24, 0.34, 0.52, 0.62), trap(p, 0.6, 0.72, 2, 3)]
      capRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.opacity = String(v[i])
        el.style.transform = `translateY(${(1 - v[i]) * 16}px)`
        el.style.pointerEvents = v[i] > 0.6 ? 'auto' : 'none'
      })
    }

    const loop = (ms: number) => {
      raf = requestAnimationFrame(loop)
      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = total > 0 ? clamp(-rect.top / total) : 0
      sp += (p - sp) * 0.08
      updateCaptions(sp)
      if (!visible || W === 0) return
      render(ms / 1000, sp)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(stage)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(wrap)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  const caps = [
    { h: 'One voice.', p: 'A single Uzbek voice, built from real speech.' },
    { h: 'Split into thousands of clips.', p: 'Every line becomes its own clip, ready to remix, retime and reuse.' },
    { h: 'Branch it anywhere.', p: 'Ship the same voice to your streams, bots and apps.' },
  ]

  return (
    <section
      ref={wrapRef}
      className="dark relative w-full bg-[#060608] text-white"
      style={{ height: '320vh', colorScheme: 'dark' }}
    >
      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0" />

        {caps.map((c, i) => (
          <div
            key={c.h}
            ref={(el) => { capRefs.current[i] = el }}
            className="absolute left-[6%] top-[16%] z-10 max-w-[420px]"
            style={{ opacity: 0 }}
          >
            <h2 className="bg-gradient-to-b from-white to-orange-100/70 bg-clip-text text-4xl font-semibold leading-[1.05] tracking-tight text-transparent md:text-6xl">
              {c.h}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/65">{c.p}</p>
            {i === 2 && (
              <a
                href="/studio"
                className="mt-8 inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-wide text-[#4a1d05] transition hover:scale-[1.03]"
                style={{
                  background: 'linear-gradient(90deg, #d9d9dc 0%, #ececee 55%, #fff1dd 100%)',
                  boxShadow: '0 0 38px rgba(249,115,22,0.55), inset 0 0 0 1px rgba(255,255,255,0.35)',
                }}
              >
                Open Studio <span className="text-lg leading-none">→</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}