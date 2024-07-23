import { VuexState } from '../state/window/vuex-state'
import { SharedState } from '../../shared/src/models/state-models'
import { StateIpcChannel } from '../../preload/ipc/state-ipc'
import { BrowserWindow, ipcMain } from 'electron'
import IpcMainEvent = Electron.IpcMainEvent

export function setupVuexStateSync() {
  VuexState.registerCallback((state: SharedState) => {
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send(StateIpcChannel.UpdateHandler, state)
    })
  })

  ipcMain.on(StateIpcChannel.Update, (_: IpcMainEvent, state: SharedState) => {
    VuexState.set(state)
  })

  ipcMain.handle(StateIpcChannel.Connect, async () => {
    return VuexState.get()
  })
}
