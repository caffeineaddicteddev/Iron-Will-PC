import { ElectronAPI } from '@electron-toolkit/preload'

export interface Relapse {
  id: number
  timestamp: number
  note: string
}

export interface IronWillAPI {
  getStreakStart: () => Promise<number>
  resetStreak: (note: string) => Promise<void>
  getRelapses: () => Promise<Relapse[]>
  minimizeWindow: () => void
  closeWindow: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: IronWillAPI
  }
}
