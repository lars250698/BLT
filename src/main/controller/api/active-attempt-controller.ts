import { Request, Response, Router } from 'express'
import { getActiveAthleteAttempt } from '../../features/stream-data'
import { mapAthleteAttemptToApiDto } from '../../models/api/dto-mapper'

const app = Router()

app.get('/active-athlete', (_: Request, res: Response) => {
  getActiveAthleteAttempt().then((attempt) => {
    const attemptDto = mapAthleteAttemptToApiDto(attempt)
    res.send(attemptDto)
  })
})

export default app
