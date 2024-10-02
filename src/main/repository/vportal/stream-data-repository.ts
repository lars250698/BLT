import {
  AthleteAttempt,
  AttemptStatus,
  Lift,
  ScoreboardEntryBenchPress,
  ScoreboardEntryDeadlift,
  ScoreboardEntryOverall,
  ScoreboardEntrySquat
} from '../../../shared/src/models/vportal-models'
import {
  activeAthlete,
  activeGroupsOnStage,
  scoreboard
} from '../../datasource/vportal/vportal-datasource'
import { VportalConnection } from '../../state/vportal/vportal-connection'
import {
  CompetitionAthlete,
  CompetitionAthleteAttempt,
  Discipline,
  ScoreboardQueryResult
} from '../../datasource/vportal/dao/vportal-daos'
import { limitOffset } from '../../util/utils'

export async function getActiveAthleteAttempt(
  competitionId: string,
  competitionStageId: string
): Promise<AthleteAttempt> {
  const client = VportalConnection.getInstance()
  const groups = await activeGroupsOnStage(client, competitionId, competitionStageId)
  if (!groups) {
    throw new Error('No active groups on selected stage')
  }
  const activeAthleteRes = await activeAthlete(client, competitionId, groups)
  const activeAttempt =
    activeAthleteRes.competitionAthleteAttemptList?.competitionAthleteAttempts?.[0]
  if (!activeAttempt) {
    throw new Error('Active athlete has no active attempt')
  }
  const athlete = activeAttempt.competitionAthlete
  const attempts = filterAndSortAttempts(
    athlete.competitionAthleteAttempts,
    activeAttempt.discipline
  )
  const scoreboardResult = await scoreboard(client, competitionId, athlete.bodyWeightCategory.id)
  return {
    firstName: athlete.firstName,
    lastName: athlete.lastName,
    clubName: athlete.club.name,
    activeLift: activeAttempt.discipline.toString() as Lift,
    compClass: `${athlete.ageCategory.name} ${athlete.bodyWeightCategory.name}`,
    total: athlete.calcTotal,
    prognosis: calculatePrognosis(athlete),
    placement: getPlacement(athlete.id, scoreboardResult),
    bestSquat: athlete.squatTotal,
    bestBenchPress: athlete.benchPressTotal,
    bestDeadlift: athlete.deadliftTotal,
    attempt1: attempts[0].weight,
    attempt2: attempts[1].weight,
    attempt3: attempts[2].weight,
    attemptStatus1: attempts[0].status.toString() as AttemptStatus,
    attemptStatus2: attempts[1].status.toString() as AttemptStatus,
    attemptStatus3: attempts[2].status.toString() as AttemptStatus
  } as AthleteAttempt
}

export async function getOverallScoreboard(
  competitionId: string,
  bodyWeightCategoryId: string,
  limit: number,
  offset: number
): Promise<ScoreboardEntryOverall[]> {
  const athletes = await getAthletes(competitionId, bodyWeightCategoryId, limit, offset)
  return athletes.map((athlete) => {
    return {
      firstName: athlete.firstName,
      lastName: athlete.lastName,
      lot: athlete.lot,
      bodyweight: athlete.bodyWeight,
      total: athlete.calcTotal,
      prognosis: calculatePrognosis(athlete),
      bestSquat: athlete.squatTotal,
      bestBenchPress: athlete.benchPressTotal,
      bestDeadlift: athlete.deadliftTotal
    } as ScoreboardEntryOverall
  })
}

export async function getSquatScoreboard(
  competitionId: string,
  bodyWeightCategoryId: string,
  limit: number,
  offset: number
): Promise<ScoreboardEntrySquat[]> {
  const athletes = await getAthletes(competitionId, bodyWeightCategoryId, limit, offset)
  return athletes.map((athlete) => {
    const attempts = filterAndSortAttempts(athlete.competitionAthleteAttempts, Discipline.Squat)
    return {
      firstName: athlete.firstName,
      lastName: athlete.lastName,
      lot: athlete.lot,
      bodyweight: athlete.bodyWeight,
      total: athlete.calcTotal,
      prognosis: calculatePrognosis(athlete),
      attempt1: attempts[0].weight,
      attempt2: attempts[1].weight,
      attempt3: attempts[2].weight,
      attemptStatus1: attempts[0].status.toString() as AttemptStatus,
      attemptStatus2: attempts[1].status.toString() as AttemptStatus,
      attemptStatus3: attempts[2].status.toString() as AttemptStatus
    } as ScoreboardEntrySquat
  })
}

