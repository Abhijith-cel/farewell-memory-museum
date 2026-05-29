import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Play, X, Volume2, Sparkles } from 'lucide-react';

const videosList = [
  {
    id: "trailer",
    title: "Farewell Official Trailer",
    category: "Farewell Trailer",
    duration: "2:15",
    tags: ["4K", "Cinematic"],
    image: "/images/theater_trailer.jpg",
    desc: "A breathtaking preview of the four-year voyage, detailing the first step on campus up to the final countdown."
  },
  {
    id: "montage",
    title: "The Nostalgia Montage",
    category: "Emotional Montage",
    duration: "6:40",
    tags: ["Emotional", "Nostalgic"],
    image: "/images/theater_montage.jpg",
    desc: "A montage of laughter, late night study sessions, high fives in corridors, and emotional silent hugs."
  },
  {
    id: "bloopers",
    title: "Canteen & Lab Bloopers",
    category: "Funny Bloopers",
    duration: "4:20",
    tags: ["Hilarious", "Uncensored"],
    image: "/images/theater_bloopers.jpg",
    desc: "Unseen footage of broken lab apparatus, presentation failures, class sleeping highlights, and canteen accidents."
  },
  {
    id: "bts",
    title: "Behind the Scribes",
    category: "Behind The Scenes",
    duration: "5:10",
    tags: ["Exclusives"],
    image: "/images/theater_bts.jpg",
    desc: "A sneak-peek into our exam preparation methodologies, copy-paste operations, and secret class group planning."
  },
  {
    id: "goodbye",
    title: "Final Curtain Call",
    category: "Final Goodbye Video",
    duration: "10:15",
    tags: ["Graduation Special"],
    image: "/images/theater_goodbye.jpg",
    desc: "The farewell messages from our professors, juniors, and the final emotional exit walk through the college gates."
  }
];

