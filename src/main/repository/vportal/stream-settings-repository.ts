import {
  BodyWeightCategory,
  CompetitionGroup,
  CompetitionStage,
  ScoreboardSettings,
  StreamSettings
} from '../../../shared/src/models/stream-settings-models'
import {
  activeGroup,
  competitionData,
  profileCompetition,
  scoreboard,
  stageList
} from '../../datasource/vportal/vportal-datasource'
import { VportalConnection } from '../../state/vportal/vportal-connection'
import { GraphQLClient } from 'graphql-request'
import { CompetitionDataQueryResult } from '../../datasource/vportal/dao/vportal-daos'

export async function getInitialStreamSettings(): Promise<StreamSettings> {
  const client = VportalConnection.getInstance()
  const competitionId = await profileCompetition(client)
  const availableStages = await getAvailableStages(client, competitionId)
  const compData = await competitionData(client, competitionId)
  const groups = getAvailableGroupsFromCompData(compData)
  const bodyWeightCategories = getAvailableBodyWeightCategoriesFromCompData(compData)
  const activeGroupIds = await activeGroup(client, competitionId)
  const defaultBodyWeightCategory =
    compData.competition.competitionGroupList?.competitionGroups?.[0]?.eventBodyWeightCategoryList
      ?.eventBodyWeightCategories?.[0]?.id ?? ''
  const defaultPageSize = 14
  const defaultBodyWeightCategoryScoreboardPages = await getAvailablePages(
    client,
    competitionId,
    defaultBodyWeightCategory,
    defaultPageSize
  )
  return {
    competitionId: competitionId,
    availableCompetitionStages: availableStages,
    selectedCompetitionStageId: availableStages[0].id,
    availableGroups: groups,
    availableBodyWeightCategories: bodyWeightCategories,
    activeGroupIds: activeGroupIds,
    overallScoreboardSettings: {
      selectedBodyWeightCategoryId: defaultBodyWeightCategory,
      availablePages: defaultBodyWeightCategoryScoreboardPages,
      page: 1,
      pageSize: defaultPageSize
    },
    squatScoreboardSettings: {
      selectedBodyWeightCategoryId: defaultBodyWeightCategory,
      availablePages: defaultBodyWeightCategoryScoreboardPages,
      page: 1,
      pageSize: defaultPageSize
    },
    benchPressScoreboardSettings: {
      selectedBodyWeightCategoryId: defaultBodyWeightCategory,
      availablePages: defaultBodyWeightCategoryScoreboardPages,
      page: 1,
      pageSize: defaultPageSize
    },
    deadliftScoreboardSettings: {
      selectedBodyWeightCategoryId: defaultBodyWeightCategory,
      availablePages: defaultBodyWeightCategoryScoreboardPages,
      page: 1,
      pageSize: defaultPageSize
    }
  } as StreamSettings
}

export async function refreshStreamSettings(oldSettings: StreamSettings): Promise<StreamSettings> {
  const client = VportalConnection.getInstance()
  const competitionId = oldSettings.competitionId
  const availableStages = await getAvailableStages(client, competitionId)
  const compData = await competitionData(client, competitionId)
  const groups = getAvailableGroupsFromCompData(compData)
  const bodyWeightCategories = getAvailableBodyWeightCategoriesFromCompData(compData)
  const activeGroupIds = await activeGroup(client, competitionId)
  oldSettings.availableCompetitionStages = availableStages
  oldSettings.availableGroups = groups
  oldSettings.availableBodyWeightCategories = bodyWeightCategories
  oldSettings.activeGroupIds = activeGroupIds
  oldSettings.overallScoreboardSettings.availablePages = await getAvailablePages(
    client,
    competitionId,
    oldSettings.overallScoreboardSettings.selectedBodyWeightCategoryId,
    oldSettings.overallScoreboardSettings.pageSize
  )
  oldSettings.squatScoreboardSettings.availablePages = await getAvailablePages(
    client,
    competitionId,
    oldSettings.squatScoreboardSettings.selectedBodyWeightCategoryId,
    oldSettings.squatScoreboardSettings.pageSize
  )
  oldSettings.benchPressScoreboardSettings.availablePages = await getAvailablePages(
    client,
    competitionId,
    oldSettings.benchPressScoreboardSettings.selectedBodyWeightCategoryId,
    oldSettings.benchPressScoreboardSettings.pageSize
  )
  oldSettings.deadliftScoreboardSettings.availablePages = await getAvailablePages(
    client,
    competitionId,
    oldSettings.deadliftScoreboardSettings.selectedBodyWeightCategoryId,
    oldSettings.deadliftScoreboardSettings.pageSize
  )
  return oldSettings
}

export async function getNewScoreboardSettingsWithPageSize(
  oldScoreboardSettings: ScoreboardSettings,
  competitionId: string,
  newPageSize: number
): Promise<ScoreboardSettings> {
  oldScoreboardSettings.pageSize = newPageSize
  oldScoreboardSettings.availablePages = await getAvailablePages(
    VportalConnection.getInstance(),
    competitionId,
    oldScoreboardSettings.selectedBodyWeightCategoryId,
    newPageSize
  )
  return oldScoreboardSettings
}

async function getAvailableStages(
  client: GraphQLClient,
  competitionId: string
): Promise<Array<CompetitionStage>> {
  const stages = await stageList(client, competitionId)
  if (!stages.competitionStageList.competitionStages) {
    return []
  }
  return stages.competitionStageList.competitionStages.map((stage) => {
    return {
      id: stage.id,
      name: stage.name
    } as CompetitionStage
  })
}

function getAvailableGroupsFromCompData(
  compData: CompetitionDataQueryResult
): Array<CompetitionGroup> {
  return (
    compData.competition.competitionGroupList?.competitionGroups?.map((group) => {
      return {
        id: group.id,
        name: group.name,
        bodyWeightCategories: group.eventBodyWeightCategoryList.eventBodyWeightCategories.map(
          (category) => {
            return {
              id: category.id,
              name: category.name,
              ageCategoryName: category.eventAgeCategory.name
            } as BodyWeightCategory
          }
        )
      }
    }) ?? []
  )
}

function getAvailableBodyWeightCategoriesFromCompData(
  compData: CompetitionDataQueryResult
): Array<BodyWeightCategory> {
  return (
    compData.competition.eventBodyWeightCategoryList?.eventBodyWeightCategories?.map((category) => {
      return {
        id: category.id,
        name: category.name,
        ageCategoryName: category.eventAgeCategory.name
      } as BodyWeightCategory
    }) ?? []
  )
}

async function getAvailablePages(
  client: GraphQLClient,
  competitionId: string,
  categoryId: string,
  pageSize: number
): Promise<number> {
  const res = await scoreboard(client, competitionId, categoryId)
  if (
    res.competitionAthleteList.competitionAthletes &&
    res.competitionAthleteList.competitionAthletes.length > 0
  ) {
    const pg = res.competitionAthleteList.competitionAthletes.length / pageSize
    if (pg % 1 === 0) {
      return pg
    } else {
      return pg + 1
    }
  }
  return 1
}
