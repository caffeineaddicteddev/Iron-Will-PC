import { ReactNode } from 'react'

interface FooterProps {
  onResetClick: () => void
}

export function Footer({ onResetClick }: FooterProps): ReactNode {
  return (
    <footer className="px-4 pb-4 pt-2 shrink-0">
      <button
        id="btn-reset-streak"
        onClick={onResetClick}
        className="w-full h-11 bg-white hover:bg-zinc-100 active:scale-[0.98] text-black font-bold text-xs tracking-wide uppercase rounded-xl transition-all duration-150 shadow-lg cursor-pointer flex items-center justify-center"
        aria-label="Reset current streak"
      >
        Reset Current Streak
      </button>
    </footer>
  )
}
