import { LoginProps } from '../../shared/src/props/auth-props'
import { ipcRenderer } from 'electron'

export interface IAuthIpc {
  login: (props: LoginProps) => Promise<void>
  savedCredentialsAvailable: () => Promise<boolean>
  loginWithSavedCredentials: () => Promise<void>
  logout: () => Promise<void>
  isLoggedIn: () => Promise<boolean>
}

export const enum AuthIpcChannel {
  Login = 'auth:login',
  SavedCredentialsAvailable = 'auth:saved-credentials-available',
  LoginWithSavedCredentials = 'auth:login-with-saved-credentials',
  Logout = 'auth:logout',
  IsLoggedIn = 'auth:is-logged-in'
}

export const authIpc: IAuthIpc = {
  login(props: LoginProps) {
    return ipcRenderer.invoke(AuthIpcChannel.Login, props)
  },
  savedCredentialsAvailable() {
    return ipcRenderer.invoke(AuthIpcChannel.SavedCredentialsAvailable)
  },
  loginWithSavedCredentials() {
    return ipcRenderer.invoke(AuthIpcChannel.LoginWithSavedCredentials)
  },
  logout() {
    return ipcRenderer.invoke(AuthIpcChannel.Logout)
  },
  isLoggedIn() {
    return ipcRenderer.invoke(AuthIpcChannel.IsLoggedIn)
  }
}
