import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-surface-page text-text-heading overflow-hidden font-sans">
      
      {/* Content card (floating animation) */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 animate-float">
        
        {/* Devasa 404 Metni */}
        <h1 className="text-[140px] md:text-[200px] font-bold tracking-tighter leading-none text-text-heading mb-2">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-medium text-text-heading tracking-wide">
         You got lost in the cosmic void.
        </h2>
        
        <p className="mt-5 text-text-primary max-w-[400px] mx-auto text-lg font-black leading-relaxed">
          The coordinates you are looking for do not correspond to any known sector. Don't worry, we can guide you back to a safe zone.
        </p>
        
        {/* Back button (glassmorphism style) */}
        <Link 
          href="/" 
          className={buttonVariants({ className: "mt-10" })}
        >
            Return to Home
        </Link>
      </div>
    
    </div>
  );
}