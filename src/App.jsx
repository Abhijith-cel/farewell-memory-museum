import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import IntroLoader from './components/IntroLoader';
import GlobalCanvas from './components/GlobalCanvas';
import Hero from './components/Hero';
import MemoryVault from './components/MemoryVault';
import VideoTheatre from './components/VideoTheatre';
import GoodbyeWall from './components/GoodbyeWall';
import ComingSoon from './components/ComingSoon';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [showMuseum, setShowMuseum] = useState(false);
  const [warpActive, setWarpActive] = useState(false);
  const warpCanvasRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!showMuseum) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium easing
      smoothWheel: true,
      wheelMultiplier: 1.15
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [showMuseum]);

  // High-performance GSAP-style Space Warp Warp-Speed Canvas Animation
  useEffect(() => {
    if (!warpActive) return;

    const canvas = warpCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let speed = 0.5;
    
    // Create warp stars
    const starsCount = 180;
    const stars = Array.from({ length: starsCount }, () => ({
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * canvas.width,
      color: Math.random() > 0.5 ? '#6d28d9' : '#0ea5e9'
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; // trail smear
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Increase speed rapidly
      speed += 0.8;

      stars.forEach((star) => {
        star.z -= speed;
        
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = (Math.random() - 0.5) * canvas.width;
          star.y = (Math.random() - 0.5) * canvas.height;
        }

        // Perspective projections
        const px = (star.x / star.z) * canvas.width * 1.5 + canvas.width / 2;
        const py = (star.y / star.z) * canvas.height * 1.5 + canvas.height / 2;

        // Calculate line lengths (warp speed streaks)
        const pzPrev = star.z + speed * 1.6;
        const pxPrev = (star.x / pzPrev) * canvas.width * 1.5 + canvas.width / 2;
        const pyPrev = (star.y / pzPrev) * canvas.height * 1.5 + canvas.height / 2;

        // Draw warp line
        ctx.strokeStyle = star.color;
        ctx.lineWidth = Math.min(3, 4 / (star.z / canvas.width));
        ctx.shadowBlur = 10;
        ctx.shadowColor = star.color;
        
        ctx.beginPath();
        ctx.moveTo(pxPrev, pyPrev);
        ctx.lineTo(px, py);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [warpActive]);

  // Wormhole transition logic
  const handleWormholeTransition = () => {
    setWarpActive(true);
    
    // Synthesize wrap-speed engine sound scale
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 1.2);
      
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch(e) {
      console.log("Warp synth bypassed");
    }

    // Scroll to the Memory Vault section smoothly during the wrap visual
    setTimeout(() => {
      const target = document.getElementById('memory-vault');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);

    // Fade out warp speed lines
    setTimeout(() => {
      setWarpActive(false);
    }, 1500);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative bg-black w-full min-h-screen select-none overflow-hidden">
      
      {/* 1. Introductory Loading Sequence */}
      {!showMuseum && <IntroLoader onComplete={() => setShowMuseum(true)} />}

      {/* 2. Main Space Museum Layout */}
      {showMuseum && (
        <div className="relative w-full">
          {/* Canvas particles */}
          <GlobalCanvas />

          {/* Hero segment */}
          <Hero onEnterVault={handleWormholeTransition} />

          {/* Interactive Memory Vault Grid */}
          <MemoryVault />

          {/* Movie Theatre player */}
          <VideoTheatre />

          {/* User Sticky wall board */}
          <GoodbyeWall />

          {/* Countdown Locked Gallery */}
          <ComingSoon />

          {/* Luxury Futuristic Footer */}
          <footer className="relative w-full py-16 bg-neutral-950 border-t border-neutral-900/60 flex flex-col items-center justify-center text-center px-6 z-20">
            <div className="space-y-4 max-w-lg">
              <div className="flex items-center justify-center space-x-2 text-glow-purple">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="font-serif text-lg tracking-widest text-neutral-300 font-semibold">
                  WE LEAVE AS MEMORIES
                </span>
              </div>
              
              <p className="font-display text-xs text-neutral-500 leading-relaxed font-light">
                Built as a permanent digital time capsule for college seniors. Some classrooms never leave our hearts. Designed with cybernetic nostalgia.
              </p>

              <div className="pt-4 flex items-center justify-center space-x-2 text-[10px] text-neutral-600 font-mono">
                <span>Class of 2026 // Farewell tribute</span>
                <span>•</span>
                <button 
                  onClick={handleScrollToTop}
                  className="flex items-center space-x-1 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  <span>Re-examine Hero</span>
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="pt-4 flex items-center justify-center space-x-1 text-[9px] text-neutral-700 font-mono">
                <span>Made with love by Arshad and team for the Class of 2026</span>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* 3. Full-screen Space Warp Canvas Transition Overlay */}
      <AnimatePresence>
        {warpActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black pointer-events-none"
          >
            <canvas ref={warpCanvasRef} className="w-full h-full block" />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
