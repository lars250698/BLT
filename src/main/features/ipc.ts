import applicationSettingsController from '../controller/ipc/application-settings-controller'
import authController from '../controller/ipc/auth-controller'
import streamDataController from '../controller/ipc/stream-data-controller'
import streamSettingsController from '../controller/ipc/stream-settings-controller'
import utilController from '../controller/ipc/util-controller'
import apiController from '../controller/ipc/api-controller'

export function setupIpcControllers() {
  apiController()
  applicationSettingsController()
  authController()
  streamDataController()
  streamSettingsController()
  utilController()
}
