import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Flame } from 'lucide-react';
import { GhatObject, TimeOfDay } from '../types';
import { SACRED_SOOP_OBJECTS } from '../data/chhathData';
import { playTempleBell } from '../utils/audioSynth';

interface CentralSoopVisualProps {
  timeOfDay: TimeOfDay;
  onOfferPrasad?: () => void;
}

export const CentralSoopVisual: React.FC<CentralSoopVisualProps> = ({
  timeOfDay,
  onOfferPrasad
}) => {
  const [selectedObject, setSelectedObject] = useState<GhatObject | null>(null);
  const [isBlessed, setIsBlessed] = useState(false);
  const [blessingCount, setBlessingCount] = useState(108);

  const handleItemClick = (id: string) => {
    const item = SACRED_SOOP_OBJECTS.find(o => o.id === id);
    if (item) {
      setSelectedObject(item);
      playTempleBell(0.4);
    }
  };

  const handleBlessingTouch = () => {
    setIsBlessed(true);
    setBlessingCount(prev => prev + 1);
    playTempleBell(0.6);
    if (onOfferPrasad) onOfferPrasad();
    setTimeout(() => setIsBlessed(false), 2400);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-1 select-none shrink-1">
      {/* Background Celestial Sun / Moon Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full pointer-events-none transition-all duration-1000 ease-in-out">
        {timeOfDay === 'dawn' && (
          <div className="w-full h-full rounded-full bg-gradient-to-t from-amber-500/20 via-orange-500/25 to-yellow-300/30 blur-3xl animate-sun-pulse" />
        )}
        {timeOfDay === 'dusk' && (
          <div className="w-full h-full rounded-full bg-gradient-to-t from-red-600/20 via-rose-500/25 to-amber-500/30 blur-3xl animate-sun-pulse" />
        )}
        {timeOfDay === 'midnight' && (
          <div className="w-full h-full rounded-full bg-gradient-to-t from-indigo-600/15 via-blue-500/20 to-amber-300/15 blur-3xl" />
        )}
      </div>

      {/* Main Sacred Object Container (Responsively constrained height to guarantee zero scroll) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[440px] max-h-[34vh] sm:max-h-[38vh] md:max-h-[42vh] aspect-square flex items-center justify-center"
      >
        {/* Sugarcane Arch Canopy (ईख की छतरी / मंडप) + Daura + Diya + Thekua */}
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="caneGradLeft" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#2d4a1d" />
              <stop offset="50%" stopColor="#4d7c2a" />
              <stop offset="100%" stopColor="#70a83b" />
            </linearGradient>

            <linearGradient id="caneGradRight" x1="100%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#2d4a1d" />
              <stop offset="50%" stopColor="#4d7c2a" />
              <stop offset="100%" stopColor="#70a83b" />
            </linearGradient>

            <linearGradient id="basketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            <linearGradient id="thekuaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="60%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#5c2409" />
            </linearGradient>

            <radialGradient id="sunbeamAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="diyaGlowRadial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="25%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>

            <pattern id="bambooWeave" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M0 8 L16 8 M8 0 L8 16" stroke="#92400e" strokeWidth="1.5" opacity="0.6" />
              <path d="M0 0 L16 16 M16 0 L0 16" stroke="#78350f" strokeWidth="0.8" opacity="0.4" />
            </pattern>
          </defs>

          {/* 1. Sacred Mandap Sugarcane Stalks */}
          <g id="sugarcane-group" className="cursor-pointer group" onClick={() => handleItemClick('sugarcane')}>
            {/* Left Sugarcanes */}
            <path
              d="M 60 450 Q 140 160 250 80"
              fill="none"
              stroke="url(#caneGradLeft)"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 110 460 Q 170 190 250 80"
              fill="none"
              stroke="url(#caneGradLeft)"
              strokeWidth="9"
              strokeLinecap="round"
            />

            {/* Right Sugarcanes */}
            <path
              d="M 440 450 Q 360 160 250 80"
              fill="none"
              stroke="url(#caneGradRight)"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 390 460 Q 330 190 250 80"
              fill="none"
              stroke="url(#caneGradRight)"
              strokeWidth="9"
              strokeLinecap="round"
            />

            {/* Center Sugar Cane */}
            <path
              d="M 250 460 L 250 75"
              fill="none"
              stroke="url(#caneGradLeft)"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Sugarcane Segment Rings & Knots */}
            {[140, 200, 260, 320, 380].map((y, idx) => (
              <g key={`knot-${idx}`}>
                <ellipse cx={250} cy={y} rx="5" ry="2" fill="#1b3011" />
                <ellipse cx={120 + idx * 24} cy={y + 10} rx="6" ry="3" fill="#1b3011" />
                <ellipse cx={380 - idx * 24} cy={y + 10} rx="6" ry="3" fill="#1b3011" />
              </g>
            ))}

            {/* Red Sacred Thread Knot at Top (मौली / कलावा) */}
            <g transform="translate(250, 80)">
              <circle cx="0" cy="0" r="14" fill="#dc2626" />
              <circle cx="0" cy="0" r="9" fill="#facc15" />
              <path d="M 0 0 Q -50 -70 -90 -40" fill="none" stroke="#65a30d" strokeWidth="5" strokeLinecap="round" />
              <path d="M 0 0 Q -20 -90 -40 -120" fill="none" stroke="#84cc16" strokeWidth="6" strokeLinecap="round" />
              <path d="M 0 0 Q 0 -100 0 -135" fill="none" stroke="#4d7c0f" strokeWidth="6" strokeLinecap="round" />
              <path d="M 0 0 Q 20 -90 40 -120" fill="none" stroke="#84cc16" strokeWidth="6" strokeLinecap="round" />
              <path d="M 0 0 Q 50 -70 90 -40" fill="none" stroke="#65a30d" strokeWidth="5" strokeLinecap="round" />
            </g>
          </g>

          {/* 2. Main Bamboo Daura & Soop Basket */}
          <g id="soop-group" className="cursor-pointer" onClick={() => handleItemClick('supa')}>
            {/* Basket Shadow */}
            <ellipse cx="250" cy="425" rx="180" ry="40" fill="rgba(0,0,0,0.5)" />

            {/* Outer Daura Oval Lip */}
            <ellipse cx="250" cy="380" rx="160" ry="58" fill="url(#basketGrad)" stroke="#78350f" strokeWidth="4" />
            {/* Basket Texture Fill */}
            <ellipse cx="250" cy="380" rx="156" ry="54" fill="url(#bambooWeave)" />

            {/* Red Sindoor Sacred Border Lines on Soop */}
            <path
              d="M 120 375 Q 250 410 380 375"
              fill="none"
              stroke="#b91c1c"
              strokeWidth="4"
              strokeDasharray="6,4"
            />
          </g>

          {/* 3. Sacred Produce on the Soop */}

          {/* Bananas Bunch */}
          <g transform="translate(145, 335) rotate(-15)">
            <path d="M 0 0 Q 30 15 60 5 Q 35 30 0 18 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
            <path d="M 5 -12 Q 35 3 65 -7 Q 40 18 5 6 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <path d="M 10 12 Q 40 27 70 17 Q 45 42 10 30 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="62" cy="5" r="2.5" fill="#713f12" />
          </g>

          {/* Large Daabh Pomelo Lemon */}
          <g
            id="daabh-group"
            className="cursor-pointer transition-transform hover:scale-105"
            transform="translate(325, 350)"
            onClick={(e) => { e.stopPropagation(); handleItemClick('daabh-nimbu'); }}
          >
            <ellipse cx="0" cy="0" rx="26" ry="24" fill="#a3e635" stroke="#65a30d" strokeWidth="2" />
            <ellipse cx="-4" cy="-3" rx="22" ry="20" fill="#bef264" />
            <circle cx="0" cy="-22" r="3.5" fill="#4d7c0f" />
            <circle cx="-2" cy="-4" r="5" fill="#dc2626" />
          </g>

          {/* Coconut with Red Sacred Thread */}
          <g transform="translate(295, 320)">
            <ellipse cx="0" cy="0" rx="22" ry="25" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <path d="M -5 -25 L 0 -34 L 5 -25 Z" fill="#451a03" />
            <circle cx="0" cy="0" r="7" fill="#dc2626" />
            <circle cx="0" cy="0" r="3.5" fill="#facc15" />
          </g>

          {/* Fresh Ginger & Turmeric Roots */}
          <g transform="translate(195, 335)">
            <path d="M -15 10 Q -5 -5 10 8 Q 20 -2 30 12" fill="none" stroke="#d97706" strokeWidth="8" strokeLinecap="round" />
            <path d="M -5 -5 Q -15 -25 -25 -35" fill="none" stroke="#65a30d" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* 4. Fresh Golden Thekua */}
          <g
            id="thekua-group"
            className="cursor-pointer transition-transform hover:scale-110"
            transform="translate(215, 368)"
            onClick={(e) => { e.stopPropagation(); handleItemClick('thekua'); }}
          >
            <ellipse cx="0" cy="0" rx="28" ry="18" fill="url(#thekuaGrad)" stroke="#451a03" strokeWidth="1.5" />
            <path d="M -18 0 L 18 0 M -8 -8 L -3 0 M 4 -8 L 9 0 M -8 8 L -3 0 M 4 8 L 9 0" stroke="#fde68a" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />

            <g transform="translate(42, -6) rotate(12)">
              <ellipse cx="0" cy="0" rx="26" ry="16" fill="url(#thekuaGrad)" stroke="#451a03" strokeWidth="1.5" />
              <path d="M -16 0 L 16 0 M -6 -6 L -2 0 M 4 -6 L 8 0 M -6 6 L -2 0 M 4 6 L 8 0" stroke="#fde68a" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
            </g>

            <g transform="translate(-32, 4) rotate(-15)">
              <ellipse cx="0" cy="0" rx="24" ry="15" fill="url(#thekuaGrad)" stroke="#451a03" strokeWidth="1.5" />
              <path d="M -14 0 L 14 0 M -5 -5 L -1 0 M 3 -5 L 7 0" stroke="#fde68a" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
            </g>
          </g>

          {/* 5. Centerpiece Sacred Terracotta Diya with Glowing Flame */}
          <g
            id="diya-group"
            className="cursor-pointer"
            transform="translate(250, 345)"
            onClick={(e) => { e.stopPropagation(); handleItemClick('diya'); }}
          >
            <circle cx="0" cy="-28" r="48" fill="url(#diyaGlowRadial)" className="animate-pulse" />

            <path
              d="M -30 0 C -25 18, 25 18, 30 0 C 18 -6, -18 -6, -30 0 Z"
              fill="#9a3412"
              stroke="#431407"
              strokeWidth="2"
            />
            <ellipse cx="0" cy="-1" rx="20" ry="6" fill="#d97706" />

            {/* Radiant Flame */}
            <g className="animate-flame">
              <path
                d="M -6 -4 Q 0 -38 0 -44 Q 8 -26 6 -4 Z"
                fill="#ef4444"
              />
              <path
                d="M -4 -4 Q 0 -32 0 -38 Q 5 -20 4 -4 Z"
                fill="#fbbf24"
              />
              <path
                d="M -2 -4 Q 0 -22 0 -26 Q 2 -14 2 -4 Z"
                fill="#ffffff"
              />
            </g>
          </g>

          {/* 6. Pure Brass Arghya Kalash */}
          <g
            id="kalash-group"
            className="cursor-pointer transition-transform hover:scale-105"
            transform="translate(370, 395)"
            onClick={(e) => { e.stopPropagation(); handleItemClick('arghya-lota'); }}
          >
            <ellipse cx="0" cy="18" rx="22" ry="12" fill="#ca8a04" stroke="#854d0e" strokeWidth="2" />
            <path d="M -18 16 Q -24 -2 0 -12 Q 24 -2 18 16 Z" fill="#eab308" stroke="#a16207" strokeWidth="2" />
            <ellipse cx="0" cy="-12" rx="14" ry="5" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
            <ellipse cx="0" cy="-13" rx="11" ry="3.5" fill="#ffffff" opacity="0.9" />
            <circle cx="0" cy="2" r="4.5" fill="#dc2626" />
          </g>

          {/* Hotspot Ping */}
          <g transform="translate(250, 305)">
            <circle cx="0" cy="0" r="10" fill="rgba(245, 158, 11, 0.4)" className="animate-ping" />
            <circle cx="0" cy="0" r="4" fill="#fbbf24" />
          </g>
        </svg>

        {/* Floating Touch for Blessing Button */}
        <div
          onClick={handleBlessingTouch}
          className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full glass-panel-amber border border-amber-400/40 shadow-xl cursor-pointer hover:border-amber-300 transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span className="text-[11px] sm:text-xs font-medium text-amber-100 font-outfit">
            {isBlessed ? '✨ छठी मईया के आशीर्वाद मिलल!' : 'दउरा छूकर आशीर्वाद लें (Touch for Blessing)'}
          </span>
          <span className="text-[10px] bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded-full font-mono">
            {blessingCount} 🙏
          </span>
        </div>
      </motion.div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedObject && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed inset-x-3 top-16 sm:top-20 max-w-lg mx-auto z-50 glass-panel-amber p-5 rounded-2xl border border-amber-400/40 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-hindi-display text-lg sm:text-xl text-amber-100">
                    {selectedObject.nameHindi}
                  </h3>
                  <p className="text-[11px] font-outfit text-amber-300/80">
                    {selectedObject.nameEnglish}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedObject(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-outfit mb-2.5">
              {selectedObject.description}
            </p>

            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/20 text-[11px] sm:text-xs text-amber-200/90 font-outfit mb-3">
              <strong className="text-amber-400">सांस्कृतिक महत्व: </strong>
              {selectedObject.culturalSignificance}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedObject(null);
                  handleBlessingTouch();
                }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-medium text-xs shadow-lg flex items-center gap-1 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>प्रसाद ग्रहण करें व नमन करें</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
