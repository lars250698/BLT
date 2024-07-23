import { ipcMain } from 'electron'
import { StreamSettings } from '../../../shared/src/models/stream-settings-models'
import { StreamSettingsIpcChannel } from '../../../preload/ipc/stream-settings-ipc'
import {
  getStreamSettings,
  initializeStreamSettings,
  setScoreboardPage,
  setScoreboardPageSize,
  setScoreboardSelectedBodyWeightCategory,
  setSelectedCompetitionStageId,
  setStreamSettings,
  syncScoreboardSettings
} from '../../features/stream-settings'
import {
  SetScoreboardPageProps,
  SetScoreboardPageSizeProps,
  SetScoreboardSelectedBodyWeightCategoryProps
} from '../../../shared/src/props/stream-settings-props'
import IpcMainEvent = Electron.IpcMainEvent

export default function () {
  ipcMain.on(StreamSettingsIpcChannel.Set, (_: IpcMainEvent, streamSettings: StreamSettings) => {
    setStreamSettings(streamSettings)
  })

  ipcMain.on(
    StreamSettingsIpcChannel.SetSelectedCompetitionStageId,
    (_: IpcMainEvent, competitionStageId: string) => {
      setSelectedCompetitionStageId(competitionStageId)
    }
  )

  ipcMain.on(
    StreamSettingsIpcChannel.SetScoreboardPage,
    (_: IpcMainEvent, props: SetScoreboardPageProps) => {
      setScoreboardPage(props.scoreboardType, props.page)
    }
  )

  ipcMain.on(
    StreamSettingsIpcChannel.SetScoreboardPageSize,
    (_: IpcMainEvent, props: SetScoreboardPageSizeProps) => {
      setScoreboardPageSize(props.scoreboardType, props.pageSize)
    }
  )

  ipcMain.on(
    StreamSettingsIpcChannel.SetScoreboardSelectedBodyWeightCategory,
    (_: IpcMainEvent, props: SetScoreboardSelectedBodyWeightCategoryProps) => {
      setScoreboardSelectedBodyWeightCategory(props.scoreboardType, props.bodyWeightCategory)
    }
  )

  ipcMain.handle(StreamSettingsIpcChannel.SyncScoreboardSettings, syncScoreboardSettings)

  ipcMain.handle(StreamSettingsIpcChannel.Initialize, initializeStreamSettings)

  ipcMain.handle(StreamSettingsIpcChannel.Get, getStreamSettings)
}
