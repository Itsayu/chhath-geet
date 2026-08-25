export type TimeOfDay = 'dawn' | 'dusk' | 'midnight';

export interface ChhathDay {
  id: number;
  hindiName: string;
  englishName: string;
  datePhase: string;
  tagline: string;
  rituals: string[];
  prasad: string;
  specialMemory: string;
  colorTheme: {
    bgGradient: string;
    accent: string;
    glow: string;
  };
}

export interface FolkTrack {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  singer: string;
  duration: string;
  youtubeId: string;
  culturalNote: string;
  spotifyUrl?: string;
  ytMusicUrl?: string;
}

export interface NostalgicMemory {
  id: string;
  quoteHindi: string;
  quoteEnglish: string;
  author: string;
  category: 'lyric' | 'childhood' | 'aroma' | 'tradition';
  tag: string;
}

export interface GhatObject {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  description: string;
  culturalSignificance: string;
  iconType: string;
}

export interface FloatingDiya {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  opacity: number;
  lifespan: number;
  maxLife: number;
  flameFlicker: number;
  glowColor: string;
}
