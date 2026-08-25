/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import minimalDiyasGhat from './assets/images/chhath_minimal_diyas_ghat_1787662374877.jpg';
import dawnDevoteesGhat from './assets/images/chhath_dawn_devotees_ghat_1787662402790.jpg';
import villageMorningGhat from './assets/images/chhath_village_morning_ghat_1787662414720.jpg';
import crowdGhat from './assets/images/chhath_crowd_ghat_1787661972400.jpg';
import festiveGhat from './assets/images/chhath_ghat_festive_1787661998119.jpg';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Sparkles,
  Layers
} from 'lucide-react';
import { toggleAmbientRiver } from './utils/audioSynth';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const ARTWORKS = [
  {
    id: 'minimal-diyas-ghat',
    name: 'Dawn Ghat (Few Diyas)',
    src: minimalDiyasGhat,
    desc: 'Full-bleed borderless, devotees crowd, only few glowing diyas'
  },
  {
    id: 'dawn-devotees-ghat',
    name: 'Morning Arghya Crowd',
    src: dawnDevoteesGhat,
    desc: 'Striking red pavilion, diagonal sunbeam, cobalt sky & banana palms'
  },
  {
    id: 'village-morning-ghat',
    name: 'Village Ghat Rituals',
    src: villageMorningGhat,
    desc: 'Bustling steps, women with bamboo soop, calm reflective water'
  },
  {
    id: 'crowd-ghat',
    name: 'Festive Gathering',
    src: crowdGhat,
    desc: 'Edge-to-edge vibrant colors, rich crowd & zero borders'
  },
  {
    id: 'festive-ghat',
    name: 'Sunrise Puja Steps',
    src: festiveGhat,
    desc: 'Full-bleed illustration, geometric leaves & sharp contrast'
  }
];

