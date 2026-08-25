import React from 'react';
import { Sun, Sunset, Moon, Sparkles, Flame, Info, Music, MapPin } from 'lucide-react';
import { TimeOfDay } from '../types';
import { playWaterRipple } from '../utils/audioSynth';

interface HeaderNavProps {
  timeOfDay: TimeOfDay;
  onTimeChange: (time: TimeOfDay) => void;
  onOpenAbout: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  timeOfDay,
  onTimeChange,
  onOpenAbout
}) => {
  const handleTimeSelect = (t: TimeOfDay) => {
    onTimeChange(t);
    playWaterRipple(0.3);
  };

  return (
    <header className="relative w-full max-w-6xl mx-auto pt-2 sm:pt-3 pb-1 px-3 sm:px-4 flex flex-col items-center justify-between gap-1.5 z-20 shrink-0">
      <div className="w-full flex items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-stone-300">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-950/80 border border-amber-500/30 backdrop-blur-md shadow-md">
          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="text-amber-200 uppercase font-semibold tracking-wider">
            PATNA GHAT • 04:15 AM
          </span>
          <span className="hidden sm:inline text-amber-400/60">• 18°C</span>
        </div>

        {/* Center: Folk Lyric Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/25 text-amber-200 text-xs font-hindi-display tracking-wide">
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
          <span>पहिले पहिल हम कईनी छठी मईया बरत तोहार...</span>
        </div>

        {/* Right: Vow & Lore Trigger */}
        <div className="flex items-center gap-1.5">
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-950/80 border border-amber-500/20 text-stone-300">
            <Flame className="w-3 h-3 text-orange-400" />
            <span className="text-stone-300">36H NIRJALA</span>
          </div>

          <button
            onClick={onOpenAbout}
            className="px-2.5 py-1 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-amber-500/30 text-amber-200 text-[11px] font-outfit flex items-center gap-1 transition-all shadow-md active:scale-95"
            title="Read about the cultural significance and traditions of Chhath Puja"
          >
            <Info className="w-3 h-3 text-amber-400" />
            <span>महात्म्य (Lore)</span>
          </button>
        </div>
      </div>

      {/* Main Header Title & Time-of-Day Switcher */}
      <div className="w-full flex items-center justify-between gap-2 pt-0.5">
        {/* Title Branding */}
        <div className="flex items-baseline gap-2">
          <h1 className="font-hindi-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-100 via-amber-200 to-amber-500 bg-clip-text text-transparent drop-shadow-md">
            छठ महापर्व
          </h1>
          <span className="text-[10px] sm:text-xs font-outfit text-amber-300/80 tracking-wider uppercase hidden sm:inline">
            A Nostalgic Tribute
          </span>
        </div>

        {/* Time of Day Atmospheric Switcher */}
        <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-xl bg-stone-950/80 border border-amber-500/25 backdrop-blur-lg shadow-lg">
          <button
            onClick={() => handleTimeSelect('dawn')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-outfit flex items-center gap-1 transition-all ${
              timeOfDay === 'dawn'
                ? 'bg-amber-500/30 text-amber-200 font-semibold border border-amber-400/40 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Dawn / Usha Arghya (उषा अर्घ्य)"
          >
            <Sun className="w-3 h-3 text-amber-400" />
            <span>उषा</span>
          </button>

          <button
            onClick={() => handleTimeSelect('dusk')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-outfit flex items-center gap-1 transition-all ${
              timeOfDay === 'dusk'
                ? 'bg-rose-500/30 text-rose-200 font-semibold border border-rose-400/40 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Dusk / Sandhya Arghya (संध्या अर्घ्य)"
          >
            <Sunset className="w-3 h-3 text-rose-400" />
            <span>संध्या</span>
          </button>

          <button
            onClick={() => handleTimeSelect('midnight')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-outfit flex items-center gap-1 transition-all ${
              timeOfDay === 'midnight'
                ? 'bg-indigo-500/30 text-indigo-200 font-semibold border border-indigo-400/40 shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="Midnight Vigil (मध्यरात्रि)"
          >
            <Moon className="w-3 h-3 text-indigo-400" />
            <span>रात्रि</span>
          </button>
        </div>
      </div>
    </header>
  );
};
