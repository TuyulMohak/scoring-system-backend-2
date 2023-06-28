import express from 'express'
const router = express.Router()

import authenticateAccount from '../middlewares/authenticateAccount.js'
import { check } from 'express-validator'
import service from '../services/score.js'

// const validatePlayerPostReq = () => { 
//   return [
//     check('data.playerName').isLength( { min: 4, max: 100 } ).withMessage('playername between 5 character and 100 character'),
//     check('data.name').isLength( { min: 4, max: 100 } ).withMessage('name between 5 character and 100 character'),
//     check('data.subdivisionId').isLength( { min: 4, max: 100 }).withMessage('subdivisionId between 5 character and 100 character')
//   ]
// }

// NOTE => MAKE SURE EVERY INPUT VALIDATED LATER

// post one round 
// { eventId, name, type, sequence, selectOptions?: ["yes", "no"]}
router.post('/', authenticateAccount, service.upsertOneScore)

export default router