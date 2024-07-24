interface ScoreboardEntryBaseApiDto {
  name: string
  bodyweight: string
  lot: string
  total: string
  prognosis: string
}

export interface ScoreboardEntryOverallApiDto extends ScoreboardEntryBaseApiDto {
  bestSquat: string
  bestBenchPress: string
  bestDeadlift: string
}

export interface ScoreboardEntrySquatApiDto extends ScoreboardEntryBaseApiDto {
  attempt1: string
  attempt2: string
  attempt3: string
  attemptColor1: string
  attemptColor2: string
  attemptColor3: string
}

export interface ScoreboardEntryBenchPressApiDto extends ScoreboardEntrySquatApiDto {
  bestSquat: string
}

export interface ScoreboardEntryDeadliftApiDto extends ScoreboardEntryBenchPressApiDto {
  bestBenchPress: string
}

export interface AthleteAttemptApiDto {
  name: string
  club: string
  activeLift: string
  compClass: string
  total: string
  prognosis: string
  placement: string
  bestSquat: string
  bestBenchPress: string
  bestDeadlift: string
  attempt1: string
  attempt2: string
  attempt3: string
  attemptColor1: string
  attemptColor2: string
  attemptColor3: string
}
