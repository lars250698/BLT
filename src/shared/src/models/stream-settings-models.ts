export interface StreamSettings {
  competitionId: string
  availableCompetitionStages: CompetitionStage[]
  selectedCompetitionStageId: string
  availableGroups: CompetitionGroup[]
  availableBodyWeightCategories: BodyWeightCategory[]
  activeGroupIds: string[]
  overallScoreboardSettings: ScoreboardSettings
  squatScoreboardSettings: ScoreboardSettings
  benchPressScoreboardSettings: ScoreboardSettings
  deadliftScoreboardSettings: ScoreboardSettings
}

export const enum ScoreboardType {
  Overall = 'overall',
  Squat = 'squat',
  Bench = 'bench',
  Deadlift = 'deadlift',
  All = 'all'
}

export interface BodyWeightCategory {
  id: string
  name: string
  ageCategoryName: string
}

export interface CompetitionGroup {
  id: string
  name: string
  bodyWeightCategories: BodyWeightCategory[]
}

export interface CompetitionStage {
  id: string
  name: string
}
export interface ScoreboardSettings {
  selectedBodyWeightCategoryId: string
  availablePages: number
  page: number
  pageSize: number
}
