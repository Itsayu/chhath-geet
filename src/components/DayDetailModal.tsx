import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Utensils, Calendar, Flame, Sun, Waves, Heart } from 'lucide-react';
import { ChhathDay } from '../types';

interface DayDetailModalProps {
  day: ChhathDay | null;
  onClose: () => void;
}

export const DayDetailModal: React.FC<DayDetailModalProps> = ({ day, onClose }) => {
  if (!day) return null;

  const getDayIcon = (id: number) => {
    switch (id) {
      case 1: return <Waves className="w-5 h-5 text-amber-400" />;
      case 2: return <Flame className="w-5 h-5 text-orange-400" />;
      case 3: return <Sun className="w-5 h-5 text-rose-400" />;
      case 4: return <Sparkles className="w-5 h-5 text-yellow-400" />;
      default: return <Sun className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel-amber p-5 sm:p-7 rounded-3xl border border-amber-400/40 shadow-2xl text-stone-100"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-stone-100 bg-stone-900/60 hover:bg-stone-800 border border-stone-700 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shadow-lg">
              {getDayIcon(day.id)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-outfit uppercase tracking-wider font-semibold">
                  {day.datePhase}
                </span>
                <span className="text-xs text-stone-400 font-outfit">
                  Day {day.id} of 4
                </span>
              </div>
              <h2 className="font-hindi-display text-2xl sm:text-3xl text-amber-100 mt-0.5">
                {day.hindiName} <span className="font-outfit text-base text-amber-300/80 font-normal">({day.englishName})</span>
              </h2>
            </div>
          </div>

          {/* Tagline / Vow Note */}
          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/25 mb-4 text-xs sm:text-sm font-outfit text-amber-200/90 italic">
            "{day.tagline}"
          </div>

          {/* Special Memory */}
          <div className="mb-4 p-3.5 rounded-2xl bg-stone-900/70 border border-amber-500/20 flex items-start gap-2.5">
            <Heart className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-outfit">घाट की अनुभूति (Memory)</span>
              <p className="text-xs sm:text-sm text-stone-200 font-kalam mt-0.5">
                "{day.specialMemory}"
              </p>
            </div>
          </div>

          {/* Rituals & Mahaprasad Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {/* Rituals */}
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-amber-500/20 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-outfit flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>मुख्य अनुष्ठान (Sacred Rituals)</span>
              </h4>
              <ul className="space-y-2">
                {day.rituals.map((r, idx) => (
                  <li key={idx} className="text-xs text-stone-300 font-outfit flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">◆</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Holy Prasad */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/25 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-outfit flex items-center gap-1.5 mb-2">
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  <span>महाप्रसाद (Holy Prasad)</span>
                </h4>
                <p className="text-xs sm:text-sm text-amber-100 font-hindi-display leading-relaxed">
                  {day.prasad}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-amber-500/20 text-[11px] text-stone-400 font-outfit">
                🌾 पूर्णतः पवित्र, आम की लकड़ी के चूल्हे, पीतल/मिट्टी के बर्तनों में निर्मित।
              </div>
            </div>
          </div>

          {/* Footer Close */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold text-xs sm:text-sm shadow-lg hover:from-amber-400 hover:to-orange-400 transition-all font-outfit"
            >
              छठी मईया की जय (Close)
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
