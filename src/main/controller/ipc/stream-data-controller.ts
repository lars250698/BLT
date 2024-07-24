import { ipcMain } from 'electron'
import { StreamDataIpcChannel } from '../../../preload/ipc/stream-data-ipc'
import {
  getActiveAthleteAttempt,
  getBenchPressScoreboard,
  getDeadliftScoreboard,
  getOverallScoreboard,
  getSelectedScoreboardGroupName,
  getSquatScoreboard
} from '../../features/stream-data'
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent
import { ScoreboardType } from '../../../shared/src/models/stream-settings-models'

export default function () {
  ipcMain.handle(StreamDataIpcChannel.GetActiveAthleteAttempt, getActiveAthleteAttempt)

  ipcMain.handle(StreamDataIpcChannel.GetOverallScoreboard, getOverallScoreboard)

  ipcMain.handle(StreamDataIpcChannel.GetSquatScoreboard, getSquatScoreboard)

  ipcMain.handle(StreamDataIpcChannel.GetBenchPressScoreboard, getBenchPressScoreboard)

  ipcMain.handle(StreamDataIpcChannel.GetDeadliftScoreboard, getDeadliftScoreboard)

  ipcMain.handle(
    StreamDataIpcChannel.GetSelectedScoreboardGroupName,
    (_: IpcMainInvokeEvent, scoreboardType: ScoreboardType) => {
      return getSelectedScoreboardGroupName(scoreboardType)
    }
  )
}
