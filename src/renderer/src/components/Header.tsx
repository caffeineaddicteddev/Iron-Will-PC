import { ReactNode } from 'react'
import { RotateCcw, History, Minus, X } from 'lucide-react'
import type { ActiveView } from '../types'

interface HeaderProps {
  activeView: ActiveView
  onViewChange: (view: ActiveView) => void
  onAboutClick: () => void
}

export function Header({ activeView, onViewChange, onAboutClick }: HeaderProps): ReactNode {
  return (
    <header className="drag-region relative flex items-center justify-between pl-4 pr-2.5 py-2 border-b border-zinc-800 bg-black shrink-0 select-none h-11">
      {/* Left: Branding (text only, no shield) */}
      <div className="flex items-center no-drag">
        <button
          onClick={onAboutClick}
          className="text-zinc-300 hover:text-zinc-100 active:scale-[0.98] font-bold text-xs tracking-wider uppercase cursor-pointer transition-colors border-none bg-transparent outline-none p-0"
          aria-label="About Iron Will"
        >
          Iron Will
        </button>
      </div>

      {/* Center: Tab Selector (Absolute Centered) */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-zinc-900 border border-zinc-800/50 rounded-lg p-0.5 no-drag">
        <button
          id="tab-counter"
          onClick={() => onViewChange('counter')}
          className={[
            'flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-150',
            activeView === 'counter'
              ? 'bg-zinc-800 text-white'
              : 'bg-transparent text-zinc-500 hover:text-zinc-300'
          ].join(' ')}
          aria-label="Counter view"
          aria-pressed={activeView === 'counter'}
        >
          <RotateCcw size={13} strokeWidth={2} />
        </button>

        <button
          id="tab-ledger"
          onClick={() => onViewChange('ledger')}
          className={[
            'flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-150',
            activeView === 'ledger'
              ? 'bg-zinc-800 text-white'
              : 'bg-transparent text-zinc-500 hover:text-zinc-300'
          ].join(' ')}
          aria-label="History ledger view"
          aria-pressed={activeView === 'ledger'}
        >
          <History size={13} strokeWidth={2} />
        </button>
      </div>

      {/* Right: Custom Window Controls */}
      <div className="flex items-center gap-0.5 no-drag mr-0.5">
        <button
          onClick={() => window.api.minimizeWindow()}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
          aria-label="Minimize Window"
        >
          <Minus size={13} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => window.api.closeWindow()}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-zinc-900 transition-colors"
          aria-label="Close Window"
        >
          <X size={13} strokeWidth={2.5} />
        </button>
      </div>
    </header>
  )
}
