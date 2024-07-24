export interface LoginProps {
  credentials: Credentials
  saveLogin: boolean
}

export interface Credentials {
  identity: string
  credential: string
}
