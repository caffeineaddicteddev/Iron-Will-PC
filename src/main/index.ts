import { app, shell, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { initDatabase, getDatabase } from './db/database'
import { registerHandlers, registerResetCallback } from './db/handlers'

let isQuitting = false
let tray: Tray | null = null
const startHidden = process.argv.includes('--hidden')

function getStreakStart(): number {
  try {
    const db = getDatabase()
    const result = db.exec('SELECT start_time FROM streak_start WHERE id = 1')
    if (result.length === 0 || result[0].values.length === 0) {
      return Date.now()
    }
    return result[0].values[0][0] as number
  } catch (e) {
    return Date.now()
  }
}

function getTrayIcon(): nativeImage.NativeImage {
  const paths = [
    join(__dirname, '../../resources/icon-512.png'),
    join(app.getAppPath(), 'resources/icon-512.png'),
    join(process.resourcesPath, 'resources/icon-512.png'),
    join(process.resourcesPath, 'icon-512.png')
  ]

  console.log('--- Debugging Tray Icon Paths ---')
  console.log('__dirname:', __dirname)
  console.log('app.getAppPath():', app.getAppPath())
  console.log('process.resourcesPath:', process.resourcesPath)

  for (const p of paths) {
    const img = nativeImage.createFromPath(p)
    console.log(`Path: ${p} | isEmpty: ${img.isEmpty()}`)
    if (!img.isEmpty()) {
      return img.resize({ width: 16, height: 16, quality: 'high' })
    }
  }

  // Return fallback if all else fails
  const fallbackPath = join(__dirname, '../../resources/icon-512.png')
  const fallbackImg = nativeImage.createFromPath(fallbackPath)
  console.log(`Fallback Path: ${fallbackPath} | isEmpty: ${fallbackImg.isEmpty()}`)
  if (!fallbackImg.isEmpty()) {
    return fallbackImg.resize({ width: 16, height: 16, quality: 'high' })
  }
  return fallbackImg
}

function updateTray(): void {
  if (!tray) return
  const start = getStreakStart()
  const diffMs = Date.now() - start
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const days = Math.floor(diffHours / 24)
  const hours = diffHours % 24

  const streakText = `Streak: ${days}d ${hours}h`
  tray.setToolTip(`Iron Will\n${streakText}`)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Iron Will', enabled: false },
    { label: streakText, enabled: false },
    { type: 'separator' },
    {
      label: 'Open App',
      click: (): void => {
        const win = BrowserWindow.getAllWindows()[0]
        if (win) {
          win.show()
          win.focus()
        }
      }
    },
    {
      label: 'Quit',
      click: (): void => {
        isQuitting = true
        app.quit()
      }
    }
  ])
  tray.setContextMenu(contextMenu)
}

function createTray(): void {
  const icon = getTrayIcon()
  tray = new Tray(icon)

  tray.on('click', () => {
    const win = BrowserWindow.getAllWindows()[0]
    if (win) {
      if (win.isVisible()) {
        win.hide()
      } else {
        win.show()
        win.focus()
      }
    }
  })

  updateTray()
  // Update tray every minute
  setInterval(updateTray, 60000)

  // Update tray immediately when streak resets
  registerResetCallback(() => {
    updateTray()
  })
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 374,
    height: 640,
    minWidth: 374,
    maxWidth: 374,
    minHeight: 640,
    maxHeight: 640,
    show: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    fullscreen: false,
    autoHideMenuBar: true,
    frame: false,
    title: 'Iron Will',
    icon: join(__dirname, '../../resources/icon-512.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    if (!startHidden) {
      mainWindow.show()
    }
  })

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault()
      mainWindow.hide()
    }
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.on('before-quit', () => {
  isQuitting = true
})

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('caffeineaddicteddev.ironwill')

  // Set login item settings for auto startup on OS boot
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe'),
    args: ['--hidden']
  })

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  await initDatabase()
  registerHandlers(ipcMain)
  createTray()

  ipcMain.on('window-minimize', (event) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    if (win) win.minimize()
  })

  ipcMain.on('window-close', (event) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    if (win) win.close()
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
