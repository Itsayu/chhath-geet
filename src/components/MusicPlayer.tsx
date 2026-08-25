import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ListMusic,
  ExternalLink,
  Waves,
  Disc3,
  X
} from 'lucide-react';
import { FolkTrack } from '../types';
import { FOLK_TRACKS } from '../data/chhathData';
import { toggleAmbientRiver, playWaterRipple } from '../utils/audioSynth';

interface MusicPlayerProps {
  tracks?: FolkTrack[];
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  tracks = FOLK_TRACKS
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [durationSec, setDurationSec] = useState(380);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(false);
  const [ambientGhatEnabled, setAmbientGhatEnabled] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec(prev => {
          if (prev >= durationSec) {
            handleNext();
            return 0;
          }
          const next = prev + 1;
          setProgress((next / durationSec) * 100);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, durationSec]);

  const handleToggleAmbient = () => {
    const nextState = !ambientGhatEnabled;
    setAmbientGhatEnabled(nextState);
    toggleAmbientRiver(nextState, (volume / 100) * 0.25);
  };

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
    playWaterRipple(0.2);
  };

  const handleNext = () => {
    setCurrentTrackIndex(prev => (prev + 1) % tracks.length);
    setCurrentTimeSec(0);
    setProgress(0);
    setIsPlaying(true);
    playWaterRipple(0.3);
  };

  const handlePrev = () => {
    setCurrentTrackIndex(prev => (prev - 1 + tracks.length) % tracks.length);
    setCurrentTimeSec(0);
    setProgress(0);
    setIsPlaying(true);
    playWaterRipple(0.3);
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTimeSec(0);
    setProgress(0);
    setIsPlaying(true);
    setShowPlaylistDrawer(false);
    playWaterRipple(0.3);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProg = parseFloat(e.target.value);
    setProgress(newProg);
    setCurrentTimeSec(Math.floor((newProg / 100) * durationSec));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const playlistUrl = 'https://youtube.com/playlist?list=PLPlNvrjDXABmd-q-lwgFguM7hjuRWUm7J&si=JLg5tKjsgqjzxikz';

  return (
    <div className="relative w-full z-40 px-2 sm:px-4 pb-1.5 pt-0 shrink-0 pointer-events-auto select-none">
      {/* Hidden YouTube Iframe Player */}
      <div className="hidden">
        <iframe
          ref={iframeRef}
          width="200"
          height="200"
          src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?enablejsapi=1&autoplay=${isPlaying ? '1' : '0'}&list=PLPlNvrjDXABmd-q-lwgFguM7hjuRWUm7J`}
          title="Chhath Puja YouTube Playlist Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {/* Playlist Drawer Modal */}
      <AnimatePresence>
        {showPlaylistDrawer && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed inset-x-3 bottom-16 max-w-xl mx-auto z-50 rounded-2xl glass-panel-amber p-4 border border-amber-400/40 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-500/20">
              <div>
                <h4 className="font-hindi-display text-base sm:text-lg text-amber-100">
                  छठी मईया के पावन लोकगीत (Playlist)
                </h4>
                <p className="text-[11px] text-amber-300/80 font-outfit">
                  Dr. Sharda Sinha, Anuradha Paudwal, Bharat Sharma
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={playlistUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-amber-300 hover:text-amber-100 flex items-center gap-1 font-outfit underline underline-offset-2"
                >
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => setShowPlaylistDrawer(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {tracks.map((track, idx) => {
                const isSelected = idx === currentTrackIndex;
                return (
                  <div
                    key={track.id}
                    onClick={() => handleSelectTrack(idx)}
                    className={`p-2 rounded-xl flex items-center justify-between gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/25 border border-amber-400/50 text-amber-100'
                        : 'hover:bg-stone-800/60 text-stone-300 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[11px] font-mono text-amber-400/70 w-4">
                        {isSelected ? '▶' : `${idx + 1}`}
                      </span>
                      <div className="min-w-0">
                        <p className="font-hindi-display text-xs truncate text-amber-50">
                          {track.titleHindi}
                        </p>
                        <p className="text-[10px] text-stone-400 truncate font-outfit">
                          {track.singer}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-stone-400 shrink-0">
                      {track.duration}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bottom Glass Player Bar */}
      <div className="w-full max-w-5xl mx-auto rounded-2xl glass-panel-amber px-3 py-2 border border-amber-400/35 shadow-2xl backdrop-blur-2xl flex flex-col gap-1">
        {/* Track Progress Mini Bar */}
        <div className="relative w-full flex items-center gap-2">
          <span className="text-[9px] font-mono text-stone-400 w-7 text-right">
            {formatTime(currentTimeSec)}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <span className="text-[9px] font-mono text-stone-400 w-7">
            {formatTime(durationSec)}
          </span>
        </div>

        {/* Player Controls & Track Info Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Left: Disc Icon & Track Metadata */}
          <div className="flex items-center gap-2 min-w-0 max-w-[42%] sm:max-w-[36%]">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 shrink-0 shadow-md ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
              <div className="w-full h-full rounded-[6px] bg-stone-950 flex items-center justify-center text-amber-300">
                <Disc3 className="w-4 h-4" />
              </div>
            </div>

            <div className="min-w-0">
              <h4 className="font-hindi-display text-xs text-amber-100 truncate leading-snug">
                {currentTrack.titleHindi}
              </h4>
              <p className="text-[10px] text-amber-300/80 truncate font-outfit">
                {currentTrack.singer}
              </p>
            </div>
          </div>

          {/* Center: Playback Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg text-stone-300 hover:text-amber-200 hover:bg-stone-800/50 transition-colors"
              title="Previous Track"
              aria-label="Previous Track"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handlePlayPause}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/25 transition-transform active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg text-stone-300 hover:text-amber-200 hover:bg-stone-800/50 transition-colors"
              title="Next Track"
              aria-label="Next Track"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Ambient Sound, Volume, & Playlist Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Ambient Water Toggle */}
            <button
              onClick={handleToggleAmbient}
              className={`px-2 py-1 rounded-lg border text-[10px] flex items-center gap-1 transition-all ${
                ambientGhatEnabled
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-sm'
                  : 'bg-stone-900/50 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
              title="Toggle Ghat Ambient River Sound"
            >
              <Waves className={`w-3 h-3 ${ambientGhatEnabled ? 'animate-pulse text-amber-300' : ''}`} />
              <span className="hidden sm:inline font-outfit">Ambient</span>
            </button>

            {/* Volume Control (Desktop) */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => setIsMuted(prev => !prev)}
                className="text-stone-400 hover:text-amber-200"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseInt(e.target.value));
                  setIsMuted(false);
                }}
                className="w-12 h-1 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Playlist Drawer Button */}
            <button
              onClick={() => setShowPlaylistDrawer(prev => !prev)}
              className={`p-1.5 rounded-lg border transition-all ${
                showPlaylistDrawer
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                  : 'bg-stone-900/50 border-stone-800 text-stone-300 hover:text-amber-200'
              }`}
              title="View Playlist"
            >
              <ListMusic className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
