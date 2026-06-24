import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { initDatabase } from './db/database'
import { registerHandlers } from './db/handlers'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 360,
    height: 640,
    useContentSize: true,
    minWidth: 360,
    maxWidth: 360,
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
    mainWindow.show()
    // Force Windows DWM to recalculate the correct client area.
    // Without this, frameless windows on Windows are clipped by ~5px
    // on launch until the user drags the window (which triggers a repaint).
    if (process.platform === 'win32') {
      mainWindow.setContentSize(360, 640)
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

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.ironwill')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  await initDatabase()
  registerHandlers(ipcMain)

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
