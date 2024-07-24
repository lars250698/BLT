import { ScoreboardType, StreamSettings } from '../../shared/src/models/stream-settings-models'
import { VportalConnection } from '../state/vportal/vportal-connection'
import {
  getInitialStreamSettings,
  getNewScoreboardSettingsWithPageSize,
  refreshStreamSettings
} from '../repository/vportal/stream-settings-repository'
import { StreamSettingsState } from '../state/settings/stream-settings'

let refreshInterval: NodeJS.Timeout | undefined

export function setStreamSettings(streamSettings: StreamSettings) {
  StreamSettingsState.set(streamSettings)
}

export function getStreamSettings(): StreamSettings {
  return StreamSettingsState.get()
}

export function setSelectedCompetitionStageId(competitionStageId: string) {
  const state = StreamSettingsState.get()
  state.selectedCompetitionStageId = competitionStageId
  StreamSettingsState.set(state)
}

export function setScoreboardPage(scoreboardType: ScoreboardType, page: number) {
  const state = StreamSettingsState.get()
  switch (scoreboardType) {
    case ScoreboardType.Overall:
      state.overallScoreboardSettings.page = page
      break
    case ScoreboardType.Squat:
      state.squatScoreboardSettings.page = page
      break
    case ScoreboardType.Bench:
      state.benchPressScoreboardSettings.page = page
      break
    case ScoreboardType.Deadlift:
      state.deadliftScoreboardSettings.page = page
      break
    case ScoreboardType.All:
      state.overallScoreboardSettings.page = page
      state.squatScoreboardSettings.page = page
      state.benchPressScoreboardSettings.page = page
      state.deadliftScoreboardSettings.page = page
      break
  }
  StreamSettingsState.set(state)
}

export function setScoreboardPageSize(scoreboardType: ScoreboardType, pageSize: number) {
  const state = StreamSettingsState.get()
  switch (scoreboardType) {
    case ScoreboardType.Overall:
      getNewScoreboardSettingsWithPageSize(
        state.overallScoreboardSettings,
        state.competitionId,
        pageSize
      ).then((res) => {
        state.overallScoreboardSettings = res
        StreamSettingsState.set(state)
      })
      break
    case ScoreboardType.Squat:
      getNewScoreboardSettingsWithPageSize(
        state.squatScoreboardSettings,
        state.competitionId,
        pageSize
      ).then((res) => {
        state.squatScoreboardSettings = res
        StreamSettingsState.set(state)
      })
      break
    case ScoreboardType.Bench:
      getNewScoreboardSettingsWithPageSize(
        state.benchPressScoreboardSettings,
        state.competitionId,
        pageSize
      ).then((res) => {
        state.benchPressScoreboardSettings = res
        StreamSettingsState.set(state)
      })
      break
    case ScoreboardType.Deadlift:
      getNewScoreboardSettingsWithPageSize(
        state.deadliftScoreboardSettings,
        state.competitionId,
        pageSize
      ).then((res) => {
        state.deadliftScoreboardSettings = res
        StreamSettingsState.set(state)
      })
      break
    case ScoreboardType.All:
      getNewScoreboardSettingsWithPageSize(
        state.overallScoreboardSettings,
        state.competitionId,
        pageSize
      ).then((res) => {
        state.overallScoreboardSettings = res
        state.squatScoreboardSettings = res
        state.benchPressScoreboardSettings = res
        state.deadliftScoreboardSettings = res
      })
  }
}

export function setScoreboardSelectedBodyWeightCategory(
  scoreboardType: ScoreboardType,
  bodyWeightCategory: string
) {
  const state = StreamSettingsState.get()
  switch (scoreboardType) {
    case ScoreboardType.Overall:
      state.overallScoreboardSettings.selectedBodyWeightCategoryId = bodyWeightCategory
      break
    case ScoreboardType.Squat:
      state.squatScoreboardSettings.selectedBodyWeightCategoryId = bodyWeightCategory
      break
    case ScoreboardType.Bench:
      state.benchPressScoreboardSettings.selectedBodyWeightCategoryId = bodyWeightCategory
      break
    case ScoreboardType.Deadlift:
      state.deadliftScoreboardSettings.selectedBodyWeightCategoryId = bodyWeightCategory
      break
    case ScoreboardType.All:
      state.overallScoreboardSettings.selectedBodyWeightCategoryId = bodyWeightCategory
      state.squatScoreboardSettings.selectedBodyWeightCategoryId = bodyWeightCategory
      state.benchPressScoreboardSettings.selectedBodyWeightCategoryId = bodyWeightCategory
      state.deadliftScoreboardSettings.selectedBodyWeightCategoryId = bodyWeightCategory
      break
  }
  StreamSettingsState.set(state)
}

export function syncScoreboardSettings(): Promise<void> {
  return new Promise((resolve) => {
    const state = StreamSettingsState.get()
    state.squatScoreboardSettings = { ...state.overallScoreboardSettings }
    state.benchPressScoreboardSettings = { ...state.overallScoreboardSettings }
    state.deadliftScoreboardSettings = { ...state.overallScoreboardSettings }
    StreamSettingsState.set(state)
    resolve()
  })
}

export async function initializeStreamSettings(): Promise<StreamSettings> {
  if (!VportalConnection.hasInstance()) {
    throw new Error(
      'Cannot initialize stream settings since connection to Vportal has not been initialized'
    )
  }
  const initialState = await getInitialStreamSettings()
  StreamSettingsState.set(initialState)
  setupStreamSettingsRefresh()
  return initialState
}

export function setupStreamSettingsRefresh() {
  refreshInterval = setInterval(() => {
    if (StreamSettingsState.hasInstance()) {
      refreshStreamSettings(StreamSettingsState.get()).then((res) => StreamSettingsState.set(res))
    }
  }, 10000)
}

export function cancelStreamSettingsRefresh() {
  clearInterval(refreshInterval)
}
