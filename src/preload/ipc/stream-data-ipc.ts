import {
  AthleteAttempt,
  ScoreboardEntryBenchPress,
  ScoreboardEntryDeadlift,
  ScoreboardEntryOverall,
  ScoreboardEntrySquat
} from '../../shared/src/models/vportal-models'
import { ipcRenderer } from 'electron'

export interface IStreamDataIpc {
  getActiveAthleteAttempt: () => Promise<AthleteAttempt>
  getOverallScoreboard: () => Promise<ScoreboardEntryOverall[]>
  getSquatScoreboard: () => Promise<ScoreboardEntrySquat[]>
  getBenchPressScoreboard: () => Promise<ScoreboardEntryBenchPress[]>
  getDeadliftScoreboard: () => Promise<ScoreboardEntryDeadlift[]>
}

export const enum StreamDataIpcChannel {
  GetActiveAthleteAttempt = 'stream-data:get-active-athlete-attempt',
  GetOverallScoreboard = 'stream-data:get-overall-scoreboard',
  GetSquatScoreboard = 'stream-data:get-squat-scoreboard',
  GetBenchPressScoreboard = 'stream-data:get-bench-press-scoreboard',
  GetDeadliftScoreboard = 'stream-data:get-deadlift-scoreboard'
}

export const streamDataIpc: IStreamDataIpc = {
  getActiveAthleteAttempt(): Promise<AthleteAttempt> {
    return ipcRenderer.invoke(StreamDataIpcChannel.GetActiveAthleteAttempt)
  },
  getOverallScoreboard(): Promise<ScoreboardEntryOverall[]> {
    return ipcRenderer.invoke(StreamDataIpcChannel.GetOverallScoreboard)
  },
  getSquatScoreboard(): Promise<ScoreboardEntrySquat[]> {
    return ipcRenderer.invoke(StreamDataIpcChannel.GetSquatScoreboard)
  },
  getBenchPressScoreboard(): Promise<ScoreboardEntryBenchPress[]> {
    return ipcRenderer.invoke(StreamDataIpcChannel.GetBenchPressScoreboard)
  },
  getDeadliftScoreboard(): Promise<ScoreboardEntryDeadlift[]> {
    return ipcRenderer.invoke(StreamDataIpcChannel.GetDeadliftScoreboard)
  }
}
