import { ipcRenderer } from 'electron'
import { OpenNewStreamOverlayWindowProps } from '../../shared/src/props/util-props'

export interface IUtilIpc {
  getPlatform: () => Promise<string>
  closeAllWindowsExceptMain: () => void
  isMainWindow: () => Promise<boolean>
  openNewStreamOverlayWindow: (props: OpenNewStreamOverlayWindowProps) => void
}

export const enum UtilIpcChannel {
  GetPlatform = 'util:get-platform',
  CloseAllWindowsExceptMain = 'util:close-all-windows-except-main',
  IsMainWindow = 'util:is-main-window',
  OpenNewStreamOverlayWindow = 'util:open-new-stream-overlay-window'
}

export const utilIpc: IUtilIpc = {
  getPlatform() {
    return ipcRenderer.invoke(UtilIpcChannel.GetPlatform)
  },
  closeAllWindowsExceptMain() {
    ipcRenderer.send(UtilIpcChannel.CloseAllWindowsExceptMain)
  },
  isMainWindow(): Promise<boolean> {
    return ipcRenderer.invoke(UtilIpcChannel.IsMainWindow)
  },
  openNewStreamOverlayWindow(props: OpenNewStreamOverlayWindowProps) {
    ipcRenderer.send(UtilIpcChannel.OpenNewStreamOverlayWindow, props)
  }
}
