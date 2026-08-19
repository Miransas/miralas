import React from "react";
import { Laser } from "../shared/laser";

export default function Footer() {
  const footerLinks = [
    {
      category: "COMPANY",
      links: [
        { name: "About", href: "#" },
        { name: "Journal", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Newsroom", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      category: "PLATFORM",
      links: [
        { name: "Pricing", href: "#" },
        { name: "Prototype tests", href: "#" },
        { name: "Live interviews", href: "#", isNew: true },
        { name: "Session replay", href: "#" },
        { name: "Surveys", href: "#" },
      ],
    },
    {
      category: "RESOURCES",
      links: [
        { name: "Field guides", href: "#" },
        { name: "Research library", href: "#" },
        { name: "Events", href: "#" },
        { name: "Templates", href: "#" },
        { name: "Help center", href: "#" },
      ],
    },
    {
      category: "USE CASES",
      links: [
        { name: "Validate concepts", href: "#" },
        { name: "Test navigation", href: "#" },
        { name: "Measure sentiment", href: "#" },
        { name: "Benchmark journeys", href: "#" },
      ],
    },
  ];

  return (
    <footer className="relative bg-[#0d0d0d] text-white font-sans overflow-hidden px-6 pt-16 pb-8 md:px-12">
      <Laser
        className="absolute inset-0 z-10 w-full"
        color={[0.05, 0.35, 1]}
        speed={0.35}
        offset={40}
        width={0.7}
        reveal={420}
        glow={2.6}
        radius={22}
        wave={10}
        thickness={7}
        core={1.1}
      >

        {/* Kapatma Butonu (Sağ Üst Çarpı) */}
        <button className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="max-w-[1600px] mx-auto w-full">
          {/* Üst Kısım: Linkler ve Widget'lar */}
          <div className="flex flex-col xl:flex-row justify-between gap-16 mb-24">

            {/* Sol: Link Sütunları */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 xl:gap-16 w-full max-w-4xl">
              {footerLinks.map((column, idx) => (
                <div key={idx} className="flex flex-col">
                  {/* Kategori Başlığı (Pill/Badge Tasarımı) */}
                  <div className="bg-[#222] text-[#999] text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full w-max mb-6">
                    {column.category}
                  </div>

                  {/* Linkler */}
                  <ul className="flex flex-col space-y-4">
                    {column.links.map((link, linkIdx) => (
                      <li key={linkIdx} className="flex items-center">
                        <a
                          href={link.href}
                          className="text-[15px] font-medium text-neutral-200 hover:text-white transition-colors"
                        >
                          {link.name}
                        </a>
                        {link.isNew && (
                          <span className="ml-3 bg-white text-black text-[10px] font-bold px-2 py-[2px] rounded-full">
                            NEW
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Sağ: Kayıt ve Sosyal Medya Widget'ları */}
            <div className="flex flex-col space-y-4 w-full xl:max-w-md shrink-0">
              {/* Bülten Kartı */}
              <div className="bg-[#141414] border border-[#262626] rounded-[24px] p-5">
                {/* Soyut Görsel Alanı */}
                <div className="w-full h-40 bg-[#1e1e1e] rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
                  {/* Görseli taklit eden çizgiler ve yuvarlak */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white transform -translate-y-1/2"></div>
                    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white transform -translate-x-1/2"></div>
                    <div className="absolute inset-0 border-[1px] border-white rounded-full scale-150"></div>
                    <div className="absolute inset-0 border-[1px] border-white rounded-full scale-[2.5]"></div>
                  </div>
                  <div className="w-16 h-16 bg-[#2a2a2a] rounded-full flex items-center justify-center z-10 border border-[#333]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Sign up for the field guide</h3>
                <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                  Research patterns and testing rituals from real product teams. Two issues a month, no noise.
                </p>

                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-[#111] border border-[#333] text-white text-sm rounded-full px-5 py-3 focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-600"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black font-semibold text-sm rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Sosyal Medya Kartı */}
              <div className="flex items-center justify-between bg-[#141414] border border-[#262626] rounded-[24px] px-6 py-5">
                <span className="text-[15px] font-semibold text-white">Follow us</span>
                <div className="flex items-center gap-4 text-neutral-400">
                  <a href="#" className="hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Orta Kısım: Dev "fathom" Yazısı */}
          <div className="w-full flex justify-center items-center select-none overflow-hidden mb-12">
            <h1 className="text-[25vw] sm:text-[23vw] leading-none font-black tracking-tighter text-white">
              Miransas
            </h1>
          </div>

          {/* Alt Kısım: Telif Hakkı ve Yasal Linkler */}
          <div className="border-t border-[#222] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-neutral-500 font-semibold tracking-wider">
              © 2026 FATHOM RESEARCH
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-[11px] text-neutral-500 hover:text-white font-semibold tracking-wider transition-colors">PRIVACY</a>
              <a href="#" className="text-[11px] text-neutral-500 hover:text-white font-semibold tracking-wider transition-colors">TERMS</a>
              <a href="#" className="text-[11px] text-neutral-500 hover:text-white font-semibold tracking-wider transition-colors">SECURITY</a>
              <a href="#" className="text-[11px] text-neutral-500 hover:text-white font-semibold tracking-wider transition-colors">COOKIES</a>
            </div>
          </div>

        </div>
      </Laser>
    </footer>
  );
}