export default function VideoTheatre() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isCurtainClosed, setIsCurtainClosed] = useState(false);
  const [playState, setPlayState] = useState('curtains'); // 'curtains' -> 'playing'
  const canvasRef = useRef(null);

  // Simulated theatre ambient sound effect
  const playTheatreSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      // Play a soft, low-frequency atmospheric drone synth (theatre rumble)
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, audioCtx.currentTime); // Low A1 rumble

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(80, audioCtx.currentTime);

      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 1.5);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 4.0); // fade out

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 4.2);
    } catch (e) {
      console.log("Theatre sound bypassed");
    }
  };

  const handlePlayVideo = (vid) => {
    setSelectedVideo(vid);
    setIsCurtainClosed(true);
    setPlayState('curtains');
    playTheatreSound();

    // Pull curtains open after 1.5s
    setTimeout(() => {
      setPlayState('playing');
    }, 1500);
  };

  const handleCloseTheatre = () => {
    setSelectedVideo(null);
    setIsCurtainClosed(false);
  };

  // HTML5 Interactive Dreamscape Canvas Loop for Simulated Cinematic Video Player
  useEffect(() => {
    if (playState !== 'playing' || !selectedVideo) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let frames = 0;

    // Nodes for cosmic dream video simulation
    let dustNodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 0.6 + 0.2),
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2
    }));

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      frames++;
      ctx.fillStyle = '#020005';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw glowing abstract camera light (nebula visualizer)
      const grad = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(frames * 0.01) * 100,
        canvas.height / 2 + Math.cos(frames * 0.015) * 80,
        10,
        canvas.width / 2, canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.6
      );
      grad.addColorStop(0, 'rgba(109, 40, 217, 0.15)'); // deep purple
      grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.05)'); // blue neon
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw cinematic grid lines (cybernetic aesthetic)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 3. Draw drifting dust particles (cinematic lighting beam)
      dustNodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.y < 0) {
          node.y = canvas.height;
          node.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `rgba(168, 85, 247, ${node.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#6d28d9';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Print fading cinematic quotes corresponding to the video state
      ctx.shadowBlur = 0;
      ctx.textAlign = 'center';

      const lines = [
        "Every ending deserves a standing ovation.",
        "A digital archive of our final acts.",
        "Strangers on day one, legends on day last."
      ];
      const selectedLineIndex = Math.floor((frames / 240) % lines.length);
      const alphaFactor = Math.abs(Math.sin(frames * 0.008));

      ctx.fillStyle = `rgba(255, 255, 255, ${alphaFactor * 0.65})`;
      ctx.font = '22px Georgia, serif';
      ctx.fillText(`“${lines[selectedLineIndex]}”`, canvas.width / 2, canvas.height / 2);

      // Soundbar waveforms
      ctx.fillStyle = 'rgba(14, 165, 233, 0.15)';
      const waveBars = 32;
      const barWidth = canvas.width / waveBars;
      for (let i = 0; i < waveBars; i++) {
        const height = Math.abs(Math.sin(frames * 0.05 + i * 0.15)) * (canvas.height * 0.18) + 10;
        ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 4, height);
      }

      // Render video status indicators
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`MOCK FEED // RECREATING: ${selectedVideo.title.toUpperCase()}`, 20, 30);
      ctx.fillText(`FPS: 60.00 // QUALITY: 4K ULTRA CINEMATIC`, 20, 45);

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [playState, selectedVideo]);

  return (
    <section id="video-theatre" className="relative w-full min-h-screen bg-black py-24 px-6 md:px-12 flex flex-col items-center">

      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-purple-900/10 filter blur-[150px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="w-full max-w-6xl text-center space-y-6 mb-16">
        <div className="inline-flex items-center space-x-2 bg-neutral-900/60 backdrop-blur-md border border-neutral-800 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-neutral-300 shadow-md">
          <Film className="w-3.5 h-3.5 text-purple-400" />
          <span>Cinematic Theatre Mode</span>
        </div>
        <h2 className="font-serif text-4xl md:text-6xl text-white font-normal">
          The <span className="text-gradient-purple font-semibold text-glow-purple">Farewell Theatre</span>
        </h2>
        <p className="font-display max-w-2xl mx-auto text-neutral-400 text-sm md:text-base leading-relaxed font-light">
          dim your lights and experience the visual archives. A luxury grid of documentary-style footage replaying our biggest milestones.
        </p>
      </div>

      {/* GIANT CINEMATIC FOCUS STAGE */}
      <div className="w-full max-w-5xl mb-12">
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden glass-panel-heavy border border-neutral-800 flex items-center justify-center p-8 group shadow-2xl">
          <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale blur-sm group-hover:scale-105 transition-all duration-[2s]" style={{ backgroundImage: "url('/images/theater_hero.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-10" />

          {/* Core Banner Callout */}
          <div className="relative z-20 text-center max-w-xl space-y-4">
            <span className="text-[10px] tracking-widest uppercase font-mono text-purple-400 font-bold bg-purple-950/60 border border-purple-800/40 px-3 py-1 rounded-full">
              Featured Premiere
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-white font-normal text-glow">
              Every ending deserves a standing ovation.
            </h3>
            <p className="font-display text-xs text-neutral-400 leading-relaxed font-light">
              Watch our final campus farewell documentary. Pulling back the curtains of the last four years of classes, tears, laughter, and unbreakable bonds.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handlePlayVideo(videosList[4])}
                className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 cursor-pointer text-black font-display text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-lg shadow-white/5"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Play Goodbye Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NETFLIX CARD ROW */}
      <div className="w-full max-w-5xl space-y-4">
        <h4 className="font-display text-xs tracking-widest uppercase text-neutral-500 font-semibold pl-1">
          Select Cinematic Chapter
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {videosList.map((vid) => (
            <motion.div
              key={vid.id}
              onClick={() => handlePlayVideo(vid)}
              className="glass-card group overflow-hidden rounded-xl cursor-pointer flex flex-col justify-between border border-neutral-900 shadow-md relative"
              whileHover={{
                y: -6,
                borderColor: 'rgba(109, 40, 217, 0.4)',
                boxShadow: '0 8px 30px rgba(109, 40, 217, 0.12)'
              }}
            >
              <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300 z-10" />
                <img
                  src={vid.image}
                  alt={vid.title}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />

                {/* Floating Play Circle */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-9 h-9 rounded-full bg-purple-500/80 flex items-center justify-center text-white shadow-lg">
                    <Play className="w-4 h-4 fill-white translate-x-0.5" />
                  </div>
                </div>

                <span className="absolute bottom-2 right-2 z-20 text-[9px] bg-black/60 px-1.5 py-0.5 rounded text-neutral-400 font-mono">
                  {vid.duration}
                </span>
              </div>

              {/* Title blocks */}
              <div className="p-4 space-y-1">
                <span className="text-[8px] font-mono uppercase text-purple-400 tracking-wider">
                  {vid.category}
                </span>
                <h5 className="font-serif text-sm text-neutral-200 group-hover:text-white font-medium line-clamp-1">
                  {vid.title}
                </h5>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN CURTAIN THEATRE OVERLAY PLAYER */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
          >
            {/* Close stage */}
            <button
              onClick={handleCloseTheatre}
              className="absolute top-6 right-6 z-40 w-10 h-10 rounded-full bg-white/5 border border-neutral-800/80 cursor-pointer flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* THEATRE BOX LAYOUT */}
            <div className="w-full max-w-4xl aspect-video rounded-xl border border-neutral-900 bg-neutral-950 overflow-hidden relative shadow-2xl">

              {/* PLAY STATE: CURTAINS CLOSED STAGE */}
              <AnimatePresence>
                {playState === 'curtains' && (
                  <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.0 }}
                    className="absolute inset-0 z-30 flex"
                  >
                    {/* Left Curtain */}
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: isCurtainClosed ? '-100%' : 0 }}
                      transition={{ delay: 0.5, duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
                      className="w-1/2 h-full bg-gradient-to-r from-neutral-950 to-purple-950/90 border-r border-neutral-800 flex items-center justify-end pr-8"
                    >
                      <div className="w-0.5 h-3/4 bg-neutral-800/20" />
                    </motion.div>

                    {/* Right Curtain */}
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: isCurtainClosed ? '100%' : 0 }}
                      transition={{ delay: 0.5, duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
                      className="w-1/2 h-full bg-gradient-to-l from-neutral-950 to-purple-950/90 border-l border-neutral-800 flex items-center justify-start pl-8"
                    >
                      <div className="w-0.5 h-3/4 bg-neutral-800/20" />
                    </motion.div>

                    {/* Text overlays in curtains */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none z-40">
                      <motion.h4
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-serif text-2xl text-neutral-200"
                      >
                        Adjusting theater projector...
                      </motion.h4>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 mt-2">
                        Class of 2026 Memories
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SIMULATED CINEMATIC VIDEO FEED */}
              {playState === 'playing' && (
                <div className="w-full h-full relative">
                  <canvas ref={canvasRef} className="w-full h-full block" />

                  {/* Floating Video Overlay Metadata */}
                  <div className="absolute bottom-6 left-6 z-20 flex flex-col space-y-1 text-left pointer-events-none">
                    <span className="text-[9px] uppercase font-mono text-neutral-500 tracking-wider">
                      CHAPTER VIEWPORT
                    </span>
                    <h4 className="font-serif text-lg text-white font-normal text-glow">
                      {selectedVideo.title}
                    </h4>
                    <p className="font-display text-[10px] text-neutral-400 font-light max-w-md line-clamp-1">
                      {selectedVideo.desc}
                    </p>
                  </div>

                  <div className="absolute bottom-6 right-6 z-20 bg-black/60 border border-neutral-900 px-3 py-1 rounded text-[9px] font-mono text-purple-400">
                    PLAYING // {selectedVideo.duration}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
