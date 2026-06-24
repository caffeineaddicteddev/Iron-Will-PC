import { ReactNode } from 'react'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'
import type { Relapse } from '../types'

interface LedgerViewProps {
  relapses: Relapse[]
}

function formatTimestamp(ms: number): string {
  return format(new Date(ms), 'MM/dd/yyyy \'at\' HH:mm')
}

export function LedgerView({ relapses }: LedgerViewProps): ReactNode {
  return (
    <div className="flex-1 flex flex-col min-h-0 px-4 py-3">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3 shrink-0">
        <Calendar size={13} className="text-zinc-400" strokeWidth={2} />
        <span className="text-sm font-semibold text-zinc-400">Relapse Ledger</span>
      </div>

      {/* List */}
      <div className="scroll-y flex-1 flex flex-col gap-2">
        {relapses.length === 0 ? (
          <p className="text-xs italic text-zinc-600 text-center mt-8">
            No slip-ups recorded yet. Stay strong!
          </p>
        ) : (
          relapses.map((relapse) => (
            <div
              key={relapse.id}
              className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3"
            >
              <p className="text-[11px] text-zinc-500 mb-1">
                {formatTimestamp(relapse.timestamp)}
              </p>
              {relapse.note ? (
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {relapse.note}
                </p>
              ) : (
                <p className="text-xs text-zinc-600 italic">No note added.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
