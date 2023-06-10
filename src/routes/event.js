import express from 'express'
const router = express.Router()

import authenticateAdmin from '../middlewares/authenticateAdmin.js'
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

// post one event 
router.post('/', authenticateAdmin, service.postOneEvent)

// update one event
router.patch('/', authenticateAdmin, service.updateOneEvent)

// event move up
router.get('/move/up/:id/:sequence', authenticateAdmin, service.moveUpEvent)

// event move down
router.get('/move/down/:id/:sequence', authenticateAdmin, service.moveDownEvent)

// get all events
router.get('/', authenticateAdmin, service.getEvents)

// delete one event
router.delete('/:id', authenticateAdmin, service.deleteOneEvents)


// get one event (WE'LL THINK MORE ABOUT THIS BEFORE WE IMPLEMENT)
// I WANT MY EVENT TO RETURN DATA OF list of [ { playerId,rounds:[scores] }, { playerId,rounds:[scores] } ]
router.get('/:id', authenticateAdmin, service.getOneEvent)



export default router