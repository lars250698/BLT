import { ipcRenderer } from 'electron'

export interface IApiIpc {
  start: () => void
  stop: () => void
}

export const enum ApiIpcChannel {
  Start = 'api:start',
  Stop = 'api:stop'
}

export const apiIpc: IApiIpc = {
  start() {
    ipcRenderer.send(ApiIpcChannel.Start)
  },
  stop() {
    ipcRenderer.send(ApiIpcChannel.Stop)
  }
}
