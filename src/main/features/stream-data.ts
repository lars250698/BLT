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
