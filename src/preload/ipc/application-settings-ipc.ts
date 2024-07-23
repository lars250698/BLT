import { ApplicationSettings } from '../../shared/src/models/application-settings-models'
import { ipcRenderer } from 'electron'

export interface IApplicationSettingsIpc {
  set: (props: ApplicationSettings) => void
  get: () => Promise<ApplicationSettings>
  reset: () => void
}

export const enum ApplicationSettingsIpcChannel {
  Set = 'application-settings:set',
  Get = 'application-settings:get',
  Reset = 'application-settings:reset'
}

export const applicationSettingsIpc: IApplicationSettingsIpc = {
  set(applicationSettings: ApplicationSettings) {
    ipcRenderer.send(ApplicationSettingsIpcChannel.Set, applicationSettings)
  },
  get() {
    return ipcRenderer.invoke(ApplicationSettingsIpcChannel.Get)
  },
  reset() {
    ipcRenderer.send(ApplicationSettingsIpcChannel.Reset)
  }
}
