import { app } from 'electron'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import initSqlJs, { Database } from 'sql.js'

let db: Database | null = null

function getDbPath(): string {
  return join(app.getPath('userData'), 'ironwill.db')
}

function getWasmPath(): string {
  return join(app.getAppPath(), 'node_modules/sql.js/dist/sql-wasm.wasm')
}

function saveDatabase(): void {
  if (!db) return
  const data = db.export()
  const buffer = Buffer.from(data)
  writeFileSync(getDbPath(), buffer)
}

function runMigrations(): void {
  if (!db) return

  db.run(`
    CREATE TABLE IF NOT EXISTS streak_start (
      id         INTEGER PRIMARY KEY CHECK(id = 1),
      start_time INTEGER NOT NULL
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS relapses (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp INTEGER NOT NULL,
      note      TEXT NOT NULL DEFAULT ''
    )
  `)

  // Seed with a default streak start if none exists
  const result = db.exec('SELECT start_time FROM streak_start WHERE id = 1')
  if (result.length === 0 || result[0].values.length === 0) {
    db.run('INSERT INTO streak_start (id, start_time) VALUES (1, ?)', [Date.now()])
    saveDatabase()
  }
}

export async function initDatabase(): Promise<void> {
  const SQL = await initSqlJs({
    locateFile: () => getWasmPath()
  })

  const dbPath = getDbPath()
  if (existsSync(dbPath)) {
    const fileBuffer = readFileSync(dbPath)
    db = new SQL.Database(fileBuffer)
  } else {
    db = new SQL.Database()
  }

  runMigrations()
}

export function getDatabase(): Database {
  if (!db) throw new Error('Database not initialized')
  return db
}

export { saveDatabase }
