import express from 'express'
const router = express.Router()

import authenticateAdmin from '../middlewares/authenticateAdmin.js'
import { check, validationResult } from 'express-validator'
import { getPlayers, getOnePlayer, postOnePlayer } from '../services/player.js'
import { errorObj } from '../services/error.js'

const validatePlayerPostReq = [
  check('playerName').isLength( { min: 4, max: 100 } ).withMessage('username between 5 character and 100 character'),
  check('name').isLength( { min: 4, max: 100 } ).withMessage('password between 8 character and 100 character'),
  check('subdivisionId').isLength( { min: 4, max: 100 }).withMessage('password between 8 character and 100 character')
]

const checkErrorFromValidate = (validationRes) => {
  if(!validationRes.isEmpty()) {
    const errMessages = validationRes.errors.map((err, index)=> index+1+ '. '+ err.msg).join(', ')
    throw { status: 400, errors: validationRes.errors, message: errMessages }
  }
  return
}

//1. get players
router.get('/', authenticateAdmin, async (req, res) => {
  const validationRes = validationResult(req)
  try {
    checkErrorFromValidate(validationRes)
    const players = await getPlayers()
    res.status(200).json(players)
  } catch (err) {
    res.status(err.status || 500).json(errorObj(err))
  }
})

//2. get a player
router.get('/:id', authenticateAdmin, async (req, res) => {
  const playerId = req.params.id
  const validationRes = validationResult(req)
  try {
    checkErrorFromValidate(validationRes)
    const player = await getOnePlayer(playerId)
    res.status(200).json(player)
  } catch (err) {
    res.status(err.status || 500).json(errorObj(err))
  }
})

// post player
router.post('/', validatePlayerPostReq ,authenticateAdmin, async (req, res) => {
  const validationRes = validationResult(req)
  const { playerName, name, subdivisionId } = req.body
  try {
    checkErrorFromValidate(validationRes)
    const playerPosted = await postOnePlayer(playerName, name, subdivisionId)
    res.status(200).json(playerPosted)
  } catch (err) {
    res.status(err.status || 500).json(errorObj(err))
  }
})

// delete player
// update player



// used only for testing authenticateAccount middleware 
router.get('/secret', authenticateAdmin, (req, res) => {
  const user = req.user
  const secretData = ['alpha', 'bruno', 'changshi']
  res.status(200).json({data:secretData})
})

export default router