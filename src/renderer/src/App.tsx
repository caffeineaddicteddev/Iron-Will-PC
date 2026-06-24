import { useState, useCallback, ReactNode } from 'react'
import { Header } from './components/Header'
import { CounterView } from './components/CounterView'
import { LedgerView } from './components/LedgerView'
import { Footer } from './components/Footer'
import { ResetModal } from './components/ResetModal'
import { AboutModal } from './components/AboutModal'
import { useStreak } from './hooks/useStreak'
import type { ActiveView } from './types'

export function App(): ReactNode {
  const [activeView, setActiveView] = useState<ActiveView>('counter')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [aboutOpen, setAboutOpen] = useState<boolean>(false)
  const { streakStart, relapses, loading, reset } = useStreak()

  const handleResetClick = useCallback((): void => {
    setModalOpen(true)
  }, [])

  const handleModalClose = useCallback((): void => {
    setModalOpen(false)
  }, [])

  const handleConfirmReset = useCallback(
    async (note: string): Promise<void> => {
      await reset(note)
    },
    [reset]
  )

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-zinc-500">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col bg-black relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0%,rgba(0,0,0,0)_75%)]">
      <Header
        activeView={activeView}
        onViewChange={setActiveView}
        onAboutClick={() => setAboutOpen(true)}
      />

      {activeView === 'counter' ? (
        <CounterView streakStart={streakStart} />
      ) : (
        <LedgerView relapses={relapses} />
      )}

      {activeView === 'counter' && <Footer onResetClick={handleResetClick} />}

      <ResetModal isOpen={modalOpen} onClose={handleModalClose} onConfirm={handleConfirmReset} />

      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  )
}
