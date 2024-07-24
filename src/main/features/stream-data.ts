import {
  AthleteAttempt,
  ScoreboardEntryBenchPress,
  ScoreboardEntryDeadlift,
  ScoreboardEntryOverall,
  ScoreboardEntrySquat
} from '../../shared/src/models/vportal-models'
import * as streamDataRepository from '../repository/vportal/stream-data-repository'
import { StreamSettingsState } from '../state/settings/stream-settings'
import { getOffset } from '../util/utils'
import { ScoreboardType } from '../../shared/src/models/stream-settings-models'

export function getActiveAthleteAttempt(): Promise<AthleteAttempt> {
  const settings = StreamSettingsState.get()
  return streamDataRepository.getActiveAthleteAttempt(
    settings.competitionId,
    settings.selectedCompetitionStageId
  )
}

export function getOverallScoreboard(): Promise<ScoreboardEntryOverall[]> {
  const settings = StreamSettingsState.get()
  return streamDataRepository.getOverallScoreboard(
    settings.competitionId,
    settings.overallScoreboardSettings.selectedBodyWeightCategoryId,
    settings.overallScoreboardSettings.pageSize,
    getOffset(settings.overallScoreboardSettings.page, settings.overallScoreboardSettings.pageSize)
  )
}

export function getSquatScoreboard(): Promise<ScoreboardEntrySquat[]> {
  const settings = StreamSettingsState.get()
  return streamDataRepository.getSquatScoreboard(
    settings.competitionId,
    settings.squatScoreboardSettings.selectedBodyWeightCategoryId,
    settings.squatScoreboardSettings.pageSize,
    getOffset(settings.squatScoreboardSettings.page, settings.squatScoreboardSettings.pageSize)
  )
}

export function getBenchPressScoreboard(): Promise<ScoreboardEntryBenchPress[]> {
  const settings = StreamSettingsState.get()
  return streamDataRepository.getBenchPressScoreboard(
    settings.competitionId,
    settings.benchPressScoreboardSettings.selectedBodyWeightCategoryId,
    settings.benchPressScoreboardSettings.pageSize,
    getOffset(
      settings.benchPressScoreboardSettings.page,
      settings.benchPressScoreboardSettings.pageSize
    )
  )
}

export function getDeadliftScoreboard(): Promise<ScoreboardEntryDeadlift[]> {
  const settings = StreamSettingsState.get()
  return streamDataRepository.getDeadliftScoreboard(
    settings.competitionId,
    settings.deadliftScoreboardSettings.selectedBodyWeightCategoryId,
    settings.deadliftScoreboardSettings.pageSize,
    getOffset(
      settings.deadliftScoreboardSettings.page,
      settings.deadliftScoreboardSettings.pageSize
    )
  )
}

export function getSelectedScoreboardGroupName(scoreboardType: ScoreboardType): Promise<string> {
  return new Promise((resolve, reject) => {
    const settings = StreamSettingsState.get()
    let selectedId = ''
    switch (scoreboardType) {
      case ScoreboardType.Overall:
      case ScoreboardType.All:
        selectedId = settings.overallScoreboardSettings.selectedBodyWeightCategoryId
        break
      case ScoreboardType.Squat:
        selectedId = settings.squatScoreboardSettings.selectedBodyWeightCategoryId
        break
      case ScoreboardType.Bench:
        selectedId = settings.benchPressScoreboardSettings.selectedBodyWeightCategoryId
        break
      case ScoreboardType.Deadlift:
        selectedId = settings.deadliftScoreboardSettings.selectedBodyWeightCategoryId
        break
    }
    const group = settings.availableBodyWeightCategories.find((group) => group.id === selectedId)
    if (!group) {
      reject(new Error('Selected group is not in available groups'))
    } else {
      resolve(`${group.ageCategoryName} ${group.name}`)
    }
  })
}
