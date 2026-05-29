import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Film, Mic, Upload, Eye, X, Volume2, Sparkles, Plus } from 'lucide-react';

const initialMemories = [
  {
    id: 1,
    title: "Canteen Samosa Debates",
    category: "Canteen Chronicles",
    image: "/images/canteen.jpg",
    note: "Discussing coding projects over cold samosas and endless cups of sweet chai.",
    date: "Sep 12, 2024",
    voiceDuration: "0:45"
  },
  {
    id: 2,
    title: "The Great Compiler Error",
    category: "Lab Survivors",
    image: "/images/classroom.png",
    note: "4 hours of debugging. The error was a single missing semicolon. Classic.",
    date: "Oct 28, 2024",
    voiceDuration: "1:15"
  },
  {
    id: 3,
    title: "Proxy Attendance Operation",
    category: "Classroom Chaos",
    image: "/images/proxy.jpg",
    note: "Changing voice pitches to cover 3 missing friends at 8:00 AM. Successful mission.",
    date: "Jan 15, 2025",
    voiceDuration: "0:30"
  },
  {
    id: 4,
    title: "The Backbench Academy",
    category: "Last Bench Legends",
    image: "/images/backbench.jpg",
    note: "Where we learned more about startup ideas and movie trivia than calculus.",
    date: "Mar 03, 2025",
    voiceDuration: "2:04"
  },
  {
    id: 5,
    title: "Midnight Placement War-room",
    category: "Placement Stress Era",
    image: "/images/placement.jpg",
    note: "Cracking Leetcode algorithms in a caffeinated stupor at 3:00 AM.",
    date: "Nov 14, 2025",
    voiceDuration: "1:48"
  },
  {
    id: 6,
    title: "Farewell Dance Disaster",
    category: "Farewell Rehearsals",
    image: "/images/rehearsals.jpg",
    note: "Missing steps, tripping over speakers, and laughing until our lungs gave out.",
    date: "May 18, 2026",
    voiceDuration: "0:52"
  }
];

const categories = [
  "All Memories",
  "Classroom Chaos",
  "Lab Survivors",
  "Last Bench Legends",
  "Placement Stress Era",
  "Canteen Chronicles",
  "Farewell Rehearsals"
];

