import { BrowserWindow } from 'electron'

export class WindowInstances {
  private static mainWindow: BrowserWindow | undefined
  private static streamOverlayWindows: BrowserWindow[] = []

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static setMainWindow(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow
  }

  public static addStreamOverlayWindow(window: BrowserWindow) {
    this.streamOverlayWindows.push(window)
  }

  public static getMainWindow(): BrowserWindow {
    if (!this.mainWindow) {
      throw new Error('Window has not yet been initialized')
    }
    return this.mainWindow
  }

  public static getStreamOverlayWindows(): BrowserWindow[] {
    return this.streamOverlayWindows
  }

  public static removeStreamOverlayWindow(windowId: number) {
    this.streamOverlayWindows = this.streamOverlayWindows.filter((window) => window.id !== windowId)
  }

  public static clearMainWindow() {
    this.mainWindow?.close()
    this.mainWindow = undefined
  }

  public static clearStreamOverlayWindows() {
    this.streamOverlayWindows.forEach((window) => window.close())
    this.streamOverlayWindows = []
  }

  public static clear() {
    this.clearMainWindow()
    this.clearStreamOverlayWindows()
  }
}
