export const enum AttemptStatus {
  Open = 'open',
  Valid = 'valid',
  Invalid = 'invalid',
  Repeat = 'repeat',
  Skip = 'skip'
}

export const enum Lift {
  Squat = 'squat',
  BenchPress = 'benchPress',
  Deadlift = 'deadlift'
}

interface ScoreboardEntryBase {
  firstName: string
  lastName: string
  bodyweight: number | undefined
  lot: number | undefined
  total: number | undefined
  prognosis: number
}

export interface ScoreboardEntryOverall extends ScoreboardEntryBase {
  bestSquat: number | undefined
  bestBenchPress: number | undefined
  bestDeadlift: number | undefined
}

export interface ScoreboardEntrySquat extends ScoreboardEntryBase {
  attempt1: number | undefined
  attempt2: number | undefined
  attempt3: number | undefined
  attemptStatus1: AttemptStatus
  attemptStatus2: AttemptStatus
  attemptStatus3: AttemptStatus
}

export interface ScoreboardEntryBenchPress extends ScoreboardEntrySquat {
  bestSquat: number | undefined
}

export interface ScoreboardEntryDeadlift extends ScoreboardEntryBenchPress {
  bestBenchPress: number | undefined
}

export interface AthleteAttempt {
  firstName: string
  lastName: string
  clubName: string
  activeLift: Lift
  compClass: string
  total: number | undefined
  prognosis: number | undefined
  placement: number | undefined
  bestSquat: number | undefined
  bestBenchPress: number | undefined
  bestDeadlift: number | undefined
  attempt1: number | undefined
  attempt2: number | undefined
  attempt3: number | undefined
  attemptStatus1: AttemptStatus
  attemptStatus2: AttemptStatus
  attemptStatus3: AttemptStatus
}
