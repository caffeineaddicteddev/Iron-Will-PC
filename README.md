# Iron Will for PC

> *"He who conquers himself is the mightiest warrior."*

If you've ever used the **Iron Will** app on your phone to track a sobriety or addiction recovery streak, you know how powerful that simple number can be. Seeing "Day 47" staring back at you is enough to make you think twice.

The problem? It's only on mobile. When you're at your desk — where most temptations actually happen — your phone is out of reach and so is your accountability tool.

**Iron Will for PC** fixes that. It's a full desktop remake of the Iron Will experience, built specifically for Windows, designed to sit quietly on your screen as a slim, always-visible reminder of how far you've come. No bloat, no internet required, no account sign-ups. Just you and your streak.

---

## 📥 Download for Windows

> **[⬇️ Download the latest installer (.exe)](../../releases/latest)**


---

## 🛠️ Tech Stack

Built with modern, production-quality tools:

| Layer | Technology |
|---|---|
| Desktop Shell | Electron v42 |
| UI Framework | React 19 + TypeScript (strict) |
| Styling | Tailwind CSS v4 + HeroUI v3 |
| Database | sql.js (SQLite compiled to WebAssembly) |
| Bundler | Vite 7 via electron-vite |
| Icons | Lucide React |
| Font | Inter (Google Fonts) |

---

## 🔧 Build it yourself

If you'd rather build from source:

```bash
# Install dependencies
npm install

# Launch in development mode (with hot-reload)
npm run dev

# Run TypeScript type checks
npm run typecheck

# Build and package for Windows
npm run build:win
```

> **Note:** Electron v42+ downloads its binary dynamically on the first `npm run dev` or `npx electron` call. This is expected behavior — just let it complete.

---

## Contributing

Pull requests and issues are welcome. If you're in recovery yourself and have ideas for making this tool more useful, I'd love to hear from you.

---

*This project is not affiliated with the official Iron Will mobile app. It is an independent desktop remake built out of personal need.*
