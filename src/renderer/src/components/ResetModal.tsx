import { useState, useCallback, ReactNode } from 'react'
import { Button, TextArea } from '@heroui/react'

interface ResetModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (note: string) => Promise<void>
}

export function ResetModal({ isOpen, onClose, onConfirm }: ResetModalProps): ReactNode {
  const [note, setNote] = useState<string>('')
  const [confirming, setConfirming] = useState<boolean>(false)

  const handleConfirm = useCallback(async (): Promise<void> => {
    setConfirming(true)
    try {
      await onConfirm(note.trim())
      setNote('')
      onClose()
    } finally {
      setConfirming(false)
    }
  }, [note, onConfirm, onClose])

  const handleClose = useCallback((): void => {
    setNote('')
    onClose()
  }, [onClose])

  if (!isOpen) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
      style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.75)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Card */}
      <div className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex flex-col gap-4">
        {/* Header */}
        <h2 id="modal-title" className="text-sm font-bold text-zinc-200">
          Reset Tracker?
        </h2>

        {/* Body */}
        <div className="flex flex-col gap-3">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Log honestly. What triggered this relapse? Use this entry to learn from it.
          </p>

          <div className="relative">
            <TextArea
              id="relapse-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="E.g., Stressful evening, skipped meditation..."
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-zinc-200 placeholder:text-zinc-600 pl-3 pr-14 py-2 outline-none focus:border-zinc-500 resize-none"
              maxLength={500}
              aria-label="Relapse note"
            />
            <span className="absolute bottom-2.5 right-3 text-[9px] font-bold text-zinc-600 select-none tabular-nums">
              {note.length}/500
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            id="btn-modal-cancel"
            onClick={handleClose}
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors duration-150 px-2 py-1"
            disabled={confirming}
          >
            Cancel
          </button>

          <Button
            id="btn-modal-confirm"
            onPress={handleConfirm}
            isPending={confirming}
            isDisabled={confirming}
            className="bg-red-600 text-white font-semibold text-sm rounded-lg px-4 h-9 min-w-0"
            size="sm"
          >
            Confirm Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
