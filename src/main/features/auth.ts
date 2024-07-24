import { Credentials } from '../../shared/src/props/auth-props'
import { VportalConnection } from '../state/vportal/vportal-connection'
import axios from 'axios'
import { getApplicationSettings } from './application-settings'
import { cancelStreamSettingsRefresh } from './stream-settings'
import { StreamSettingsState } from '../state/settings/stream-settings'

export async function login(credentials: Credentials): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const applicationSettings = getApplicationSettings()
      axios
        .get(applicationSettings.loginProxyUrl, {
          params: {
            username: credentials.identity,
            password: credentials.credential,
            url: applicationSettings.vportalUrl
          }
        })
        .then((res) => {
          const token = res.data.token
          VportalConnection.initialize(applicationSettings.vportalUrl, token)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    } catch (e) {
      reject(e)
    }
  })
}

export function logout() {
  VportalConnection.destroy()
  cancelStreamSettingsRefresh()
  StreamSettingsState.destroy()
}
