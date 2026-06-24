# Iron Will Desktop Clone 📱

Iron Will is a premium, minimalist addiction recovery streak tracker for PC, rebuilt from the ground up as a sleek desktop widget. It is designed to help you stay accountable with an elegant interface and complete offline data privacy.

---

## 🌟 Key Features

### 🎨 Premium Visual Aesthetics
- **AMOLED Dark Theme**: Strict dark-mode styling utilizing absolute black backgrounds (`#000000`) and subtle charcoal borders.
- **Draggable Frameless Window**: Standard operating system borders are removed. The application header acts as a custom title bar allowing you to drag the window anywhere, complete with custom minimize and close controls.
- **Inter Font Stack**: Loaded dynamically from Google Fonts for a clean, sans-serif typography feel.
- **Micro-Animations**: Transitions and active scales (e.g., active clicks on buttons) provide immediate tactile feedback.

### ⏱️ Live Accountability Counter
- **Day Tracker**: A large centered day counter tracking your current streak.
- **Daily Progress Dial**: An elegant circular SVG progress indicator wrapping the day count, representing the elapsed percentage of the current 24-hour cycle.
- **Live Clock Grid**: Displays hours, minutes, and seconds elapsed. The clock uses `tabular-nums` formatting to prevent text jittering as the seconds count up.
- **Daily Motivational Quotes**: A deterministic quote engine that serves one of 31 willpower-oriented quotes each day, updating automatically at midnight.

### 📓 Relapse History Ledger
- **Input Constraints**: Logging a relapse displays a modal requiring an optional note, restricted to a maximum of 500 characters with a live character counter, and disables manual text resizing to keep the modal layout locked.
- **History Scroll**: Access a scrollable, timestamped list of past relapse records to reflect on triggers and learn from previous slip-ups.

### 🔒 Local Storage & Data Privacy
- **sql.js Integration**: Powered by SQLite compiled to WebAssembly. All records, streak states, and logs are stored locally on your machine in a database file (`ironwill.db` in your system's `userData` folder). Your data is 100% private and never sent to external servers.

---

## 🛠️ Technology Stack

- **Core Framework**: Electron (v42.5.0) & Vite (v7.2.6)
- **Frontend library**: React 19 (Strict Mode)
- **Programming Language**: TypeScript (Strict Typings Enabled)
- **Styling**: Tailwind CSS v4 & HeroUI v3 (Compound React Components)
- **Database Engine**: sql.js (SQLite WebAssembly Wrapper)
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- npm (installed with Node.js)

### 1. Installation
Clone the repository and install all dependencies:
```bash
npm install
```
*Note: Electron v42+ fetches its binaries dynamically on the first run. The installation script will automatically download the correct Electron executable for your system.*

### 2. Development Mode
Run the Vite development server and launch the frameless Electron window:
```bash
npm run dev
```

### 3. TypeScript Compilation Check
Verify type-safety across all main, preload, and renderer scripts:
```bash
npm run typecheck
```

### 4. Build and Packaging
Build the production bundle and package it into a Windows installer using `electron-builder`:
```bash
# Compile and package for Windows (.exe installer)
npm run build:win

# Compile and package in an unpacked directory (for quick testing)
npm run build:unpack
```
*Note: Packaging automatically generates standard Windows `.ico` and macOS `.icns` icons from the high-resolution source `build/icon.png`.*
