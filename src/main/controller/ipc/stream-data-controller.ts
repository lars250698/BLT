import { ipcMain } from 'electron'
import { StreamDataIpcChannel } from '../../../preload/ipc/stream-data-ipc'
import {
  getActiveAthleteAttempt,
  getBenchPressScoreboard,
  getDeadliftScoreboard,
  getOverallScoreboard,
  getSquatScoreboard
} from '../../features/stream-data'

export default function () {
  ipcMain.handle(StreamDataIpcChannel.GetActiveAthleteAttempt, getActiveAthleteAttempt)

  ipcMain.handle(StreamDataIpcChannel.GetOverallScoreboard, getOverallScoreboard)

  ipcMain.handle(StreamDataIpcChannel.GetSquatScoreboard, getSquatScoreboard)

  ipcMain.handle(StreamDataIpcChannel.GetBenchPressScoreboard, getBenchPressScoreboard)

  ipcMain.handle(StreamDataIpcChannel.GetDeadliftScoreboard, getDeadliftScoreboard)
}
