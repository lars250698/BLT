import { join } from 'path'
import { app } from 'electron'
import { readFileOrDefault, writeFile } from '../util/fs-utils'
import { ApplicationSettings } from '../../shared/src/models/application-settings-models'
import { ApplicationSettingsState } from '../state/settings/application-settings'

const settingsPath = join(app.getPath('userData'), 'app-settings.json')
const defaultAppSettings: ApplicationSettings = {
  vportalUrl: 'https://bvdk.vportal-online.de',
  loginProxyUrl:
    'https://818wrx6ocb.execute-api.eu-central-1.amazonaws.com/default/vportal-auth-proxy',
  apiPort: 8000
}

export function getApplicationSettings(): ApplicationSettings {
  if (!ApplicationSettingsState.hasState()) {
    initializeApplicationSettings()
  }
  return ApplicationSettingsState.get()
}

export function setApplicationSettings(applicationSettings: ApplicationSettings) {
  ApplicationSettingsState.set(applicationSettings)
  saveSettingsToFilesystem(applicationSettings)
}

export function resetApplicationSettings() {
  setApplicationSettings(defaultAppSettings)
}

function initializeApplicationSettings() {
  const settings = loadSettingsFromFilesystem()
  ApplicationSettingsState.set(settings)
}

function loadSettingsFromFilesystem(): ApplicationSettings {
  return readFileOrDefault(settingsPath, defaultAppSettings)
}

function saveSettingsToFilesystem(settings: ApplicationSettings) {
  writeFile(settingsPath, settings)
}
