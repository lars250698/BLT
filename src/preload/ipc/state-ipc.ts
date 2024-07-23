import { ipcRenderer } from 'electron'
import IpcRendererEvent = Electron.IpcRendererEvent
import { SharedState } from '../../shared/src/models/state-models'

export interface IStateIpc {
  connect: () => Promise<SharedState>
  stateUpdate: (state: SharedState) => void
  stateUpdateHandler: (handler: (state: SharedState) => void) => void
}

export const enum StateIpcChannel {
  Connect = 'state:vuex-connect',
  Update = 'state:update',
  UpdateHandler = 'state:update-handler'
}

export const stateIpc: IStateIpc = {
  async connect() {
    return ipcRenderer.invoke(StateIpcChannel.Connect)
  },
  stateUpdate(state: SharedState) {
    ipcRenderer.send(StateIpcChannel.Update, state)
  },
  stateUpdateHandler(handler: (state: SharedState) => void) {
    ipcRenderer.on(StateIpcChannel.UpdateHandler, (_: IpcRendererEvent, state: SharedState) => {
      handler(state)
    })
  }
}
