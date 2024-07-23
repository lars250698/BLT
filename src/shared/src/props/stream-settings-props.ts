import { ScoreboardType } from '../models/stream-settings-models'

export interface SetScoreboardPageProps {
  scoreboardType: ScoreboardType
  page: number
}

export interface SetScoreboardPageSizeProps {
  scoreboardType: ScoreboardType
  pageSize: number
}

export interface SetScoreboardSelectedBodyWeightCategoryProps {
  scoreboardType: ScoreboardType
  bodyWeightCategory: string
}
