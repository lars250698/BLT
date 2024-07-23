import { ScoreboardType } from './stream-settings-models'

export interface SharedState {
  selectedScoreboardType: ScoreboardType
}

export const defaultSharedState: SharedState = {
  selectedScoreboardType: ScoreboardType.Overall
}
