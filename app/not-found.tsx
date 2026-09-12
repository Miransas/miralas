import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0B0D14] text-white overflow-hidden font-sans">
      
      {/* Arka Plan Kozmik Işık Efektleri */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#274A78] rounded-full blur-[150px] animate-cosmic-pulse pointer-events-none z-0"></div>
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-[#5654A2] rounded-full blur-[120px] animate-cosmic-pulse pointer-events-none z-0" style={{ animationDelay: '2s' }}></div>

      {/* İçerik Kutusu (Süzülme animasyonlu) */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 animate-float">
        
        {/* Devasa 404 Metni */}
        <h1 className="text-[140px] md:text-[200px] font-bold tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-[#4A4759] drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] mb-2">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-medium text-[#EAFBF7] opacity-90 tracking-wide">
       You got lost in the cosmic void.
        </h2>
        
        <p className="mt-5 text-[#8A8D98] max-w-[400px] mx-auto text-lg leading-relaxed">
          The coordinates you are looking for do not correspond to any known sector. Don't worry, we can guide you back to a safe zone.
        </p>
        
        {/* Geri Dönüş Butonu (Glassmorphism stili) */}
        <Link 
          href="/" 
          className="mt-10 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-md transition-all font-medium text-white shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:-translate-y-1"
        >
            Return to Home
        </Link>
      </div>
      
    </div>
  );
}