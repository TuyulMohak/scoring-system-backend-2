import express from 'express'
const router = express.Router()

import authenticateAdmin from '../middlewares/authenticateAdmin.js'
import authenticateAccount from '../middlewares/authenticateAccount.js'
import { check } from 'express-validator'
import service from '../services/event.js'

// const validatePlayerPostReq = () => { 
//   return [
//     check('data.playerName').isLength( { min: 4, max: 100 } ).withMessage('playername between 5 character and 100 character'),
//     check('data.name').isLength( { min: 4, max: 100 } ).withMessage('name between 5 character and 100 character'),
//     check('data.subdivisionId').isLength( { min: 4, max: 100 }).withMessage('subdivisionId between 5 character and 100 character')
//   ]
// }

// NOTE => MAKE SURE EVERY INPUT VALIDATED LATER

// post one event => data: { name, desc, startDate, rounds: { name, type, sequence, selectOptions? : [{ name}, {name}] }}
router.post('/', authenticateAdmin, service.postOneEvent)

// update one event (only able to update, name, desc, startDate)
router.patch('/:id', authenticateAdmin, service.updateOneEvent)

// get all events
router.get('/', authenticateAccount, service.getEvents)

// get one event (WE'LL THINK MORE ABOUT THIS BEFORE WE IMPLEMENT)
// Must Return [ { playerId,rounds:[scores] }, { playerId, rounds:[scores] } ]
router.get('/:id', authenticateAccount, service.getOneEvent)

// delete one event
router.delete('/:id', authenticateAdmin, service.deleteOneEvents)

export default router