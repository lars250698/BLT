import { StreamSettings } from '../../shared/src/models/stream-settings-models'
import { ipcRenderer } from 'electron'
import {
  SetScoreboardPageProps,
  SetScoreboardPageSizeProps,
  SetScoreboardSelectedBodyWeightCategoryProps
} from '../../shared/src/props/stream-settings-props'

export interface IStreamSettingsIpc {
  set: (streamSettings: StreamSettings) => void
  get: () => Promise<StreamSettings>
  setSelectedCompetitionStageId: (competitionStageId: string) => void
  setScoreboardPage: (props: SetScoreboardPageProps) => void
  setScoreboardPageSize: (props: SetScoreboardPageSizeProps) => void
  setScoreboardSelectedBodyWeightCategory: (
    props: SetScoreboardSelectedBodyWeightCategoryProps
  ) => void
  syncScoreboardSettings: () => Promise<void>
  initialize: () => Promise<StreamSettings>
}

export const enum StreamSettingsIpcChannel {
  Set = 'stream-settings:set',
  Get = 'stream-settings:get',
  SetSelectedCompetitionStageId = 'stream-settings:set-selected-competition-stage-id',
  SetScoreboardPage = 'stream-settings:set-scoreboard-page',
  SetScoreboardPageSize = 'stream-settings:set-scoreboard-page-size',
  SetScoreboardSelectedBodyWeightCategory = 'stream-settings:set-scoreboard-selected-body-weight-category',
  SyncScoreboardSettings = 'stream-settings:sync-scoreboard-settings',
  Initialize = 'stream-settings:initialize'
}

export const streamSettingsIpc: IStreamSettingsIpc = {
  set(streamSettings: StreamSettings) {
    ipcRenderer.send(StreamSettingsIpcChannel.Set, streamSettings)
  },
  get() {
    return ipcRenderer.invoke(StreamSettingsIpcChannel.Get)
  },
  initialize(): Promise<StreamSettings> {
    return ipcRenderer.invoke(StreamSettingsIpcChannel.Initialize)
  },
  setScoreboardPage(props: SetScoreboardPageProps) {
    ipcRenderer.send(StreamSettingsIpcChannel.SetScoreboardPage, props)
  },
  setScoreboardPageSize(props: SetScoreboardPageSizeProps) {
    ipcRenderer.send(StreamSettingsIpcChannel.SetScoreboardPageSize, props)
  },
  setScoreboardSelectedBodyWeightCategory(props: SetScoreboardSelectedBodyWeightCategoryProps) {
    ipcRenderer.send(StreamSettingsIpcChannel.SetScoreboardSelectedBodyWeightCategory, props)
  },
  syncScoreboardSettings() {
    return ipcRenderer.invoke(StreamSettingsIpcChannel.SyncScoreboardSettings)
  },
  setSelectedCompetitionStageId(competitionStageId: string) {
    ipcRenderer.send(StreamSettingsIpcChannel.SetSelectedCompetitionStageId, competitionStageId)
  }
}
