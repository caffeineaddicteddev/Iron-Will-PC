import { ReactNode } from 'react'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps): ReactNode {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5 no-drag"
      style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.75)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4 shadow-2xl max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h2
            id="about-modal-title"
            className="text-sm font-bold text-white tracking-wider uppercase"
          >
            About Iron Will
          </h2>
          <span className="text-[10px] text-zinc-500 font-mono">v1.0.0</span>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs text-zinc-300 font-semibold mb-1">Creator & Developer</p>
            <p className="text-xs text-zinc-400 font-mono">caffeineaddicteddev</p>
          </div>

          <div>
            <p className="text-xs text-zinc-300 font-semibold mb-1">License</p>
            <p className="text-xs text-zinc-400">
              Licensed under the{' '}
              <strong className="text-zinc-300">
                GNU Affero General Public License v3 (AGPL-3.0)
              </strong>
              .
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-300 font-semibold mb-1">Open Source Attributions</p>
            <ul className="text-xs text-zinc-400 list-disc list-inside space-y-1">
              <li>
                <strong className="text-zinc-300">Electron</strong> (App Shell)
              </li>
              <li>
                <strong className="text-zinc-300">Vite & React</strong> (Build & Frontend)
              </li>
              <li>
                <strong className="text-zinc-300">SQLite (sql.js)</strong> (Local Database)
              </li>
              <li>
                <strong className="text-zinc-300">Tailwind CSS</strong> (Styling Engine)
              </li>
              <li>
                <strong className="text-zinc-300">HeroUI</strong> (UI Design System)
              </li>
              <li>
                <strong className="text-zinc-300">Lucide React</strong> (Icon Library)
              </li>
              <li>
                <strong className="text-zinc-300">date-fns</strong> (Time Calculations)
              </li>
            </ul>
          </div>

          <div className="border-t border-zinc-800 pt-2 space-y-1">
            <p className="text-[11px] text-zinc-500 leading-normal">
              An open-source addiction streak tracker. Your data is stored 100% locally on your
              computer.
            </p>
            <p className="text-[10px] text-zinc-600 leading-normal italic">
              Note: This project is not affiliated with, authorized, or endorsed by the mobile
              version of Iron Will (original).
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end border-t border-zinc-800 pt-3">
          <button
            onClick={onClose}
            className="bg-zinc-800 hover:bg-zinc-700 active:scale-[0.98] text-white text-xs font-semibold rounded-lg px-4 py-2 transition-all duration-150 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
