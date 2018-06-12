'use strict'

import { app, BrowserWindow } from 'electron'
// 衹允許單例運行
const appInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (global._win.main) {
    if (global._win.main.isMinimized()) global._win.main.restore()
    if (!global._win.main.isVisible()) global._win.main.show()
    global._win.main.focus()
  }
})
if (appInstance) { app.quit() }

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 714,
    height: 542,
    fullscreenable: false,
    center: true,
    frame: false,
    resizable: false,
    useContentSize: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
