import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { BrowserWindow } from 'electron'
import icon from '../../../resources/icon.png?asset'
import { WindowInstances } from '../state/window/main-window'

export function createMainWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1150,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    show: false,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    frame: process.platform !== 'darwin',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler(() => {
    return {
      action: 'deny'
    }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  WindowInstances.setMainWindow(mainWindow)
}

export function createTransparentWindow(
  route: string,
  width: number,
  height: number,
  minWidth: number | undefined,
  minHeight: number | undefined,
  maxWidth: number | undefined,
  maxHeight: number | undefined
) {
  const window = new BrowserWindow({
    width: width,
    height: height,
    minWidth: minWidth,
    minHeight: minHeight,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    show: false,
    autoHideMenuBar: true,
    transparent: true,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: false,
      webSecurity: false
    }
  })

  window.on('ready-to-show', () => {
    window.show()
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    window.loadURL(process.env['ELECTRON_RENDERER_URL'] + route)
  } else {
    window.loadFile(join(__dirname, '../renderer/index.html' + route))
  }

  WindowInstances.addStreamOverlayWindow(window)
}
