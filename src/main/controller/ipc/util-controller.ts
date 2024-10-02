import { ipcMain } from 'electron'
import { UtilIpcChannel } from '../../../preload/ipc/util-ipc'
import { WindowInstances } from '../../state/window/main-window'
import { OpenNewStreamOverlayWindowProps } from '../../../shared/src/props/util-props'
import { createTransparentWindow } from '../../features/window'
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent
import IpcMainEvent = Electron.IpcMainEvent

export default function () {
  ipcMain.handle(UtilIpcChannel.GetPlatform, async () => {
    return process.platform
  })

  ipcMain.on(UtilIpcChannel.CloseAllWindowsExceptMain, () => {
    WindowInstances.clearStreamOverlayWindows()
  })

  ipcMain.handle(UtilIpcChannel.IsMainWindow, async (event: IpcMainInvokeEvent) => {
    return event.sender.id === WindowInstances.getMainWindow().id
  })

  ipcMain.on(
    UtilIpcChannel.OpenNewStreamOverlayWindow,
    (_: IpcMainEvent, props: OpenNewStreamOverlayWindowProps) => {
      createTransparentWindow(
        props.path,
        props.width,
        props.height,
        props.minWidth,
        props.minHeight,
        props.maxWidth,
        props.maxHeight
      )
    }
  )
}
