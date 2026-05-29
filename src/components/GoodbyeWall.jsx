import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, MessageSquare, Heart } from 'lucide-react';

const initialNotes = [
  {
    id: 1,
    author: "Elena (CSE Senior)",
    message: "Thank you for the proxy attendances, midnight coding marathons, and teaching me how to survive lab presentation stress. Love you guys!",
    glow: "purple",
    date: "May 24",
    driftX: 3,
    driftY: -8
  },
  {
    id: 2,
    author: "Kabir (ECE Backbencher)",
    message: "Some classrooms never leave our hearts. To the guys who slept through every lecture and still aced the exams, you are my family.",
    glow: "blue",
    date: "May 25",
    driftX: -4,
    driftY: 6
  },
  {
    id: 3,
    author: "Pooja (Junior Dev)",
    message: "Class of 2026, you raised the bar so high! Good luck with placements and corporate life. You will be sorely missed on campus.",
    glow: "pink",
    date: "May 25",
    driftX: 5,
    driftY: -5
  },
  {
    id: 4,
    author: "Prof. Raghavan",
    message: "You came as a chaotic bunch, but you leave as outstanding minds. May your compiler errors be few, and your success be infinite.",
    glow: "gold",
    date: "May 23",
    driftX: -2,
    driftY: -9
  }
];

const glowMap = {
  purple: {
    bg: "rgba(109, 40, 217, 0.05)",
    border: "rgba(109, 40, 217, 0.25)",
    text: "text-purple-300",
    shadow: "shadow-[0_0_20px_rgba(109,40,217,0.1)] hover:shadow-[0_0_35px_rgba(109,40,217,0.3)] hover:border-purple-500/40"
  },
  blue: {
    bg: "rgba(14, 165, 233, 0.05)",
    border: "rgba(14, 165, 233, 0.25)",
    text: "text-sky-300",
    shadow: "shadow-[0_0_20px_rgba(14,165,233,0.1)] hover:shadow-[0_0_35px_rgba(14,165,233,0.3)] hover:border-sky-500/40"
  },
  pink: {
    bg: "rgba(219, 39, 119, 0.05)",
    border: "rgba(219, 39, 119, 0.25)",
    text: "text-pink-300",
    shadow: "shadow-[0_0_20px_rgba(219,39,119,0.1)] hover:shadow-[0_0_35px_rgba(219,39,119,0.3)] hover:border-pink-500/40"
  },
  gold: {
    bg: "rgba(234, 179, 8, 0.05)",
    border: "rgba(234, 179, 8, 0.25)",
    text: "text-yellow-300",
    shadow: "shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:shadow-[0_0_35px_rgba(234,179,8,0.3)] hover:border-yellow-500/40"
  }
};

