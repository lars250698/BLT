import express, { Request, Response } from 'express'
import {
  getBenchPressScoreboard,
  getDeadliftScoreboard,
  getOverallScoreboard,
  getSquatScoreboard
} from '../../features/stream-data'
import {
  mapScoreboardEntryBenchPressToApiDto,
  mapScoreboardEntryDeadliftToApiDto,
  mapScoreboardEntryOverallToApiDto,
  mapScoreboardEntrySquatToApiDto
} from '../../models/api/dto-mapper'

const app = express.Router()

app.get('/overall', (_: Request, res: Response) => {
  getOverallScoreboard().then((entries) => {
    const mappedEntries = entries.map((entry) => mapScoreboardEntryOverallToApiDto(entry))
    res.send(mappedEntries)
  })
})

app.get('/squat', (_: Request, res: Response) => {
  getSquatScoreboard().then((entries) => {
    const mappedEntries = entries.map((entry) => mapScoreboardEntrySquatToApiDto(entry))
    res.send(mappedEntries)
  })
})

app.get('/benchpress', (_: Request, res: Response) => {
  getBenchPressScoreboard().then((entries) => {
    const mappedEntries = entries.map((entry) => mapScoreboardEntryBenchPressToApiDto(entry))
    res.send(mappedEntries)
  })
})

app.get('/deadlift', (_: Request, res: Response) => {
  getDeadliftScoreboard().then((entries) => {
    const mappedEntries = entries.map((entry) => mapScoreboardEntryDeadliftToApiDto(entry))
    res.send(mappedEntries)
  })
})

export default app
