import { defaultSharedState, SharedState } from '../../../shared/src/models/state-models'

export interface State {
  sharedState: SharedState
}

export const defaultState: State = {
  sharedState: defaultSharedState
}