export default function GoodbyeWall() {
  const [notes, setNotes] = useState(initialNotes);
  const [formAuthor, setFormAuthor] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [selectedGlow, setSelectedGlow] = useState("purple");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formMessage.trim()) return;

    setIsSubmitting(true);
    
    // Animate sticky notes flying onto board after minor delay
    setTimeout(() => {
      const newNote = {
        id: Date.now(),
        author: formAuthor.trim(),
        message: formMessage.trim(),
        glow: selectedGlow,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        driftX: Math.floor(Math.random() * 12) - 6,
        driftY: Math.floor(Math.random() * 12) - 6
      };

      setNotes([newNote, ...notes]);
      setFormAuthor("");
      setFormMessage("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section id="goodbye-wall" className="relative w-full min-h-screen bg-black py-24 px-6 md:px-12 flex flex-col items-center">
      
      {/* Dynamic Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-purple-900/10 filter blur-[150px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="w-full max-w-6xl text-center space-y-6 mb-16 relative z-10">
        <div className="inline-flex items-center space-x-2 bg-neutral-900/60 backdrop-blur-md border border-neutral-800 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-neutral-300 shadow-md">
          <MessageSquare className="w-3.5 h-3.5 text-pink-400" />
          <span>Interactive Goodbye Board</span>
        </div>
        <h2 className="font-serif text-4xl md:text-6xl text-white font-normal">
          The <span className="text-gradient font-semibold">Glowing Goodbye Wall</span>
        </h2>
        <p className="font-display max-w-2xl mx-auto text-neutral-400 text-sm md:text-base leading-relaxed font-light font-sans">
          Leave a message, an easter egg, or an emotional confession for the graduating seniors. Choose a custom neon sticky card color and let it float forever.
        </p>
      </div>

      {/* INPUT FORM + GLOW BOARD COLUMN CONTAINER */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20">
        
        {/* LEFT COLUMN: MESSAGE SUBMITTER */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel-heavy rounded-2xl p-6 border border-neutral-850/80 shadow-xl space-y-5">
            <h3 className="font-serif text-lg text-white font-normal flex items-center space-x-2">
              <Heart className="w-4.5 h-4.5 text-pink-500 fill-pink-500 animate-pulse" />
              <span>Leave your Mark</span>
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-display text-[10px] tracking-widest uppercase text-neutral-400">Your Signature</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Junior Dev / Midnight Coder"
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500/60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-display text-[10px] tracking-widest uppercase text-neutral-400">Nostalgic Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type an emotional message, funny memory, or farewell greeting..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500/60 resize-none font-sans"
                />
              </div>

              {/* Color Presets */}
              <div className="space-y-2">
                <label className="font-display text-[10px] tracking-widest uppercase text-neutral-400 block">Sticky Glow Accent</label>
                <div className="flex items-center space-x-3">
                  {Object.keys(glowMap).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedGlow(color)}
                      className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 border-2 ${
                        selectedGlow === color ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{
                        backgroundColor: color === 'purple' ? '#6d28d9' : color === 'blue' ? '#0ea5e9' : color === 'pink' ? '#db2777' : '#eab308',
                        boxShadow: `0 0 10px ${color === 'purple' ? '#6d28d9' : color === 'blue' ? '#0ea5e9' : color === 'pink' ? '#db2777' : '#eab308'}`
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative px-6 py-3 mt-4 overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 hover:border-pink-500/40 cursor-pointer shadow-lg text-xs font-display tracking-widest uppercase text-white font-medium hover:text-white transition-all duration-500 flex items-center justify-center space-x-2"
              >
                <span>{isSubmitting ? "Scribbling..." : "Scribble on Wall"}</span>
                <Send className="w-3.5 h-3.5 text-pink-400 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: BOARD CONTAINER */}
        <div className="lg:col-span-8">
          <div className="glass-panel rounded-2xl p-6 border border-neutral-900 shadow-xl min-h-[500px] flex flex-col justify-between">
            
            {/* Grid display for Sticky Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
              <AnimatePresence>
                {notes.map((note) => {
                  const glowStyle = glowMap[note.glow];
                  
                  return (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        y: [note.driftY, -note.driftY, note.driftY]
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 },
                        y: {
                          repeat: Infinity,
                          duration: 5 + Math.abs(note.driftX) * 0.4,
                          ease: "easeInOut"
                        }
                      }}
                      className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all duration-300 hover:scale-[1.03] hover:rotate-1 cursor-help ${glowStyle.shadow}`}
                      style={{
                        backgroundColor: glowStyle.bg,
                        borderColor: glowStyle.border,
                        transform: `translate(${note.driftX}px, 0)`
                      }}
                    >
                      <p className="font-sans text-xs text-neutral-300 leading-relaxed font-light">
                        "{note.message}"
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-neutral-900/60 pt-3">
                        <span className={`font-serif text-xs font-semibold ${glowStyle.text}`}>
                          — {note.author}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-500">
                          {note.date}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="border-t border-neutral-900/60 pt-4 flex items-center justify-between text-neutral-500 text-[10px] tracking-widest uppercase font-display mt-8">
              <span>Interactive drifting mechanics active</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
