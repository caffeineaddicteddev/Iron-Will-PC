import { IpcMain } from 'electron'
import { getDatabase, saveDatabase } from './database'

export interface Relapse {
  id: number
  timestamp: number
  note: string
}

let onResetCallback: (() => void) | null = null

export function registerResetCallback(cb: () => void): void {
  onResetCallback = cb
}

export function registerHandlers(ipcMain: IpcMain): void {
  /**
   * Returns the Unix ms timestamp of when the current streak started.
   */
  ipcMain.handle('get-streak-start', (): number => {
    const db = getDatabase()
    const result = db.exec('SELECT start_time FROM streak_start WHERE id = 1')
    if (result.length === 0 || result[0].values.length === 0) {
      return Date.now()
    }
    return result[0].values[0][0] as number
  })

  /**
   * Resets the current streak:
   * 1. Logs the current streak_start as a relapse entry
   * 2. Updates streak_start to now
   */
  ipcMain.handle('reset-streak', (_event, note: string): void => {
    const db = getDatabase()
    const now = Date.now()

    // Log current streak end as a relapse
    db.run('INSERT INTO relapses (timestamp, note) VALUES (?, ?)', [now, note ?? ''])

    // Reset streak start to now
    db.run('UPDATE streak_start SET start_time = ? WHERE id = 1', [now])

    saveDatabase()

    if (onResetCallback) {
      onResetCallback()
    }
  })

  /**
   * Returns all relapse records, newest first.
   */
  ipcMain.handle('get-relapses', (): Relapse[] => {
    const db = getDatabase()
    const result = db.exec('SELECT id, timestamp, note FROM relapses ORDER BY timestamp DESC')
    if (result.length === 0) return []
    return result[0].values.map((row) => ({
      id: row[0] as number,
      timestamp: row[1] as number,
      note: row[2] as string
    }))
  })
}
