import { useState, useEffect, useCallback } from 'react'
import type { Relapse } from '../types'

interface UseStreakReturn {
  streakStart: number | null
  relapses: Relapse[]
  loading: boolean
  reset: (note: string) => Promise<void>
  refresh: () => Promise<void>
}

export function useStreak(): UseStreakReturn {
  const [streakStart, setStreakStart] = useState<number | null>(null)
  const [relapses, setRelapses] = useState<Relapse[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const refresh = useCallback(async (): Promise<void> => {
    const [start, history] = await Promise.all([
      window.api.getStreakStart(),
      window.api.getRelapses()
    ])
    setStreakStart(start)
    setRelapses(history)
  }, [])

  useEffect(() => {
    setLoading(true)
    refresh().finally(() => setLoading(false))
  }, [refresh])

  const reset = useCallback(
    async (note: string): Promise<void> => {
      await window.api.resetStreak(note)
      await refresh()
    },
    [refresh]
  )

  return { streakStart, relapses, loading, reset, refresh }
}
