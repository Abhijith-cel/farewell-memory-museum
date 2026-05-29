import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Flame, Compass, Music, VolumeX } from 'lucide-react';
import { ambientSynth } from './AudioSynthesizer';

const rotatingQuotes = [
  "Attendance ends. Memories don't.",
  "One last scroll together.",
  "Some classrooms never leave our hearts.",
  "404: Seniors not found after graduation."
];

const polaroidsData = [
  {
    id: 1,
    img: "/images/canteen.jpg",
    backImg: "/images/canteen2.jpg",
    note: "Canteen Chronicles",
    date: "Sept 2024",
    rotate: -6,
    x: "8%",
    y: "15%",
    factor: 0.04
  },
  {
    id: 2,
    img: "/images/classroom.jpg",
    backImg: "/images/classroom2.jpg",
    note: "Last Bench Crew",
    date: "Nov 2025",
    rotate: 8,
    x: "78%",
    y: "10%",
    factor: -0.05
  },
  {
    id: 3,
    img: "/images/rehearsals.jpg",
    backImg: "/images/rehearsals2.jpg",
    note: "Farewell Practice",
    date: "May 2026",
    rotate: -4,
    x: "12%",
    y: "60%",
    factor: -0.03
  },
  {
    id: 4,
    img: "/images/graduation.jpg",
    backImg: "/images/graduation2.jpg",
    note: "The Final Flight",
    date: "Graduation",
    rotate: 5,
    x: "76%",
    y: "55%",
    factor: 0.06
  }
];

export default function Hero({ onEnterVault }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [flippedId, setFlippedId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % rotatingQuotes.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAudioToggle = () => {
    const state = ambientSynth.toggle();
    setIsAudioPlaying(state);
  };

  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col justify-between overflow-hidden py-8 px-6 md:px-12">

      {/* Cinematic Ambient Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,24,90,0.18)_0%,rgba(0,0,0,1)_80%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-indigo-900/10 filter blur-[150px] pointer-events-none" />

      {/* Floating 3D Parallax Polaroids */}
      <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block overflow-hidden">
        {polaroidsData.map((pol) => {
          const parallaxX = mousePos.x * pol.factor * window.innerWidth;
          const parallaxY = mousePos.y * pol.factor * window.innerHeight;

          return (
            <motion.div
              key={pol.id}
              className="absolute pointer-events-auto"
              style={{
                left: pol.x,
                top: pol.y,
                x: parallaxX,
                y: parallaxY
              }}
              whileHover={{
                scale: 1.08,
                zIndex: 40,
                transition: { duration: 0.3 }
              }}
              onClick={() => setFlippedId(flippedId === pol.id ? null : pol.id)}
            >
              <div style={{ perspective: '1000px' }} className="w-56 cursor-pointer">
                <motion.div
                  animate={{ rotateY: flippedId === pol.id ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: 'preserve-3d', rotate: pol.rotate }}
                  className="relative w-full"
                >

                  {/* FRONT FACE */}
                  <div
                    style={{ backfaceVisibility: 'hidden' }}
                    className="bg-neutral-900 border border-neutral-800/80 p-3 pb-5 rounded shadow-2xl polaroid-shadow flex flex-col space-y-3"
                  >
                    <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden rounded-sm border border-neutral-900">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                      <img
                        src={pol.img}
                        alt={pol.note}
                        className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700"
                      />
                      <span className="absolute bottom-2 right-2 z-10 text-[9px] bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-neutral-400 font-mono">
                        {pol.date}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-handwritten text-sm text-neutral-200 tracking-wide text-center italic">
                        "{pol.note}"
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    className="absolute inset-0 bg-neutral-900 border border-purple-800/40 p-3 pb-5 rounded shadow-2xl polaroid-shadow flex flex-col space-y-3"
                  >
                    <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden rounded-sm border border-neutral-900">
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent z-10" />
                      <img
                        src={pol.backImg || pol.img}
                        alt={pol.note}
                        className="w-full h-full object-cover opacity-90 transition-all duration-700"
                      />
                      <span className="absolute bottom-2 right-2 z-10 text-[9px] bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-purple-400 font-mono">
                        {pol.date}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-handwritten text-sm text-purple-300 tracking-wide text-center italic">
                        "click to flip back"
                      </span>
                    </div>
                  </div>

                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* TOP HEADER NAV */}
      <header className="relative z-30 w-full flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
          <span className="font-display text-sm uppercase tracking-widest text-neutral-300 font-medium">
            MEMORIA.MUSEUM
          </span>
        </motion.div>

        {/* Cinematic Music Controller */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleAudioToggle}
          className="w-10 h-10 rounded-full glass-panel cursor-pointer flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300 border border-neutral-800 hover:border-neutral-600"
        >
          {isAudioPlaying ? (
            <Music className="w-4 h-4 text-purple-400 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-neutral-500" />
          )}
        </motion.button>
      </header>

      {/* MAIN CENTRAL HERO DISPLAY */}
      <div className="relative z-20 flex-grow flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8 mt-12 lg:mt-0">

        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-2 bg-neutral-900/60 backdrop-blur-md border border-neutral-800/80 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-neutral-300 shadow-lg"
        >
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>SENIOR FAREWELL TRIBUTE • CLASS OF 2026</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-tight select-none"
        >
          We came as <span className="text-gradient font-bold">strangers.</span><br />
          We leave as <span className="text-gradient-purple font-bold italic text-glow-purple">memories.</span>
        </motion.h1>

        {/* Rotating Emotional Quotes */}
        <div className="h-10 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-neutral-400 text-sm sm:text-base tracking-widest uppercase font-light text-glow"
            >
              {rotatingQuotes[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Enter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
        >
          <button
            onClick={onEnterVault}
            className="w-full sm:w-auto group relative px-8 py-4 overflow-hidden rounded-full glass-panel cursor-pointer shadow-lg hover:border-glow-blue/40 border border-neutral-800 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-950/30 to-indigo-950/30 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 font-display text-xs tracking-widest uppercase text-white font-medium flex items-center justify-center space-x-2">
              <span>Open Memory Vault</span>
              <Compass className="w-4 h-4 text-sky-400 animate-spin-slow group-hover:rotate-45 transition-transform duration-500" />
            </span>
          </button>
        </motion.div>

      </div>

      {/* FOOTER SCROLL INDICATOR */}
      <footer className="relative z-20 w-full flex flex-col items-center justify-center pt-8">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-display text-[10px] tracking-widest uppercase text-neutral-500"
        >
          Scroll to explore museum
        </motion.span>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-2 text-neutral-500"
        >
          <ArrowDown className="w-4 h-4 text-purple-500" />
        </motion.div>
      </footer>

    </section>
  );
}