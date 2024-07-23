import { contextBridge } from 'electron'
import { authIpc } from './ipc/auth-ipc'
import { applicationSettingsIpc } from './ipc/application-settings-ipc'
import { streamSettingsIpc } from './ipc/stream-settings-ipc'
import { streamDataIpc } from './ipc/stream-data-ipc'
import { utilIpc } from './ipc/util-ipc'
import { apiIpc } from './ipc/api-ipc'
import { stateIpc } from './ipc/state-ipc'

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('auth', authIpc)
    contextBridge.exposeInMainWorld('applicationSettings', applicationSettingsIpc)
    contextBridge.exposeInMainWorld('streamSettings', streamSettingsIpc)
    contextBridge.exposeInMainWorld('streamData', streamDataIpc)
    contextBridge.exposeInMainWorld('util', utilIpc)
    contextBridge.exposeInMainWorld('api', apiIpc)
    contextBridge.exposeInMainWorld('stateSync', stateIpc)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.auth = authIpc
  // @ts-ignore (define in dts)
  window.applicationSettings = applicationSettingsIpc
  // @ts-ignore (define in dts)
  window.streamSettings = streamSettingsIpc
  // @ts-ignore (define in dts)
  window.streamData = streamDataIpc
  // @ts-ignore (define in dts)
  window.util = utilIpc
  // @ts-ignore (define in dts)
  window.api = apiIpc
  // @ts-ignore (define in dts)
  window.stateSync = stateIpc
}