// Fallback metadata for the playlist songs
const PLAYLIST_DEFAULT_SONGS = [
  {
    title: 'काँच ही बाँस के बहंगिया',
    titleEnglish: 'Kaanch Hi Baans Ke Bahangiya',
    singer: 'Sharda Sinha',
    videoId: 'Wp_Fvd4b71w',
    duration: 385
  },
  {
    title: 'पहिले पहिल छठी मइया',
    titleEnglish: 'Pahile Pahil Chhathi Maiya',
    singer: 'Sharda Sinha',
    videoId: 'qC_sZ6lKzcg',
    duration: 350
  },
  {
    title: 'उगिहे सुरुजदेव अरघ के बेरा',
    titleEnglish: 'Ugihe Surujdev Aragh Ke Bera',
    singer: 'Anuradha Paudwal',
    videoId: 'KjG9H9eU3zE',
    duration: 320
  },
  {
    title: 'केलवा के पात पर उगेलन सुरुजमल',
    titleEnglish: 'Kelwa Ke Paat Par',
    singer: 'Sharda Sinha',
    videoId: 'Hq0N-gP9x0A',
    duration: 375
  },
  {
    title: 'हो दीनानाथ',
    titleEnglish: 'Ho Deenanath',
    singer: 'Sharda Sinha',
    videoId: 'O2Xw9L9Wp_c',
    duration: 310
  }
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(385);
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState(0);
  const [showFilmFlare, setShowFilmFlare] = useState(true);
  const [showArtworkMenu, setShowArtworkMenu] = useState(false);
  const [timeState, setTimeState] = useState({
    hours: '04',
    minutes: '30',
    ampm: 'pm'
  });
  const [blinkColon, setBlinkColon] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [trackMeta, setTrackMeta] = useState({
    title: 'काँच ही बाँस के बहंगिया',
    titleEnglish: 'Kaanch Hi Baans Ke Bahangiya',
    singer: 'Sharda Sinha',
    videoId: 'Wp_Fvd4b71w'
  });

  const playerRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isSeekingRef = useRef<boolean>(false);
  const progressTimerRef = useRef<any>(null);

  const PLAYLIST_ID = 'OLAK5uy_m8fsLH9krwi9l0AgRDfpXuQVgFxUh-oog';
  const SPOTIFY_PLAYLIST_LINK = 'https://open.spotify.com/s/buUmibC';

  // Real-time Clock with blinking colon every second
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(now);
        
        let hrs = '04';
        let mins = '30';
        let period = 'pm';

        for (const part of parts) {
          if (part.type === 'hour') hrs = part.value;
          if (part.type === 'minute') mins = part.value;
          if (part.type === 'dayPeriod') period = part.value.toLowerCase();
        }

        setTimeState({
          hours: hrs,
          minutes: mins,
          ampm: period
        });
      } catch {
        const now = new Date();
        const hrs = (now.getHours() % 12 || 12).toString().padStart(2, '0');
        const mins = now.getMinutes().toString().padStart(2, '0');
        const period = now.getHours() >= 12 ? 'pm' : 'am';
        setTimeState({
          hours: hrs,
          minutes: mins,
          ampm: period
        });
      }
      setBlinkColon(prev => !prev);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Sync track metadata from player
  const updateTrackInfoFromPlayer = useCallback(() => {
    if (!playerRef.current) return;
    try {
      const data = playerRef.current.getVideoData?.();
      const dur = playerRef.current.getDuration?.();
      const idx = playerRef.current.getPlaylistIndex?.() ?? 0;

      if (dur && dur > 0) {
        setDuration(dur);
      }

      if (data && data.title) {
        setTrackMeta({
          title: data.title,
          titleEnglish: data.title,
          singer: data.author || 'Sharda Sinha / Chhath Geet',
          videoId: data.video_id || trackMeta.videoId
        });
      } else {
        const fallback = PLAYLIST_DEFAULT_SONGS[idx % PLAYLIST_DEFAULT_SONGS.length];
        if (fallback) {
          setTrackMeta(fallback);
          setDuration(fallback.duration);
        }
      }
    } catch {
      // ignore
    }
  }, [trackMeta.videoId]);

  // YouTube Player Initializer
  const initializeYouTubePlayer = useCallback(() => {
    if (playerRef.current) return;
    if (typeof window.YT === 'undefined' || !window.YT.Player) return;

    try {
      playerRef.current = new window.YT.Player('youtube-playlist-target', {
        height: '200',
        width: '320',
        playerVars: {
          listType: 'playlist',
          list: PLAYLIST_ID,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(100);
            updateTrackInfoFromPlayer();
          },
          onStateChange: (event: any) => {
            // 1 = PLAYING
            if (event.data === 1 || event.data === window.YT?.PlayerState?.PLAYING) {
              setIsPlaying(true);
              updateTrackInfoFromPlayer();
              toggleAmbientRiver(true, 0.15);
            } else if (event.data === 2 || event.data === window.YT?.PlayerState?.PAUSED) {
              setIsPlaying(false);
              toggleAmbientRiver(false, 0);
            } else if (event.data === 0 || event.data === window.YT?.PlayerState?.ENDED) {
              // auto advance
              try {
                event.target.nextVideo();
              } catch {
                // ignore
              }
            }
          },
          onError: (event: any) => {
            console.warn('YT Player Error:', event.data);
            // Skip unplayable track in playlist automatically
            try {
              event.target.nextVideo();
            } catch {
              // ignore
            }
          }
        }
      });
    } catch (e) {
      console.error('Failed to create YT player', e);
    }
  }, [PLAYLIST_ID, updateTrackInfoFromPlayer]);

  // Load YouTube Iframe API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initializeYouTubePlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initializeYouTubePlayer();
      };

      const checkTimer = setInterval(() => {
        if (window.YT && window.YT.Player && !playerRef.current) {
          clearInterval(checkTimer);
          initializeYouTubePlayer();
        }
      }, 300);

      return () => clearInterval(checkTimer);
    }
  }, [initializeYouTubePlayer]);

  // Polling progress from actual YouTube player
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        if (playerRef.current && !isSeekingRef.current) {
          try {
            const curr = playerRef.current.getCurrentTime?.() || 0;
            const dur = playerRef.current.getDuration?.() || 0;
            setCurrentTime(curr);
            if (dur > 0) setDuration(dur);
          } catch {
            // fallback
          }
        }
      }, 500);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    }
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPlaying]);

  // Play / Pause Toggle
  const handlePlayPause = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (!playerRef.current || !playerRef.current.playVideo) {
      // If player not initialized yet, retry initialization
      initializeYouTubePlayer();
      setIsPlaying(true);
      return;
    }

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
        toggleAmbientRiver(false, 0);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
        toggleAmbientRiver(true, 0.15);
      }
    } catch (err) {
      console.error('Play/Pause error:', err);
    }
  };

  // Next Track
  const handleNextTrack = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playerRef.current && playerRef.current.nextVideo) {
      try {
        playerRef.current.nextVideo();
        playerRef.current.playVideo();
        setIsPlaying(true);
        setTimeout(updateTrackInfoFromPlayer, 800);
      } catch {
        // fallback
      }
    } else {
      const nextIdx = (currentTrackIndex + 1) % PLAYLIST_DEFAULT_SONGS.length;
      setCurrentTrackIndex(nextIdx);
      setTrackMeta(PLAYLIST_DEFAULT_SONGS[nextIdx]);
      setIsPlaying(true);
    }
  };

  // Previous Track
  const handlePrevTrack = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (playerRef.current && playerRef.current.previousVideo) {
      try {
        playerRef.current.previousVideo();
        playerRef.current.playVideo();
        setIsPlaying(true);
        setTimeout(updateTrackInfoFromPlayer, 800);
      } catch {
        // fallback
      }
    } else {
      const prevIdx = (currentTrackIndex - 1 + PLAYLIST_DEFAULT_SONGS.length) % PLAYLIST_DEFAULT_SONGS.length;
      setCurrentTrackIndex(prevIdx);
      setTrackMeta(PLAYLIST_DEFAULT_SONGS[prevIdx]);
      setIsPlaying(true);
    }
  };

  // Scrubber Seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!progressBarRef.current || duration <= 0) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;

    setCurrentTime(newTime);
    if (playerRef.current && playerRef.current.seekTo) {
      try {
        playerRef.current.seekTo(newTime, true);
        if (!isPlaying) {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
      } catch {
        // ignore
      }
    }
  };

  // Toggle Mute
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playerRef.current) {
      try {
        if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
          toggleAmbientRiver(isPlaying, 0.15);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
          toggleAmbientRiver(false, 0);
        }
      } catch {
        setIsMuted(!isMuted);
      }
    }
  };

  const trackProgressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const trackThumbnail = trackMeta.videoId
    ? `https://img.youtube.com/vi/${trackMeta.videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/Wp_Fvd4b71w/hqdefault.jpg`;

  const activeArtwork = ARTWORKS[selectedArtworkIndex] || ARTWORKS[0];

  return (
    <div
      id="saloon-app-root"
      className="relative min-h-[100dvh] h-[100dvh] w-full overflow-hidden bg-black text-white flex flex-col justify-between select-none font-outfit"
    >
      {/* Background High-Definition Artwork with smooth transition */}
      <img
        key={activeArtwork.id}
        src={activeArtwork.src}
        alt={activeArtwork.name}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-all duration-700 ease-out"
      />

      {/* 35mm Analog Film Grain Texture */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Signature Dreamy Crimson Light Leak & Lens Mist Overlay (Matching Reference Image) */}
      {showFilmFlare && (
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-700">
          {/* Luminous bottom/side red glow */}
          <div className="absolute -bottom-16 -left-10 w-[120%] h-[55%] bg-gradient-to-t from-[#e62020]/45 via-[#d4182b]/25 to-transparent blur-3xl mix-blend-screen" />
          <div className="absolute bottom-0 right-0 w-[70%] h-[40%] bg-gradient-to-tl from-[#ff2a14]/35 via-[#c91d1d]/20 to-transparent blur-2xl mix-blend-screen" />
          <div className="absolute top-0 right-0 w-[40%] h-[30%] bg-gradient-to-bl from-[#ff4422]/15 to-transparent blur-2xl mix-blend-screen" />
        </div>
      )}

      {/* Depth Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />

      {/* YouTube Player Container - Kept with valid non-zero size but positioned invisibly */}
      <div
        id="youtube-player-wrapper"
        className="fixed bottom-0 right-0 w-48 h-32 opacity-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <div id="youtube-playlist-target" />
      </div>

      {/* 1. Top Bar: Fully Responsive Header */}
      <header className="relative z-20 w-full pt-3 sm:pt-6 px-3 sm:px-6 md:px-8 flex items-center justify-between gap-2 pointer-events-auto">
        {/* Top-Left: Time (e.g. 04:30 pm) with blinking colon per second */}
        <div className="text-white text-xs sm:text-sm md:text-base font-normal tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center tabular-nums select-none shrink-0">
          <span>{timeState.hours}</span>
          <span
            className={`inline-block mx-0.5 font-bold transition-opacity duration-150 ${
              blinkColon ? 'opacity-100' : 'opacity-0'
            }`}
          >
            ⁚
          </span>
          <span>{timeState.minutes}</span>
          <span className="ml-1 text-[11px] sm:text-xs md:text-sm font-normal lowercase">{timeState.ampm}</span>
        </div>

        {/* Top-Right: Controls (Artwork Switcher, Mist Toggle, Spotify, YT Music & Mute) */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
          {/* Artwork Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setShowArtworkMenu(prev => !prev)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md text-white text-[11px] sm:text-xs font-medium transition-all active:scale-95 shadow-md"
              title="Change Artwork Aesthetic"
              aria-label="Change Artwork Aesthetic"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Theme</span>
            </button>

            {/* Artwork Dropdown Menu */}
            {showArtworkMenu && (
              <div className="absolute right-0 mt-2 w-56 sm:w-64 rounded-2xl bg-[#2a1010]/95 border border-white/20 backdrop-blur-xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-white/50 tracking-wider">
                  Select Visual Style
                </div>
                <div className="space-y-1 mt-1">
                  {ARTWORKS.map((art, idx) => (
                    <button
                      key={art.id}
                      onClick={() => {
                        setSelectedArtworkIndex(idx);
                        setShowArtworkMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-all ${
                        selectedArtworkIndex === idx
                          ? 'bg-white/25 text-white font-semibold'
                          : 'hover:bg-white/10 text-white/80'
                      }`}
                    >
                      <img
                        src={art.src}
                        alt={art.name}
                        className="w-7 h-7 rounded-lg object-cover border border-white/20 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{art.name}</div>
                        <div className="text-[10px] text-white/60 truncate">{art.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="border-t border-white/10 mt-2 pt-2 px-1 flex items-center justify-between">
                  <span className="text-[11px] text-white/70">Red Lens Mist</span>
                  <button
                    onClick={() => setShowFilmFlare(prev => !prev)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
                      showFilmFlare ? 'bg-amber-400 text-black font-bold' : 'bg-white/15 text-white'
                    }`}
                  >
                    {showFilmFlare ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Film Mist Quick Toggle */}
          <button
            onClick={() => setShowFilmFlare(prev => !prev)}
            className={`p-1.5 sm:p-2 rounded-full border backdrop-blur-md transition-all active:scale-95 shadow-md ${
              showFilmFlare
                ? 'bg-amber-400/25 border-amber-300/40 text-amber-200'
                : 'bg-white/15 hover:bg-white/25 border-white/20 text-white/70'
            }`}
            title={showFilmFlare ? 'Disable Cinematic Mist' : 'Enable Cinematic Mist'}
            aria-label="Toggle Cinematic Mist"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-1.5 sm:p-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md text-white transition-all active:scale-95 shadow-md"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Spotify Pill */}
          <a
            href={SPOTIFY_PLAYLIST_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md text-white text-[11px] sm:text-xs font-medium transition-all active:scale-95 shadow-md"
            title="Open Chhath Puja Playlist on Spotify"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.306c-.215.353-.675.467-1.028.252-2.813-1.72-6.353-2.11-10.524-1.156-.402.092-.803-.162-.895-.564-.092-.402.162-.803.564-.895 4.568-1.044 8.483-.6 11.631 1.335.353.215.467.675.252 1.028zm1.464-3.26c-.27.441-.849.584-1.29.314-3.22-1.979-8.13-2.55-11.94-1.393-.497.151-1.029-.133-1.18-.63-.151-.497.133-1.029.63-1.18 4.356-1.321 9.774-.682 13.466 1.589.441.27.584.849.314 1.29zm.125-3.398c-3.862-2.293-10.237-2.505-13.916-1.388-.593.18-1.222-.16-1.402-.753-.18-.593.16-1.222.753-1.402 4.234-1.286 11.279-1.036 15.707 1.593.534.317.711 1.009.394 1.543-.317.534-1.009.711-1.543.394z" />
            </svg>
            <span className="hidden xs:inline sm:inline">Spotify</span>
            <ArrowUpRight className="w-3 h-3 opacity-70 shrink-0" />
          </a>

          {/* YT Music Pill */}
          <a
            href={`https://music.youtube.com/playlist?list=${PLAYLIST_ID}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md text-white text-[11px] sm:text-xs font-medium transition-all active:scale-95 shadow-md"
            title="Open on YouTube Music"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.5c-4.142 0-7.5-3.358-7.5-7.5S7.858 4.5 12 4.5s7.5 3.358 7.5 7.5-3.358 7.5-7.5 7.5zm0-12.75c-2.9 0-5.25 2.35-5.25 5.25s2.35 5.25 5.25 5.25 5.25-2.35 5.25-5.25-2.35-5.25-5.25-5.25zm-2.25 7.75v-5l4.5 2.5-4.5 2.5z" />
            </svg>
            <span className="hidden xs:inline sm:inline">YT Music</span>
            <ArrowUpRight className="w-3 h-3 opacity-70 shrink-0" />
          </a>
        </div>
      </header>

      {/* 2. Centerpiece: Responsive Bold Hindi Devanagari Typography */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-2 text-center pointer-events-none">
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
          <h1 className="font-saloon-hindi font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] text-white tracking-tight leading-[0.9] drop-shadow-[0_8px_35px_rgba(0,0,0,0.85)] select-none">
            जय छठी
          </h1>
          <h1 className="font-saloon-hindi font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] text-white tracking-tight leading-[0.9] drop-shadow-[0_8px_35px_rgba(0,0,0,0.85)] select-none mt-1 sm:mt-2">
            मैया
          </h1>
        </div>
      </main>

      {/* 3. Bottom Player Bar: Single Unified Floating Play Console */}
      <footer className="relative z-20 w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto pb-3 sm:pb-6 md:pb-8 px-3 sm:px-4 pointer-events-auto">
        <div className="w-full rounded-full bg-[#3d1a14]/50 border border-white/25 backdrop-blur-2xl px-2.5 sm:px-3.5 md:px-4.5 py-2 sm:py-2.5 md:py-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
          {/* Left: Spinning Circular Disc Artwork */}
          <div
            onClick={handlePlayPause}
            className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden shrink-0 border-2 border-white/30 shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95 ${
              isPlaying ? 'animate-[spin_12s_linear_infinite]' : ''
            }`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <img
              src={trackThumbnail}
              alt={trackMeta.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-110"
            />
            {/* Center disc spindle hole */}
            <div className="absolute inset-0 m-auto w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#3d1a14] border-2 border-white/50" />
          </div>

          {/* Middle: Track Title, Artist & Scrubber */}
          <div className="min-w-0 flex-1 flex flex-col justify-center">
            {/* Track Title */}
            <h2 className="text-[11px] sm:text-xs md:text-sm font-semibold text-white truncate leading-snug">
              {trackMeta.title}
            </h2>

            {/* Artist */}
            <p className="text-[10px] sm:text-[11px] md:text-xs text-white/75 truncate leading-tight mt-0.5">
              {trackMeta.singer}
            </p>

            {/* Scrubber & Duration Display */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
              {/* Progress Line */}
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                className="relative flex-1 h-1 sm:h-1.5 bg-white/20 hover:bg-white/30 rounded-full cursor-pointer overflow-hidden transition-all group"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 bg-white rounded-full group-hover:bg-amber-300 transition-all duration-150"
                  style={{ width: `${trackProgressPercent}%` }}
                />
              </div>

              {/* Time stamp: 0:07 / 6:15 */}
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-mono text-white/80 shrink-0 tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: Playback Controls (Prev, Big Play/Pause, Next) */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
            {/* Previous Button */}
            <button
              onClick={handlePrevTrack}
              className="p-1 sm:p-1.5 md:p-2 text-white/80 hover:text-white transition-colors active:scale-95"
              title="Previous Track"
              aria-label="Previous Track"
            >
              <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            </button>

            {/* Main Play/Pause Button (Solid White Circle) */}
            <button
              onClick={handlePlayPause}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0"
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextTrack}
              className="p-1 sm:p-1.5 md:p-2 text-white/80 hover:text-white transition-colors active:scale-95"
              title="Next Track"
              aria-label="Next Track"
            >
              <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
