import express from 'express'
const router = express.Router()

import authenticateAdmin from '../middlewares/authenticateAdmin.js'
import { check } from 'express-validator'
import service from '../services/round.js'

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
router.post('/', authenticateAdmin, service.postOneRound)

// delete one round
router.delete('/:id', authenticateAdmin, service.deleteOneRound)


export default router