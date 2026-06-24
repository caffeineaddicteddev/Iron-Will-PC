import { useState, useEffect } from 'react'
import type { TimerState } from '../types'

function computeTimer(startMs: number): TimerState {
  const elapsed = Math.max(0, Date.now() - startMs)
  const totalSeconds = Math.floor(elapsed / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

export function useTimer(streakStart: number | null): TimerState {
  const [timer, setTimer] = useState<TimerState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    if (streakStart === null) return

    // Immediate compute on mount / streakStart change
    setTimer(computeTimer(streakStart))

    const interval = setInterval(() => {
      setTimer(computeTimer(streakStart))
    }, 1000)

    return () => clearInterval(interval)
  }, [streakStart])

  return timer
}
