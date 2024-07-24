import { defaultSharedState, SharedState } from '../../../shared/src/models/state-models'
import { shallowEqual } from '../../util/utils'

export type VuexStateUpdateCallbackFunction = (state: SharedState) => void

export class VuexState {
  private static instance: SharedState = defaultSharedState
  private static callbacks: VuexStateUpdateCallbackFunction[] = []

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static set(state: SharedState) {
    if (!shallowEqual(state, this.instance)) {
      this.instance = state
      this.callbacks.forEach((callback) => callback(state))
    }
  }

  public static get(): SharedState {
    return this.instance
  }

  public static registerCallback(callback: VuexStateUpdateCallbackFunction) {
    this.callbacks.push(callback)
  }
}
