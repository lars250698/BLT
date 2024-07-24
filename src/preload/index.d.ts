import { ElectronAPI } from '@electron-toolkit/preload'
import { ILivestreamToolsApi } from './index'
import { IUtil } from './util'
import { ICredentials } from './credentials'
import { IAuthIpc } from './ipc/auth-ipc'
import { IApplicationSettingsIpc } from './ipc/application-settings-ipc'
import { IStreamSettingsIpc } from './ipc/stream-settings-ipc'
import { IStreamDataIpc } from './ipc/stream-data-ipc'
import { IUtilIpc } from './ipc/util-ipc'
import { IApiIpc } from './ipc/api-ipc'
import { IStateIpc } from './ipc/state-ipc'

declare global {
  interface Window {
    auth: IAuthIpc
    applicationSettings: IApplicationSettingsIpc
    streamSettings: IStreamSettingsIpc
    streamData: IStreamDataIpc
    util: IUtilIpc
    api: IApiIpc
    stateSync: IStateIpc
  }
}
