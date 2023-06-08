import express from 'express'
const router = express.Router()

import authenticateAdmin from '../middlewares/authenticateAdmin.js'
import { check } from 'express-validator'
import service from '../services/player.js'

const validatePlayerPostReq = () => { 
  return [
    check('data.playerName').isLength( { min: 4, max: 100 } ).withMessage('playername between 5 character and 100 character'),
    check('data.name').isLength( { min: 4, max: 100 } ).withMessage('name between 5 character and 100 character'),
    check('data.subdivisionId').isLength( { min: 4, max: 100 }).withMessage('subdivisionId between 5 character and 100 character')
  ]
}

// post one player
router.post('/', validatePlayerPostReq(), authenticateAdmin, service.postOnePlayer)

// update one player
router.patch('/', authenticateAdmin, service.updateOnePlayer)

//get all players
router.get('/', authenticateAdmin, service.getPlayers)

//get one player
router.get('/:id', authenticateAdmin, service.getOnePlayer)

// delete one player
router.delete('/:id', authenticateAdmin, service.deleteOnePlayer)


export default router