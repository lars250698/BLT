import { ipcMain } from 'electron'
import IpcMainEvent = Electron.IpcMainEvent
import { ApplicationSettings } from '../../../shared/src/models/application-settings-models'
import { ApplicationSettingsIpcChannel } from '../../../preload/ipc/application-settings-ipc'
import {
  getApplicationSettings,
  resetApplicationSettings,
  setApplicationSettings
} from '../../features/application-settings'

export default function () {
  ipcMain.on(
    ApplicationSettingsIpcChannel.Set,
    (_: IpcMainEvent, applicationSettings: ApplicationSettings) => {
      setApplicationSettings(applicationSettings)
    }
  )

  ipcMain.handle(ApplicationSettingsIpcChannel.Get, async () => {
    return getApplicationSettings()
  })

  ipcMain.on(ApplicationSettingsIpcChannel.Reset, () => {
    resetApplicationSettings()
  })
}
