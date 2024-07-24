import { MutationPayload, Store } from 'vuex'
import { State } from './state'
import { SharedState } from '../../../shared/src/models/state-models'

export const ipcSyncPlugin = (store: Store<State>) => {
  const updateState = (sharedState: SharedState) => {
    store.commit('updateSharedState', sharedState)
  }

  window.stateSync.connect().then(updateState)

  window.stateSync.stateUpdateHandler(updateState)

  store.subscribe((_: MutationPayload, state: State) => {
    window.stateSync.stateUpdate({ ...state.sharedState })
  })
}
