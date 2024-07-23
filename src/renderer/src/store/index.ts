import { createStore } from 'vuex'
import { SharedState } from '../../../shared/src/models/state-models'
import { ipcSyncPlugin } from './ipcSync'
import { defaultState, State } from './state'
import { ScoreboardType } from '../../../shared/src/models/stream-settings-models'

const getters = {}

const actions = {}

const mutations = {
  updateSharedState(state: State, sharedState: SharedState) {
    state.sharedState = sharedState
  },
  setSelectedScoreboardType(state: State, scoreboardType: ScoreboardType) {
    state.sharedState.selectedScoreboardType = scoreboardType
  }
}

export default createStore({
  state: defaultState,
  getters,
  actions,
  mutations,
  plugins: [ipcSyncPlugin]
})
