import {
  AthleteAttempt,
  AttemptStatus,
  ScoreboardEntryBenchPress,
  ScoreboardEntryDeadlift,
  ScoreboardEntryOverall,
  ScoreboardEntrySquat
} from '../../../shared/src/models/vportal-models'
import {
  AthleteAttemptApiDto,
  ScoreboardEntryBenchPressApiDto,
  ScoreboardEntryDeadliftApiDto,
  ScoreboardEntryOverallApiDto,
  ScoreboardEntrySquatApiDto
} from './dto/stream-data-api-dtos'
import {
  prettyPrintLift,
  prettyPrintLot,
  prettyPrintWeight
} from '../../../shared/src/util/pretty-print'

const colorValid = '#00ff00ff'
const colorInvalid = '#ff0000ff'
const colorDefault = '#00000000'

export function mapScoreboardEntryOverallToApiDto(
  entry: ScoreboardEntryOverall
): ScoreboardEntryOverallApiDto {
  return {
    name: `${entry.firstName} ${entry.lastName}`,
    bodyweight: prettyPrintWeight(entry.bodyweight),
    lot: prettyPrintLot(entry.lot),
    total: prettyPrintWeight(entry.total),
    prognosis: prettyPrintWeight(entry.prognosis, '0'),
    bestSquat: prettyPrintWeight(entry.bestSquat, '0'),
    bestBenchPress: prettyPrintWeight(entry.bestBenchPress, '0'),
    bestDeadlift: prettyPrintWeight(entry.bestDeadlift, '0')
  }
}

export function mapScoreboardEntrySquatToApiDto(
  entry: ScoreboardEntrySquat
): ScoreboardEntrySquatApiDto {
  return {
    name: `${entry.firstName} ${entry.lastName}`,
    bodyweight: prettyPrintWeight(entry.bodyweight),
    lot: prettyPrintLot(entry.lot),
    total: prettyPrintWeight(entry.total),
    prognosis: prettyPrintWeight(entry.prognosis, '0'),
    attempt1: prettyPrintWeight(entry.attempt1),
    attempt2: prettyPrintWeight(entry.attempt2),
    attempt3: prettyPrintWeight(entry.attempt3),
    attemptColor1: mapColor(entry.attemptStatus1),
    attemptColor2: mapColor(entry.attemptStatus2),
    attemptColor3: mapColor(entry.attemptStatus3)
  }
}

export function mapScoreboardEntryBenchPressToApiDto(
  entry: ScoreboardEntryBenchPress
): ScoreboardEntryBenchPressApiDto {
  return {
    name: `${entry.firstName} ${entry.lastName}`,
    bodyweight: prettyPrintWeight(entry.bodyweight),
    lot: prettyPrintLot(entry.lot),
    total: prettyPrintWeight(entry.total),
    prognosis: prettyPrintWeight(entry.prognosis, '0'),
    bestSquat: prettyPrintWeight(entry.bestSquat, '0'),
    attempt1: prettyPrintWeight(entry.attempt1),
    attempt2: prettyPrintWeight(entry.attempt2),
    attempt3: prettyPrintWeight(entry.attempt3),
    attemptColor1: mapColor(entry.attemptStatus1),
    attemptColor2: mapColor(entry.attemptStatus2),
    attemptColor3: mapColor(entry.attemptStatus3)
  }
}

export function mapScoreboardEntryDeadliftToApiDto(
  entry: ScoreboardEntryDeadlift
): ScoreboardEntryDeadliftApiDto {
  return {
    name: `${entry.firstName} ${entry.lastName}`,
    bodyweight: prettyPrintWeight(entry.bodyweight),
    lot: prettyPrintLot(entry.lot),
    total: prettyPrintWeight(entry.total),
    prognosis: prettyPrintWeight(entry.prognosis, '0'),
    bestSquat: prettyPrintWeight(entry.bestSquat, '0'),
    bestBenchPress: prettyPrintWeight(entry.bestBenchPress, '0'),
    attempt1: prettyPrintWeight(entry.attempt1),
    attempt2: prettyPrintWeight(entry.attempt2),
    attempt3: prettyPrintWeight(entry.attempt3),
    attemptColor1: mapColor(entry.attemptStatus1),
    attemptColor2: mapColor(entry.attemptStatus2),
    attemptColor3: mapColor(entry.attemptStatus3)
  }
}

export function mapAthleteAttemptToApiDto(athleteAttempt: AthleteAttempt): AthleteAttemptApiDto {
  return {
    name: `${athleteAttempt.firstName} ${athleteAttempt.lastName}`,
    club: athleteAttempt.clubName,
    activeLift: prettyPrintLift(athleteAttempt.activeLift),
    compClass: athleteAttempt.compClass,
    total: prettyPrintWeight(athleteAttempt.total),
    prognosis: prettyPrintWeight(athleteAttempt.prognosis, '0'),
    placement: athleteAttempt.placement?.toString() ?? '-',
    bestSquat: prettyPrintWeight(athleteAttempt.bestSquat, '0'),
    bestBenchPress: prettyPrintWeight(athleteAttempt.bestBenchPress, '0'),
    bestDeadlift: prettyPrintWeight(athleteAttempt.bestDeadlift, '0'),
    attempt1: prettyPrintWeight(athleteAttempt.attempt1),
    attempt2: prettyPrintWeight(athleteAttempt.attempt2),
    attempt3: prettyPrintWeight(athleteAttempt.attempt3),
    attemptColor1: mapColor(athleteAttempt.attemptStatus1),
    attemptColor2: mapColor(athleteAttempt.attemptStatus2),
    attemptColor3: mapColor(athleteAttempt.attemptStatus3)
  }
}

function mapColor(attemptStatus: AttemptStatus): string {
  switch (attemptStatus) {
    case AttemptStatus.Valid:
      return colorValid
    case AttemptStatus.Invalid:
    case AttemptStatus.Skip:
      return colorInvalid
    default:
      return colorDefault
  }
}
