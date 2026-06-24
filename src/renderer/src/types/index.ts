export interface Relapse {
  id: number
  timestamp: number
  note: string
}

export interface TimerState {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export type ActiveView = 'counter' | 'ledger'
