import React from 'react';
import { Header } from '../../../components/layout/Header';

export default function LandingPage() {
  const stripHeights = [15, 25, 35, 45, 55, 65, 75, 85, 95, 100, 100];

  return (
 <main>
      <div className="relative min-h-screen w-full flex flex-col font-sans overflow-hidden gradient-sangoshou noise-overlay text-[#1C1F26]">
      
      {/* 
        Merkezi Glow (Parlama) Efekti 
        Metnin arkasındaki o aydınlık hissi vermek için eklendi.
      */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#EAFBF7] rounded-full blur-[140px] opacity-70 pointer-events-none z-0"></div>

      {/* Navbar Section */}
     <Header/>
      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 mt-[-8vh]">
        <h1 className="text-7xl md:text-[88px] font-semibold tracking-tighter mb-5 text-[#111317]">
          Limerence
        </h1>
        
        <p className="text-[17px] md:text-[19px] font-medium max-w-[420px] mx-auto mb-10 leading-[1.4] text-[#1C1F26] opacity-90">
          Design, stage and ship colour that feels considered, from first draft to launch.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Koyu buton için hafif soft siyah parlama */}
          <button className="bg-[#202227] text-white px-6 py-3.5 rounded-xl font-medium shadow-[0_10px_40px_rgba(0,0,0,0.25)] hover:bg-[#111317] w-full sm:w-auto">
            Start for free
          </button>
          
          {/* Açık buton için geniş, yumuşak bir beyaz parlama (glow) */}
          <button className="bg-white text-[#1C1F26] px-6 py-3.5 rounded-xl font-medium shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:bg-gray-50 w-full sm:w-auto">
            Get a demo
          </button>
        </div>
      </main>
      
    </div>
    <div className="relative min-h-screen w-full flex flex-col font-sans overflow-hidden bg-[#FBF3E7] text-[#29263A]">
      
      {/* 
        Arka Plan Şerit Efekti (Strips)
        Görseldeki basamaklı görünümü CSS ile taklit ediyoruz.
      */}
      <div className="absolute inset-0 z-0 flex items-end opacity-90 pointer-events-none">
        {stripHeights.map((height, index) => (
          <div 
            key={index} 
            className="flex-1 gradient-asamoya" 
            style={{ height: `${height}vh` }}
          />
        ))}
      </div>

      {/* Merkezi Işık (Glow) Efekti - Metnin okunabilirliğini artırmak için */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#FBF3E7] rounded-full blur-[120px] opacity-80 pointer-events-none z-0"></div>

      {/* Navbar Section */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 w-full max-w-7xl mx-auto md:px-10">
        <div className="font-bold text-xl tracking-tight text-[#29263A]">
          Asamoya
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium opacity-80">
          <a href="#" className="hover:opacity-100 transition-opacity">Solutions</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Customers</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Pricing</a>
        </div>
        
        <div className="flex items-center gap-6 text-[15px] font-medium">
          <a href="#" className="hover:opacity-100 transition-opacity hidden md:block opacity-80">Log in</a>
          <button className="bg-[#29263A] text-white px-5 py-2 rounded-lg hover:bg-[#1C1A29] transition-colors shadow-sm">
            Start now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 mt-[-8vh]">
        <h1 className="text-7xl md:text-[88px] font-semibold tracking-tighter mb-5 text-[#29263A]">
          Limerence
        </h1>
        
        <p className="text-[17px] md:text-[19px] font-medium max-w-[420px] mx-auto mb-10 leading-[1.4] text-[#4A4759] opacity-90">
          Design, stage and ship colour that feels considered, from first draft to launch.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Koyu buton için Asamoya paletine uygun mor/siyah glow */}
          <button className="bg-[#29263A] text-[#FBF3E7] px-6 py-3.5 rounded-xl font-medium shadow-[0_15px_35px_rgba(41,38,58,0.3)] hover:bg-[#1C1A29] transition-all w-full sm:w-auto">
            Start for free
          </button>
          
          {/* Açık buton için geniş, yumuşak bir glow */}
          <button className="bg-white text-[#29263A] px-6 py-3.5 rounded-xl font-medium shadow-[0_10px_40px_rgba(255,255,255,0.6)] hover:bg-gray-50 transition-all w-full sm:w-auto">
            Get a demo
          </button>
        </div>
      </main>
      
    </div>
 </main>
  );
}