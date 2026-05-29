import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Sparkles } from 'lucide-react';
import { ambientSynth } from './AudioSynthesizer';

const introQuotes = [
  "Every classroom has an echo...",
  "Every corridor has a story...",
  "We never knew small moments would become lifelong memories.",
  "Rebuilding Digital Memory Museum..."
];

export default function IntroLoader({ onComplete }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('quotes'); // 'quotes' -> 'loading' -> 'ready' -> 'exiting'

  // Sequentially display quotes
  useEffect(() => {
    if (stage !== 'quotes') return;

    const interval = setInterval(() => {
      setQuoteIndex((prev) => {
        if (prev === introQuotes.length - 1) {
          clearInterval(interval);
          setTimeout(() => setStage('loading'), 1200);
          return prev;
        }
        return prev + 1;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [stage]);

  // Loading progress calculation
  useEffect(() => {
    if (stage !== 'loading') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStage('ready'), 800);
          return 100;
        }
        // Random progress increments for realistic loading look
        return prev + Math.floor(Math.random() * 8 + 4);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [stage]);

  const handleEnterCapsule = () => {
    setStage('exiting');
    // Start synthesized ambient music
    ambientSynth.start();
    
    // Complete transition after animation wraps up
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {stage !== 'exiting' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: 'blur(30px)' 
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle cosmic background glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-glow-purple opacity-20 filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-glow-blue opacity-15 filter blur-[120px] pointer-events-none" />

          <div className="z-10 max-w-2xl px-6 text-center">
            
            {/* Stage 1: Narrative Intro Quotes */}
            {stage === 'quotes' && (
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="font-serif text-2xl md:text-3xl text-neutral-300 italic tracking-wide text-glow"
                >
                  "{introQuotes[quoteIndex]}"
                </motion.p>
              </AnimatePresence>
            )}

            {/* Stage 2: Technical Reconstitution */}
            {stage === 'loading' && (
              <div className="flex flex-col items-center space-y-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative flex items-center justify-center w-28 h-28"
                >
                  {/* Glowing progress ring */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      stroke="rgba(255, 255, 255, 0.03)"
                      strokeWidth="2"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="56"
                      cy="56"
                      r="48"
                      stroke="url(#purpleBlueGrad)"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 48}
                      strokeDashoffset={2 * Math.PI * 48 * (1 - Math.min(progress, 100) / 100)}
                      transition={{ ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="purpleBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6d28d9" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute font-display text-xl font-light text-neutral-100 text-glow-blue">
                    {Math.min(progress, 100)}%
                  </span>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-display tracking-widest text-xs uppercase text-neutral-400"
                >
                  Downloading memory nodes...
                </motion.p>
              </div>
            )}

            {/* Stage 3: Ready to Enter Capsule */}
            {stage === 'ready' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                className="flex flex-col items-center space-y-8"
              >
                <div className="flex items-center space-x-2 text-glow-purple text-glow-blue">
                  <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                  <span className="font-display text-xs tracking-widest uppercase text-indigo-300 font-semibold">
                    Digital capsule compiled successfully
                  </span>
                </div>
                
                <h1 className="font-serif text-3xl md:text-5xl text-white font-normal leading-tight">
                  Strangers once.<br />
                  <span className="text-gradient font-semibold">Memories forever.</span>
                </h1>

                <button
                  onClick={handleEnterCapsule}
                  className="group relative px-8 py-4 overflow-hidden rounded-full glass-panel cursor-pointer shadow-lg hover:border-glow-purple/40 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-sky-900/40 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 font-display text-sm tracking-widest uppercase text-white font-medium flex items-center space-x-3">
                    <span>Enter Memory Vault</span>
                  </span>
                </button>

                <div className="flex items-center space-x-2 text-neutral-500 text-xs mt-4">
                  <Headphones className="w-4 h-4 animate-bounce" />
                  <span>Cinematic audio synthesized for this experience</span>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
