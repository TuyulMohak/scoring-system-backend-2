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

// {data:{eventId, name, type, selectOptions?}}
// post one round 
router.post('/', authenticateAdmin, service.postOneRound)

// update one event (I THINK IT Will cause many other bugs, so don't)
// router.patch('/', authenticateAdmin, service.updateOneRound)

// // event move up
// router.get('/move/up/:sequence', authenticateAdmin, service.moveUpEvent)

// // event move down
// router.get('/move/down/:sequence', authenticateAdmin, service.moveDownEvent)

// delete one event
router.delete('/:id', authenticateAdmin, service.deleteOneRound)


export default router