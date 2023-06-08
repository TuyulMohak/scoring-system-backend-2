import express from 'express'
const router = express.Router()

import authenticateAdmin from '../middlewares/authenticateAdmin.js'
import { check } from 'express-validator'
import service from '../services/event.js'

const validatePlayerPostReq = () => { 
  return [
    check('data.playerName').isLength( { min: 4, max: 100 } ).withMessage('playername between 5 character and 100 character'),
    check('data.name').isLength( { min: 4, max: 100 } ).withMessage('name between 5 character and 100 character'),
    check('data.subdivisionId').isLength( { min: 4, max: 100 }).withMessage('subdivisionId between 5 character and 100 character')
  ]
}

// event table
{
	id String,
	name String,
	desc String,
	sequence String,
	rounds round[],
	
}


// post one event
router.post('/', validatePlayerPostReq(), authenticateAdmin, service.postOnePlayer)

// update one event
router.patch('/', authenticateAdmin, service.updateOnePlayer)

// get all events
router.get('/', authenticateAdmin, service.getPlayers)

// get one event
router.get('/:id', authenticateAdmin, service.getOnePlayer)

// delete one event
router.delete('/:id', authenticateAdmin, service.deleteOnePlayer)


export default router