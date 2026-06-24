import { ReactNode } from 'react'
import { useTimer } from '../hooks/useTimer'

interface CounterViewProps {
  streakStart: number | null
}

const quotes = [
  { text: "He who conquers himself is the mightiest warrior.", author: "Confucius" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { text: "You do not find a happy life. You make it.", author: "Camilla Eyring Kimball" },
  { text: "Difficulties strengthen the mind, as labor does the body.", author: "Seneca" },
  { text: "A year from now you may wish you had started today.", author: "Karen Lamb" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Do not pray for an easy life, pray for the strength to endure a difficult one.", author: "Bruce Lee" },
  { text: "Your struggle is part of your story.", author: "Unknown" },
  { text: "Self-discipline is self-respect.", author: "Thomas Bernhard" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "If you cannot do great things, do small things in a great way.", author: "Napoleon Hill" },
  { text: "Freedom is the control you have over your own life.", author: "Unknown" },
  { text: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle Onassis" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Out of difficulties grow miracles.", author: "Jean de la Bruyere" },
  { text: "Mastering others is strength. Mastering yourself is true power.", author: "Lao Tzu" },
  { text: "Only I can change my life. No one can do it for me.", author: "Carol Burnett" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "The starting point of all achievement is desire.", author: "Napoleon Hill" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
  { text: "Great works are performed not by strength but by perseverance.", author: "Samuel Johnson" }
]

function getDailyQuote(): { text: string; author: string } {
  const date = new Date()
  const dayIndex = (date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate()) % quotes.length
  const quote = quotes[dayIndex]
  if (quote) return quote
  return { text: "He who conquers himself is the mightiest warrior.", author: "Confucius" }
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function CounterView({ streakStart }: CounterViewProps): ReactNode {
  const { days, hours, minutes, seconds } = useTimer(streakStart)
  const dailyQuote = getDailyQuote()

  // Calculate dynamic daily progress (percentage of current 24-hour cycle completed)
  const totalSecondsInDay = 86400
  const elapsedSecondsInDay = (hours * 3600) + (minutes * 60) + seconds
  const dayProgress = streakStart ? (elapsedSecondsInDay / totalSecondsInDay) : 0
  
  // Circumference of r=45 is 2 * Math.PI * 45 = 282.7
  const circumference = 282.7
  const strokeDashoffset = circumference - (dayProgress * circumference)

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-9 px-4 select-none">
      {/* Daily Motivational Quote */}
      <div className="flex flex-col items-center text-center px-4 max-w-[270px] shrink-0">
        <p className="text-[11px] italic font-medium text-zinc-400 leading-normal">
          "{dailyQuote.text}"
        </p>
        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mt-1">
          — {dailyQuote.author}
        </span>
      </div>

      {/* Circular Progress & Streak Display */}
      <div className="relative flex items-center justify-center w-44 h-44">
        {/* Soft Ambient Core Glow */}
        <div className="absolute w-36 h-36 rounded-full bg-amber-500/[0.02] blur-xl" />

        {/* Multi-layered Glassmorphic Rings */}
        <div className="absolute inset-0 rounded-full border border-zinc-800/40" />
        <div className="absolute inset-2 rounded-full border border-zinc-800/20" />
        <div className="absolute inset-4 rounded-full bg-zinc-900/10 backdrop-blur-[2px]" />

        {/* Circular Progress Ring */}
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background Track */}
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-zinc-950"
            strokeWidth="1.5"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-zinc-900/80"
            strokeWidth="1"
            fill="transparent"
          />
          {/* Dynamic Progress Indicator (Current Day's Progress) */}
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-amber-500/40"
            strokeWidth="1.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s linear',
              filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.25))'
            }}
          />
        </svg>

        {/* Text Centerpiece */}
        <div className="flex flex-col items-center gap-0.5 z-10">
          <span
            className="text-7xl font-black tracking-tighter bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text text-transparent leading-none drop-shadow-[0_2px_8px_rgba(255,255,255,0.12)]"
            aria-live="polite"
            aria-label={`${days} days clean`}
          >
            {days}
          </span>
          <span className="text-[9px] tracking-[0.25em] text-zinc-500 font-extrabold uppercase mt-1">
            Days Clean
          </span>
        </div>
      </div>

      {/* H / M / S Floating Glass Cards */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[240px]">
        {/* Hours Card */}
        <div className="relative flex flex-col items-center gap-1 bg-gradient-to-b from-zinc-900/50 to-zinc-950/50 border border-zinc-800/50 rounded-xl py-3 px-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-sm overflow-hidden">
          {/* Card header light leak */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
          
          <span className="text-xl font-bold text-zinc-100 leading-none tabular-nums">
            {pad(hours)}
          </span>
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">
            Hours
          </span>
        </div>

        {/* Minutes Card */}
        <div className="relative flex flex-col items-center gap-1 bg-gradient-to-b from-zinc-900/50 to-zinc-950/50 border border-zinc-800/50 rounded-xl py-3 px-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] backdrop-blur-sm overflow-hidden">
          {/* Card header light leak */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
          
          <span className="text-xl font-bold text-zinc-100 leading-none tabular-nums">
            {pad(minutes)}
          </span>
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">
            Mins
          </span>
        </div>

        {/* Seconds Card — glowing, active live ticker */}
        <div className="relative flex flex-col items-center gap-1 bg-gradient-to-b from-zinc-900/50 to-zinc-950/50 border border-amber-500/20 rounded-xl py-3 px-2 shadow-[0_4px_15px_rgba(245,158,11,0.04)] backdrop-blur-sm overflow-hidden">
          {/* Live pulsing dot indicator */}
          <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-amber-500/80 animate-pulse" />
          
          {/* Card header light leak (amber) */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          
          <span className="text-xl font-bold text-amber-500 leading-none tabular-nums drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)]">
            {pad(seconds)}
          </span>
          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mt-0.5">
            Secs
          </span>
        </div>
      </div>
    </div>
  )
}
