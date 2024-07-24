import { ipcMain } from 'electron'
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent
import { LoginProps } from '../../../shared/src/props/auth-props'
import { login, logout } from '../../features/auth'
import {
  clearCredentials,
  credentialsAvailable,
  loadCredentials,
  saveCredentials
} from '../../features/credentials-storage'
import { AuthIpcChannel } from '../../../preload/ipc/auth-ipc'
import { VportalConnection } from '../../state/vportal/vportal-connection'

export default function () {
  ipcMain.handle(AuthIpcChannel.Login, (_: IpcMainInvokeEvent, props: LoginProps) => {
    return new Promise<void>((resolve, reject) => {
      login(props.credentials)
        .then(() => {
          if (props.saveLogin) {
            saveCredentials(props.credentials)
          }
          resolve()
        })
        .catch((err) => reject(err))
    })
  })

  ipcMain.handle(AuthIpcChannel.SavedCredentialsAvailable, () => credentialsAvailable())

  ipcMain.handle(AuthIpcChannel.LoginWithSavedCredentials, () => {
    return new Promise<void>((resolve, reject) => {
      if (!credentialsAvailable()) {
        reject(
          new Error('Tried to login with saved credentials, but no credentials were available')
        )
      }
      loadCredentials()
        .then((credentials) => {
          return login(credentials)
        })
        .then(() => resolve())
        .catch((err) => {
          clearCredentials()
          reject(err)
        })
    })
  })

  ipcMain.handle(AuthIpcChannel.Logout, () => {
    return new Promise<void>((resolve) => {
      logout()
      clearCredentials()
      resolve()
    })
  })

  ipcMain.handle(AuthIpcChannel.IsLoggedIn, async () => {
    return VportalConnection.hasInstance()
  })
}
