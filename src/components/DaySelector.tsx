import React from 'react';
import { Sparkles, Flame, Sun, Waves, Info } from 'lucide-react';
import { ChhathDay } from '../types';
import { CHHATH_DAYS } from '../data/chhathData';
import { playTempleBell } from '../utils/audioSynth';

interface DaySelectorProps {
  activeDayId: number;
  onSelectDay: (day: ChhathDay) => void;
  onOpenDetail?: (day: ChhathDay) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  activeDayId,
  onSelectDay,
  onOpenDetail
}) => {
  const getDayIcon = (id: number) => {
    switch (id) {
      case 1: return <Waves className="w-3.5 h-3.5" />;
      case 2: return <Flame className="w-3.5 h-3.5" />;
      case 3: return <Sun className="w-3.5 h-3.5" />;
      case 4: return <Sparkles className="w-3.5 h-3.5" />;
      default: return <Sun className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2 z-10 shrink-0">
      {/* Floating 4-Day Pill Bar */}
      <div className="flex items-center justify-between sm:justify-center gap-1.5 sm:gap-2 p-1 rounded-2xl glass-panel-amber border border-amber-500/25 shadow-xl backdrop-blur-xl">
        {CHHATH_DAYS.map((day) => {
          const isSelected = day.id === activeDayId;
          return (
            <div key={day.id} className="relative flex items-center">
              <button
                onClick={() => {
                  onSelectDay(day);
                  playTempleBell(0.35);
                  if (onOpenDetail && isSelected) {
                    onOpenDetail(day);
                  }
                }}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl font-hindi-display text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold shadow-md shadow-amber-500/25 scale-[1.02] border border-amber-300'
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/60'
                }`}
                title={`Day ${day.id}: ${day.hindiName} (${day.englishName}) - Click to switch or view rituals`}
              >
                <span className={isSelected ? 'text-stone-950' : 'text-amber-400'}>
                  {getDayIcon(day.id)}
                </span>
                <span className="truncate">{day.hindiName}</span>
              </button>

              {/* Quick Info trigger icon on active day */}
              {isSelected && onOpenDetail && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetail(day);
                  }}
                  className="ml-0.5 p-1 rounded-lg bg-black/30 hover:bg-black/60 text-amber-200 text-[10px] transition-colors"
                  title="View detailed rituals and prasad for this day"
                >
                  <Info className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
