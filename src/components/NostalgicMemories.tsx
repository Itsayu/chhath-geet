import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Plus, Send } from 'lucide-react';
import { NostalgicMemory } from '../types';
import { NOSTALGIC_MEMORIES } from '../data/chhathData';
import { playWaterRipple } from '../utils/audioSynth';

export const NostalgicMemories: React.FC = () => {
  const [memories, setMemories] = useState<NostalgicMemory[]>(NOSTALGIC_MEMORIES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Memory form state
  const [userHindi, setUserHindi] = useState('');
  const [userEnglish, setUserEnglish] = useState('');
  const [userAuthor, setUserAuthor] = useState('');

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % memories.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlay, memories.length]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % memories.length);
    setIsAutoPlay(false);
    playWaterRipple(0.2);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + memories.length) % memories.length);
    setIsAutoPlay(false);
    playWaterRipple(0.2);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userHindi.trim()) return;

    const newMem: NostalgicMemory = {
      id: `custom-${Date.now()}`,
      quoteHindi: userHindi.trim(),
      quoteEnglish: userEnglish.trim() || 'A cherished personal memory from the sacred Chhath ghat.',
      author: userAuthor.trim() || 'छठ श्रद्धालु (Devotee)',
      category: 'childhood',
      tag: 'User Memory'
    };

    setMemories([newMem, ...memories]);
    setCurrentIndex(0);
    setUserHindi('');
    setUserEnglish('');
    setUserAuthor('');
    setShowAddModal(false);
    playWaterRipple(0.4);
  };

  const current = memories[currentIndex] || memories[0];

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-1 z-10 shrink-0">
      {/* Compact Glass Ticker */}
      <div className="relative rounded-2xl glass-panel px-3.5 sm:px-5 py-2 sm:py-2.5 border border-amber-500/25 shadow-xl backdrop-blur-xl flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-amber-500/20 text-amber-300">
              <Quote className="w-3 h-3" />
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400 font-outfit">
              {current.tag}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-2 py-0.5 rounded-md bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-200 text-[10px] font-outfit flex items-center gap-1 transition-colors"
              title="Share your own nostalgic Chhath memory"
            >
              <Plus className="w-3 h-3" />
              <span>यादें जोड़ें</span>
            </button>
            <span className="text-[10px] font-mono text-stone-400 pl-1">
              {currentIndex + 1}/{memories.length}
            </span>
            <div className="flex items-center gap-0.5 ml-1">
              <button
                onClick={handlePrev}
                className="p-1 rounded-md hover:bg-amber-500/20 text-stone-400 hover:text-amber-200 transition-colors"
                aria-label="Previous Memory"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 rounded-md hover:bg-amber-500/20 text-stone-400 hover:text-amber-200 transition-colors"
                aria-label="Next Memory"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Animated Memory Text (Compact single/two lines) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
          >
            <p className="font-hindi-display text-xs sm:text-sm text-amber-100/95 truncate">
              “{current.quoteHindi}”
            </p>
            <span className="text-[10px] font-kalam text-amber-300/80 shrink-0 self-end sm:self-auto">
              ~ {current.author}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Add Memory Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg rounded-2xl glass-panel-amber p-5 border border-amber-400/40 shadow-2xl"
            >
              <h3 className="font-hindi-display text-xl text-amber-100 mb-1">
                अपनी छठ की यादें साझा करें
              </h3>
              <p className="text-xs text-amber-300/70 mb-3 font-outfit">
                Share your childhood or family memories of Chhath Puja.
              </p>

              <form onSubmit={handleAddMemory} className="space-y-2.5">
                <div>
                  <label className="block text-xs text-stone-300 mb-1 font-outfit">
                    संस्मरण / याद (Hindi or Bhojpuri) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={userHindi}
                    onChange={(e) => setUserHindi(e.target.value)}
                    placeholder="जैसे: सुबह 3 बजे गंगा घाट पर गूंजते शारदा सिन्हा के गीत और ठंडे पानी की सिहरन..."
                    className="w-full rounded-xl bg-stone-900/80 border border-amber-500/30 px-3 py-2 text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-amber-400 placeholder:text-stone-500 font-outfit"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1 font-outfit">
                    English Meaning / Reflection (Optional)
                  </label>
                  <input
                    type="text"
                    value={userEnglish}
                    onChange={(e) => setUserEnglish(e.target.value)}
                    placeholder="Brief English translation or feeling..."
                    className="w-full rounded-xl bg-stone-900/80 border border-amber-500/30 px-3 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400 placeholder:text-stone-500 font-outfit"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-300 mb-1 font-outfit">
                    आपका नाम / स्थान (Your Name or City)
                  </label>
                  <input
                    type="text"
                    value={userAuthor}
                    onChange={(e) => setUserAuthor(e.target.value)}
                    placeholder="उदा. पटना, बिहार / Ayush"
                    className="w-full rounded-xl bg-stone-900/80 border border-amber-500/30 px-3 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400 placeholder:text-stone-500 font-outfit"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs font-outfit transition-colors"
                  >
                    रद्द करें (Cancel)
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold text-xs font-outfit flex items-center gap-1.5 hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>यादें जोड़ें (Pin Memory)</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
