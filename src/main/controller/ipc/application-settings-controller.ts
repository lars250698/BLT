import { ipcMain } from 'electron'
import { ApplicationSettings } from '../../../shared/src/models/application-settings-models'
import { ApplicationSettingsIpcChannel } from '../../../preload/ipc/application-settings-ipc'
import {
  getApplicationSettings,
  resetApplicationSettings,
  setApplicationSettings
} from '../../features/application-settings'
import IpcMainEvent = Electron.IpcMainEvent

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