// ─── FLOATING PARTICLES ───────────────────────────────────────────────────────
const PARTICLE_COUNT = 40;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,         // % from left
  size: Math.random() * 2.5 + 1,  // 1px – 3.5px
  duration: Math.random() * 18 + 10, // 10s – 28s drift upward
  delay: Math.random() * 15,      // stagger start
  opacity: Math.random() * 0.35 + 0.08,
  // colour: mostly white-ish, occasional purple / sky hint
  color: ['#ffffff', '#ffffff', '#ffffff', '#c4b5fd', '#7dd3fc'][Math.floor(Math.random() * 5)]
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity
          }}
          animate={{
            y: [0, -(Math.random() * 400 + 500)],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [p.opacity, p.opacity * 0.6, 0]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}

// ─── IMAGE WITH SKELETON ──────────────────────────────────────────────────────
function MemoryImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {/* Skeleton shimmer — visible until image loads */}
      {!loaded && !error && (
        <div className="absolute inset-0 z-10">
          <div className="w-full h-full bg-neutral-800 animate-pulse" />
          {/* shimmer sweep */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)'
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 z-10 bg-neutral-900 flex flex-col items-center justify-center space-y-2">
          <span className="text-2xl">🖼️</span>
          <span className="text-[10px] text-neutral-600 font-mono">image not found</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
        className={`w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out ${loaded && !error ? 'opacity-100' : 'opacity-0'
          }`}
      />
    </>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MemoryVault() {
  const [selectedCategory, setSelectedCategory] = useState("All Memories");
  const [memories, setMemories] = useState(initialMemories);
  const [activeMemory, setActiveMemory] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [playingVoiceId, setPlayingVoiceId] = useState(null);
  const [waveformBars, setWaveformBars] = useState([]);

  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Classroom Chaos");
  const [formNote, setFormNote] = useState("");
  const [formImage, setFormImage] = useState("");

  useEffect(() => {
    const bars = Array.from({ length: 18 }, () => Math.floor(Math.random() * 25) + 5);
    setWaveformBars(bars);
  }, [playingVoiceId]);

  const toggleVoicePlayback = (id) => {
    if (playingVoiceId === id) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(id);
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } catch (e) {
        console.log("Audio simulation bypassed");
      }
      setTimeout(() => {
        setPlayingVoiceId((current) => current === id ? null : current);
      }, 5000);
    }
  };

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formNote.trim()) return;
    const newMemory = {
      id: Date.now(),
      title: formTitle,
      category: formCategory,
      image: formImage.trim() || "/images/graduation.jpg",
      note: formNote,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      voiceDuration: "0:45"
    };
    setMemories([newMemory, ...memories]);
    setIsUploading(false);
    setFormTitle("");
    setFormNote("");
    setFormImage("");
  };

  const filteredMemories = selectedCategory === "All Memories"
    ? memories
    : memories.filter(m => m.category === selectedCategory);

  return (
    <section id="memory-vault" className="relative w-full min-h-screen bg-black py-24 px-6 md:px-12 flex flex-col items-center">

      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-900/10 filter blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-sky-900/10 filter blur-[130px] pointer-events-none" />

      {/* ✦ FLOATING PARTICLES */}
      <FloatingParticles />

      {/* SECTION HEADER */}
      <div className="relative z-10 w-full max-w-6xl text-center space-y-6 mb-16">
        <div className="inline-flex items-center space-x-2 bg-neutral-900/60 backdrop-blur-md border border-neutral-800 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-neutral-300 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Interactive Time Capsule</span>
        </div>
        <h2 className="font-serif text-4xl md:text-6xl text-white font-normal">
          The <span className="text-gradient font-semibold">Memory Vault</span>
        </h2>
        <p className="font-display max-w-2xl mx-auto text-neutral-400 text-sm md:text-base leading-relaxed font-light">
          Unlock the golden files of our final semester. Explore the chaos, classroom survival notes, and late-night debriefs that defined us.
        </p>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-6 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-display text-xs tracking-widest uppercase transition-all duration-300 border cursor-pointer ${selectedCategory === cat
                ? "bg-purple-900/40 text-purple-200 border-purple-500/50 shadow-glow-purple"
                : "bg-neutral-950/40 text-neutral-400 border-neutral-800/80 hover:border-neutral-700 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN GALLERY GRID */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsUploading(true)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full glass-panel cursor-pointer hover:border-purple-500/40 text-xs tracking-widest uppercase text-neutral-200 hover:text-white transition-all duration-300"
          >
            <Plus className="w-4 h-4 text-purple-400" />
            <span>Deposit a Memory</span>
          </button>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredMemories.map((mem) => (
              <motion.div
                key={mem.id}
                layoutId={`card-container-${mem.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card group overflow-hidden rounded-xl flex flex-col justify-between"
              >

                {/* ✦ IMAGE WITH SKELETON */}
                <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden border-b border-neutral-900/60">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />
                  <MemoryImage src={mem.image} alt={mem.title} />
                  <span className="absolute top-3 left-3 z-30 text-[10px] bg-black/60 backdrop-blur-md border border-neutral-800/80 px-2 py-0.5 rounded-full text-purple-400 tracking-wider">
                    {mem.category}
                  </span>
                  <span className="absolute bottom-3 right-3 z-30 text-[9px] text-neutral-400 font-mono">
                    {mem.date}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg text-white font-medium group-hover:text-glow-blue transition-colors duration-300">
                      {mem.title}
                    </h3>
                    <p className="font-display text-neutral-400 text-xs leading-relaxed font-light line-clamp-2">
                      {mem.note}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-900/80">
                    <button
                      onClick={() => toggleVoicePlayback(mem.id)}
                      className="flex items-center space-x-2 text-neutral-400 hover:text-white cursor-pointer transition-colors duration-300"
                    >
                      <Mic className={`w-3.5 h-3.5 ${playingVoiceId === mem.id ? 'text-purple-400 animate-pulse' : ''}`} />
                      <span className="text-[10px] font-mono tracking-wider">
                        {playingVoiceId === mem.id ? "Playing Voice Note..." : `Play Voice (${mem.voiceDuration})`}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveMemory(mem)}
                      className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800/80 cursor-pointer flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all duration-300"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {playingVoiceId === mem.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 28 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-end justify-center space-x-0.5 bg-neutral-950/60 p-1.5 rounded border border-neutral-900/60"
                    >
                      {waveformBars.map((val, idx) => (
                        <motion.div
                          key={idx}
                          animate={{ height: [val * 0.4, val, val * 0.4] }}
                          transition={{ repeat: Infinity, duration: 0.8 + idx * 0.04, ease: "easeInOut" }}
                          className="w-1.5 bg-gradient-to-t from-purple-600 to-sky-400 rounded-full"
                          style={{ height: val }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* EXPANDED FULLSCREEN MODAL */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              layoutId={`card-container-${activeMemory.id}`}
              className="glass-panel-heavy max-w-3xl w-full rounded-2xl overflow-hidden relative border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveMemory(null)}
                className="absolute top-4 right-4 z-40 w-9 h-9 rounded-full bg-black/40 border border-neutral-800/80 cursor-pointer flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto bg-neutral-950 border-r border-neutral-900">
                  <img
                    src={activeMemory.image}
                    alt={activeMemory.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-purple-950/60 border border-purple-800/60 px-2.5 py-0.5 rounded-full text-purple-300 font-mono uppercase tracking-wider">
                        {activeMemory.category}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {activeMemory.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-white font-normal">
                      {activeMemory.title}
                    </h3>
                    <div className="relative p-5 bg-neutral-950/50 border border-neutral-900 rounded-lg">
                      <p className="font-handwritten text-sm text-neutral-300 leading-relaxed italic">
                        "{activeMemory.note}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                    <button
                      onClick={() => toggleVoicePlayback(activeMemory.id)}
                      className="flex items-center space-x-2 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-full text-xs font-mono border border-neutral-800 cursor-pointer transition-all duration-300"
                    >
                      <Volume2 className={`w-4 h-4 ${playingVoiceId === activeMemory.id ? 'text-purple-400 animate-bounce' : ''}`} />
                      <span>{playingVoiceId === activeMemory.id ? "Mute Echo" : "Play Voice Echo"}</span>
                    </button>
                    <span className="text-[9px] text-neutral-600 font-mono">
                      REF: #{activeMemory.id.toString().slice(-4)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DEPOSIT A MEMORY MODAL */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, filter: 'blur(5px)' }}
              animate={{ scale: 1, filter: 'blur(0px)' }}
              exit={{ scale: 0.95, filter: 'blur(5px)' }}
              className="glass-panel-heavy max-w-md w-full rounded-2xl p-6 relative border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsUploading(false)}
                className="absolute top-4 right-4 z-40 w-9 h-9 rounded-full bg-black/40 border border-neutral-800/80 cursor-pointer flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 mb-6">
                <h3 className="font-serif text-xl text-white font-normal flex items-center space-x-2">
                  <Upload className="w-5 h-5 text-purple-400 animate-bounce" />
                  <span>Deposit Digital Memory</span>
                </h3>
                <p className="font-display text-neutral-400 text-xs leading-relaxed font-light">
                  Scaffold your memory into the museum archives. Pick a category and add your narrative.
                </p>
              </div>

              <form onSubmit={handleAddMemory} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-display text-[10px] tracking-widest uppercase text-neutral-400">Memory Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 404 Canteen Debates"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-display text-[10px] tracking-widest uppercase text-neutral-400">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-neutral-300 focus:outline-none focus:border-purple-500/60"
                    >
                      {categories.slice(1).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-display text-[10px] tracking-widest uppercase text-neutral-400">Simulated URL</label>
                    <input
                      type="text"
                      placeholder="Optional image link"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-display text-[10px] tracking-widest uppercase text-neutral-400">Memory Narrative Note</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Write a sweet/funny hand-written comment..."
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full relative px-6 py-3 mt-2 overflow-hidden rounded-lg bg-gradient-to-r from-purple-800 to-indigo-900 cursor-pointer shadow-lg text-xs font-display tracking-widest uppercase text-white font-medium hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
                  <span>Lock into capsule</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom quote */}
      <div className="relative z-10 w-full max-w-4xl border-t border-neutral-900/60 mt-24 pt-12 text-center">
        <p className="font-serif text-lg md:text-xl text-neutral-400 italic text-glow">
          "These moments will replay forever. We never knew small moments become lifelong memories."
        </p>
      </div>

    </section>
  );
}