export async function getBenchPressScoreboard(
  competitionId: string,
  bodyWeightCategoryId: string,
  limit: number,
  offset: number
): Promise<ScoreboardEntryBenchPress[]> {
  const athletes = await getAthletes(competitionId, bodyWeightCategoryId, limit, offset)
  return athletes.map((athlete) => {
    const attempts = filterAndSortAttempts(athlete.competitionAthleteAttempts, Discipline.Bench)
    return {
      firstName: athlete.firstName,
      lastName: athlete.lastName,
      lot: athlete.lot,
      bodyweight: athlete.bodyWeight,
      total: athlete.calcTotal,
      prognosis: calculatePrognosis(athlete),
      attempt1: attempts[0].weight,
      attempt2: attempts[1].weight,
      attempt3: attempts[2].weight,
      attemptStatus1: attempts[0].status.toString() as AttemptStatus,
      attemptStatus2: attempts[1].status.toString() as AttemptStatus,
      attemptStatus3: attempts[2].status.toString() as AttemptStatus,
      bestSquat: athlete.squatTotal
    } as ScoreboardEntryBenchPress
  })
}

export async function getDeadliftScoreboard(
  competitionId: string,
  bodyWeightCategoryId: string,
  limit: number,
  offset: number
): Promise<ScoreboardEntryDeadlift[]> {
  const athletes = await getAthletes(competitionId, bodyWeightCategoryId, limit, offset)
  return athletes.map((athlete) => {
    const attempts = filterAndSortAttempts(athlete.competitionAthleteAttempts, Discipline.Deadlift)
    return {
      firstName: athlete.firstName,
      lastName: athlete.lastName,
      lot: athlete.lot,
      bodyweight: athlete.bodyWeight,
      total: athlete.calcTotal,
      prognosis: calculatePrognosis(athlete),
      attempt1: attempts[0].weight,
      attempt2: attempts[1].weight,
      attempt3: attempts[2].weight,
      attemptStatus1: attempts[0].status.toString() as AttemptStatus,
      attemptStatus2: attempts[1].status.toString() as AttemptStatus,
      attemptStatus3: attempts[2].status.toString() as AttemptStatus,
      bestSquat: athlete.squatTotal,
      bestBenchPress: athlete.benchPressTotal
    } as ScoreboardEntryDeadlift
  })
}

async function getAthletes(
  competitionId: string,
  bodyWeightCategoryId: string,
  limit: number,
  offset: number
) {
  const client = VportalConnection.getInstance()
  const scoreboardQueryResult = await scoreboard(client, competitionId, bodyWeightCategoryId)
  const athletes = limitOffset(
    scoreboardQueryResult.competition.competitionAthleteList?.competitionAthletes ?? [],
    limit,
    offset
  )
  return athletes
}

function calculatePrognosis(athlete: CompetitionAthlete): number {
  if (athlete.deadliftTotal && athlete.deadliftTotal > 0) {
    const upcomingAttempt = getUpcomingAttempt(
      athlete.competitionAthleteAttempts,
      Discipline.Deadlift
    )
    return (
      (athlete.squatTotal ?? 0) + (athlete.benchPressTotal ?? 0) + (upcomingAttempt?.weight ?? 0)
    )
  }
  if (athlete.benchPressTotal && athlete.benchPressTotal > 0) {
    const deadliftOpener = getUpcomingAttempt(
      athlete.competitionAthleteAttempts,
      Discipline.Deadlift
    )
    return (athlete.squatTotal ?? 0) + athlete.benchPressTotal + (deadliftOpener?.weight ?? 0)
  }
  if (athlete.squatTotal && athlete.squatTotal > 0) {
    const benchOpener = getUpcomingAttempt(athlete.competitionAthleteAttempts, Discipline.Bench)
    const deadliftOpener = getUpcomingAttempt(
      athlete.competitionAthleteAttempts,
      Discipline.Deadlift
    )
    return athlete.squatTotal + (benchOpener?.weight ?? 0) + (deadliftOpener?.weight ?? 0)
  }
  const squatOpener = getUpcomingAttempt(athlete.competitionAthleteAttempts, Discipline.Squat)
  const benchOpener = getUpcomingAttempt(athlete.competitionAthleteAttempts, Discipline.Bench)
  const deadliftOpener = getUpcomingAttempt(athlete.competitionAthleteAttempts, Discipline.Deadlift)
  return (squatOpener?.weight ?? 0) + (benchOpener?.weight ?? 0) + (deadliftOpener?.weight ?? 0)
}

function getUpcomingAttempt(
  attempts: Array<CompetitionAthleteAttempt>,
  discipline: Discipline
): CompetitionAthleteAttempt | undefined {
  const filteredAttempts = filterAndSortAttempts(attempts, discipline)
  return filteredAttempts.find((attempt) => attempt.status === 'open')
}

function getPlacement(athleteId: string, scoreboard: ScoreboardQueryResult): number | undefined {
  const idx = scoreboard.competition.competitionAthleteList.competitionAthletes
    ?.map((athlete) => athlete.id)
    ?.indexOf(athleteId)
  return idx !== undefined ? idx + 1 : undefined
}

function filterAndSortAttempts(attempts: Array<CompetitionAthleteAttempt>, discipline: Discipline) {
  return attempts
    .filter((attempt) => attempt.discipline === discipline)
    .sort((a, b) => a.attempt - b.attempt)
}
