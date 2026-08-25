# Chhath Puja Geet Player — Old-School Devotional Experience

An ambient, immersive cultural music web application celebrating the sacred festival of **Chhath Mahaparv** (छठी मइया / सूर्य षष्ठी). Designed with a nostalgic, old-school music player aesthetic, this app features seamlessly integrated YouTube and Spotify playlists, customizable cinematic themes, live devotional music playback, and real-time IST clock synchronization.

---

## ✨ Features

- **Devanagari Centerpiece**: High-impact typography showcasing *जय छठी मैया* in classic editorial style.
- **Old-School Music Player Vibe**: Retro playback controls, analog-style interfaces, and vintage visual elements that bring back the golden era of cassette and vinyl listening.
- **Integrated Music Platforms**: 
  - Direct, built-in playback for **YouTube** Chhath Geet playlists.
  - Seamless **Spotify** integration for high-quality devotional streaming.
- **Customizable Theme Options**: Choose your vibe with interchangeable visual themes:
  - *Dawn Ghat*: Subtle morning ghat atmosphere with floating diyas.
  - *Retro Cassette*: Classic 80s/90s tape deck aesthetic.
  - *Village Ghat Rituals*: Bustling steps and bamboo soop rituals.
  - *Sunrise Puja Steps*: Geometric sun rays and rich contrast.
- **Continuous Background Player**:
  - Spinning vinyl/tape animation with synced audio playback.
  - Interactive timeline scrubber with timestamp display (`mm:ss / mm:ss`).
  - Next / Previous track navigation and Play/Pause control.
- **Synthesized Ambient Ganga River Audio**: Real-time Web Audio API pink noise & low-pass filtering simulating peaceful river waves synchronized with music playback.
- **Live IST Clock & Devotee Counter**:
  - Live Kolkata (Asia/Kolkata) 12-hour time format (`04:30 pm`) with blinking second colon.
  - Active devotee status indicator (`• 55 online`).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio & Media**:
  - YouTube IFrame Player API
  - Spotify Embed / Web API integration
  - Web Audio API (real-time river ambient synthesis)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/) / [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd chhath-puja-geet-player
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## 📦 Build & Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
├── public/                # Static assets & web manifest
├── src/
│   ├── assets/images/     # High-resolution Chhath ghat artwork & retro UI assets
│   ├── utils/
│   │   └── audioSynth.ts  # Web Audio API river ambiance synthesizer
│   ├── App.tsx            # Main application layout, player & state
│   ├── main.tsx           # React DOM application entry point
│   └── index.css          # Tailwind CSS global styles & custom fonts
├── index.html             # HTML entry template & fonts
├── metadata.json          # Applet metadata
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript compiler configuration
└── vite.config.ts         # Vite build configuration
```

---

## 🎵 Playlists

- **YouTube Playlist**: [Chhath Geet Collection](https://youtube.com/playlist?list=OLAK5uy_m8fsLH9krwi9l0AgRDfpXuQVgFxUh-oog)
- **Spotify Playlist**: [Chhath Puja Devotionals](https://open.spotify.com/s/buUmibC)

---

## 📄 License

This project is licensed under the Apache-2.0 License.
