import express from 'express'
const router = express.Router()

import authenticateAdmin from '../middlewares/authenticateAdmin.js'
import { check, validationResult } from 'express-validator'
import { getPlayers, getOnePlayer, postOnePlayer, deleteOnePlayer, updateOnePlayer } from '../services/player.js'

const validatePlayerPostReq = () => { 
  return [
  check('data.playerName').isLength( { min: 4, max: 100 } ).withMessage('playername between 5 character and 100 character'),
  check('data.name').isLength( { min: 4, max: 100 } ).withMessage('name between 5 character and 100 character'),
  check('data.subdivisionId').isLength( { min: 4, max: 100 }).withMessage('subdivisionId between 5 character and 100 character')
  ]
}

// post player
router.post('/', validatePlayerPostReq(), authenticateAdmin, postOnePlayer)

// update player
router.patch('/', authenticateAdmin, updateOnePlayer)

//get all players
router.get('/', authenticateAdmin, getPlayers)

//get one player
router.get('/:id', authenticateAdmin, getOnePlayer)

// delete player
router.delete('/:id', authenticateAdmin, deleteOnePlayer)


export default router