import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Bell, Wind, Droplet, Sparkles, Cookie } from 'lucide-react';
import { playTempleBell, playShankh, playWaterRipple } from '../utils/audioSynth';

interface InteractiveRitualsProps {
  onSpawnDiya: () => void;
  onOfferArghya: () => void;
}

export const InteractiveRituals: React.FC<InteractiveRitualsProps> = ({
  onSpawnDiya,
  onOfferArghya
}) => {
  const [arghyaActive, setArghyaActive] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const [shankhBlowing, setShankhBlowing] = useState(false);
  const [thekuaTasting, setThekuaTasting] = useState(false);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        triggerDiya();
      } else if (e.key === 'b' || e.key === 'B') {
        triggerBell();
      } else if (e.key === 's' || e.key === 'S') {
        triggerShankh();
      } else if (e.key === 'a' || e.key === 'A') {
        triggerArghya();
      } else if (e.key === 't' || e.key === 'T') {
        triggerThekua();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerDiya = () => {
    onSpawnDiya();
  };

  const triggerBell = () => {
    setBellRinging(true);
    playTempleBell(0.7);
    setTimeout(() => setBellRinging(false), 1500);
  };

  const triggerShankh = () => {
    setShankhBlowing(true);
    playShankh(0.65);
    setTimeout(() => setShankhBlowing(false), 2800);
  };

  const triggerArghya = () => {
    setArghyaActive(true);
    playTempleBell(0.5);
    playWaterRipple(0.4);
    onOfferArghya();
    setTimeout(() => setArghyaActive(false), 2500);
  };

  const triggerThekua = () => {
    setThekuaTasting(true);
    playWaterRipple(0.3);
    setTimeout(() => setThekuaTasting(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2 z-10 shrink-0">
      {/* Compact Interactive HUD Bar */}
      <div className="rounded-2xl glass-panel-amber px-2.5 py-1.5 border border-amber-400/25 shadow-xl flex items-center justify-between sm:justify-center gap-1 sm:gap-2">
        {/* Float Diya Button */}
        <button
          onClick={triggerDiya}
          className="px-2 sm:px-3 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/30 border border-amber-400/30 text-amber-100 text-[11px] sm:text-xs font-medium flex items-center gap-1 transition-all active:scale-95 group"
          title="Press [SPACE] or Click to float a sacred Diya on the river"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>दीप दान</span>
          <span className="hidden md:inline text-[9px] px-1 py-0.2 rounded bg-black/40 text-amber-300 font-mono">
            SPACE
          </span>
        </button>

        {/* Offer Arghya Button */}
        <button
          onClick={triggerArghya}
          className="px-2 sm:px-3 py-1 rounded-xl bg-orange-500/15 hover:bg-orange-500/30 border border-orange-400/30 text-orange-100 text-[11px] sm:text-xs font-medium flex items-center gap-1 transition-all active:scale-95 group"
          title="Press [A] to offer sacred milk & Ganga water Arghya"
        >
          <Droplet className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
          <span>सूर्य अर्घ्य</span>
          <span className="hidden md:inline text-[9px] px-1 py-0.2 rounded bg-black/40 text-orange-300 font-mono">
            A
          </span>
        </button>

        {/* Ring Bell Button */}
        <button
          onClick={triggerBell}
          className={`px-2 sm:px-3 py-1 rounded-xl bg-yellow-500/15 hover:bg-yellow-500/30 border border-yellow-400/30 text-yellow-100 text-[11px] sm:text-xs font-medium flex items-center gap-1 transition-all active:scale-95 group ${
            bellRinging ? 'ring-2 ring-yellow-400 animate-bounce' : ''
          }`}
          title="Press [B] to ring the sacred brass temple bell"
        >
          <Bell className={`w-3.5 h-3.5 text-yellow-400 ${bellRinging ? 'animate-spin' : ''}`} />
          <span>घंटी</span>
          <span className="hidden md:inline text-[9px] px-1 py-0.2 rounded bg-black/40 text-yellow-300 font-mono">
            B
          </span>
        </button>

        {/* Shankh Naad Button */}
        <button
          onClick={triggerShankh}
          className={`px-2 sm:px-3 py-1 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 border border-rose-400/30 text-rose-100 text-[11px] sm:text-xs font-medium flex items-center gap-1 transition-all active:scale-95 group ${
            shankhBlowing ? 'ring-2 ring-rose-400 scale-105' : ''
          }`}
          title="Press [S] for sacred Shankh (conch) sound"
        >
          <Wind className={`w-3.5 h-3.5 text-rose-400 ${shankhBlowing ? 'animate-pulse' : ''}`} />
          <span>शंखनाद</span>
          <span className="hidden md:inline text-[9px] px-1 py-0.2 rounded bg-black/40 text-rose-300 font-mono">
            S
          </span>
        </button>

        {/* Thekua Prasad Button */}
        <button
          onClick={triggerThekua}
          className="px-2 sm:px-3 py-1 rounded-xl bg-amber-600/15 hover:bg-amber-600/30 border border-amber-500/30 text-amber-100 text-[11px] sm:text-xs font-medium flex items-center gap-1 transition-all active:scale-95 group"
          title="Press [T] to receive Thekua Mahaprasad"
        >
          <Cookie className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>ठेकुआ</span>
          <span className="hidden md:inline text-[9px] px-1 py-0.2 rounded bg-black/40 text-amber-300 font-mono">
            T
          </span>
        </button>
      </div>

      {/* Visual Overlay Effects */}
      <AnimatePresence>
        {arghyaActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center bg-radial from-amber-400/25 via-orange-500/10 to-transparent"
          >
            <motion.div
              initial={{ scale: 0.7, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="text-center px-6 py-4 rounded-3xl glass-panel-amber border border-amber-300 shadow-2xl"
            >
              <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-gradient-to-t from-amber-500 to-yellow-300 flex items-center justify-center text-stone-950 shadow-lg animate-pulse">
                <Sparkles className="w-7 h-7" />
              </div>
              <h2 className="font-hindi-display text-2xl sm:text-3xl text-amber-100 mb-1">
                ॐ सूर्याय नमः • अर्घ्य समर्पित
              </h2>
              <p className="font-kalam text-amber-300 text-sm">
                भगवान भास्कर आपकी सभी मनोकामनाएं पूर्ण करें...
              </p>
            </motion.div>
          </motion.div>
        )}

        {thekuaTasting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-40 px-4 py-2 rounded-2xl glass-panel-amber border border-amber-400/60 shadow-xl text-center"
          >
            <div className="font-hindi-display text-sm text-amber-100 flex items-center gap-1.5 justify-center">
              <span>🌾 शुद्ध घी व गुड़ के ठेकुआ का महाप्रसाद!</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
