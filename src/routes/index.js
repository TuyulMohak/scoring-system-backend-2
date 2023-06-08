import express from 'express'
const router = express.Router()

import accountRouter from './account.js'
import playerRouter from './player.js'
import eventRouter from './event.js'

router.use('/accounts', accountRouter)
router.use('/players', playerRouter)
router.use('/events', eventRouter)

export default router