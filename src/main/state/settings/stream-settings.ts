import { StreamSettings } from '../../../shared/src/models/stream-settings-models'
import { shallowEqual } from '../../util/utils'

export type StreamSettingsStateCallbackFunc = (arg0: StreamSettings) => void

export class StreamSettingsState {
  private static instance: StreamSettings | undefined

  private static callbacks: StreamSettingsStateCallbackFunc[] = []

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public static get(): StreamSettings {
    if (!this.instance) {
      throw new Error('Stream settings have not been initialized')
    }
    return this.instance
  }

  public static set(streamSettings: StreamSettings) {
    if (shallowEqual(StreamSettingsState.instance, streamSettings)) {
      return
    }
    StreamSettingsState.instance = streamSettings
    this.callbacks.forEach((callback) => callback(streamSettings))
  }

  public static destroy() {
    this.instance = undefined
  }

  public static hasInstance(): boolean {
    return this.instance != undefined
  }

  public static registerCallback(callbackFunc: StreamSettingsStateCallbackFunc) {
    this.callbacks.push(callbackFunc)
  }
}
