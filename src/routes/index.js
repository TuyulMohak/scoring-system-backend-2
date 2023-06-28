import express from 'express'
const router = express.Router()

import accountRouter from './account.js'
import playerRouter from './player.js'
import eventRouter from './event.js'
import roundRouter from './round.js'
import scoreRouter from './score.js'

router.use('/accounts', accountRouter)
router.use('/players', playerRouter)
router.use('/events', eventRouter)
router.use('/rounds', roundRouter)
router.use('/scores', scoreRouter)

export default router