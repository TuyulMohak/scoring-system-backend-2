import express from 'express'
const router = express.Router()

import accountRouter from './account.js'
import playerRouter from './player.js'

router.use('/accounts', accountRouter)
router.use('/players', playerRouter)

export default router