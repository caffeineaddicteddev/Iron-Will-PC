import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { Relapse } from '../main/db/handlers'

const api = {
  getStreakStart: (): Promise<number> => ipcRenderer.invoke('get-streak-start'),
  resetStreak: (note: string): Promise<void> => ipcRenderer.invoke('reset-streak', note),
  getRelapses: (): Promise<Relapse[]> => ipcRenderer.invoke('get-relapses'),
  minimizeWindow: (): void => ipcRenderer.send('window-minimize'),
  closeWindow: (): void => ipcRenderer.send('window-close')
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
