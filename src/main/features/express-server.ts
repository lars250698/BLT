import { ApplicationSettingsState } from '../state/settings/application-settings'
import cors from 'cors'
import express, { Express } from 'express'
import { ExpressServerInstance } from '../state/api/express-server'
import scoreboardController from '../controller/api/scoreboard-controller'
import activeAttemptController from '../controller/api/active-attempt-controller'

export function startServer() {
  ExpressServerInstance.clear()
  const settings = ApplicationSettingsState.get()
  const port = settings.apiPort
  const app: Express = express()
  app.use('/scoreboard', scoreboardController)
  app.use(activeAttemptController)
  app.use(cors())
  const server = app.listen(port)
  ExpressServerInstance.set(server)
}

export function stopServer() {
  ExpressServerInstance.clear()
}
