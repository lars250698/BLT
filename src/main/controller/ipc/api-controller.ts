import { ipcMain } from 'electron'
import { ApiIpcChannel } from '../../../preload/ipc/api-ipc'
import { startServer, stopServer } from '../../features/express-server'

export default function () {
  ipcMain.on(ApiIpcChannel.Start, () => {
    startServer()
  })

  ipcMain.on(ApiIpcChannel.Stop, () => {
    stopServer()
  })
}
