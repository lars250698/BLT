import { ApplicationSettings } from '../../../shared/src/models/application-settings-models'

export class ApplicationSettingsState {
  private static instance: ApplicationSettings | undefined = undefined

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static get(): ApplicationSettings {
    if (!ApplicationSettingsState.instance) {
      throw new Error('Application Settings have not been initialized')
    }
    return ApplicationSettingsState.instance
  }

  public static set(applicationSettings: ApplicationSettings) {
    ApplicationSettingsState.instance = applicationSettings
  }

  public static hasState(): boolean {
    return ApplicationSettingsState.instance != undefined
  }
}
