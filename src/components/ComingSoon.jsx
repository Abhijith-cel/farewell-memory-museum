import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, Clock, Sparkles } from 'lucide-react';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Graduation Countdown Calculations (Standard Target Date: 30 days out)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // 30 days from now

    const updateTimer = () => {
      const difference = +targetDate - +new Date();
      if (difference <= 0) return;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Laser / Scanner beam animation */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent animate-[scan_6s_linear_infinite] pointer-events-none" />
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>

      {/* Background radial overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-sky-900/5 filter blur-[150px] pointer-events-none" />

      {/* MAIN TEXT */}
      <div className="w-full max-w-4xl text-center space-y-8 z-10 relative">
        
        <div className="inline-flex items-center space-x-2 bg-neutral-900/60 backdrop-blur-md border border-neutral-850 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-neutral-300 shadow-md">
          <Clock className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
          <span>Locked Archives</span>
        </div>

        {/* Glitch text effect */}
        <h2 
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-tight glitch-text text-glow-blue select-none"
          data-text="Farewell memories are still being written..."
        >
          Farewell memories are still being written...
        </h2>

        <p className="font-display max-w-xl mx-auto text-neutral-400 text-xs md:text-sm leading-relaxed font-light font-sans">
          The final folder containing senior convocation captures, degree ceremonies, and goodbye tears is scheduled for automated reconstitution in:
        </p>

        {/* Dynamic Holographic Countdown */}
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto pt-6 font-display font-light">
          {Object.entries(timeLeft).map(([label, val]) => (
            <div 
              key={label}
              className="bg-neutral-950/60 border border-neutral-900/80 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg relative group overflow-hidden"
              style={{ boxShadow: '0 0 15px rgba(14,165,233,0.03)' }}
            >
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-sky-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <span className="text-2xl sm:text-3xl font-medium text-white text-glow-blue">
                {val.toString().padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Glowing Loading Bar */}
        <div className="max-w-md mx-auto pt-6 space-y-2">
          <div className="flex items-center justify-between text-[9px] tracking-widest uppercase font-mono text-neutral-500 px-1">
            <span>Compiler Status // Rebuilding</span>
            <span className="text-sky-400">82% Completed</span>
          </div>
          
          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden p-[1px] border border-neutral-850">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "82%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-sky-400 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"
            />
          </div>
        </div>

        {/* LOCKED ARCHIVE BLURRED GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 text-left max-w-3xl mx-auto">
          {[
            { id: 1, name: "Convocation Reels", date: "Unlock: Grad Day" },
            { id: 2, name: "Sunset Group Photo", date: "Unlock: Final Walkout" },
            { id: 3, name: "Nostalgic Speeches", date: "Unlock: Ceremony" }
          ].map((item) => (
            <div 
              key={item.id}
              className="relative p-6 bg-neutral-950/20 border border-neutral-900 rounded-xl flex flex-col justify-between aspect-[4/3] group cursor-not-allowed select-none overflow-hidden"
            >
              {/* Extreme blur background */}
              <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-[12px] group-hover:backdrop-blur-[15px] transition-all duration-500 z-10" />
              
              <div className="relative z-20 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between text-neutral-600 group-hover:text-purple-400 transition-colors duration-300">
                  <Lock className="w-4 h-4" />
                  <span className="text-[9px] font-mono uppercase tracking-wider">
                    Secure File
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300">
                    {item.name}
                  </h4>
                  <span className="text-[9px] font-mono text-neutral-600 group-hover:text-neutral-500 transition-colors duration-300">
                    {item.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
