import express from 'express'
const router = express.Router()

import authenticateAccount from '../middlewares/authenticateAccount.js'
import authenticateAdmin from '../middlewares/authenticateAdmin.js'
import { check, validationResult } from 'express-validator'
import { loginAccount } from '../services/account.js'
import { errorObj } from '../services/error.js'


const validateAccount = [
  check('username').isLength( { min: 4, max: 100 } ).withMessage('username between 5 character and 100 character'),
  check('password').isLength( { min: 4, max: 100 } ).withMessage('password between 8 character and 100 character')
]

const checkErrorFromValidate = (validationRes) => {
  if(!validationRes.isEmpty()) {
    const errMessages = validationRes.errors.map((err, index)=> index+1+ '. '+ err.msg).join(', ')
    throw { status: 400, errors: validationRes.errors, message: errMessages }
  }
  return
}

router.post('/login', validateAccount, async (req, res) => {
  const { username, password } = req.body
  const validationRes = validationResult(req)
  try {
    checkErrorFromValidate(validationRes)
    const loginResult = await loginAccount(username, password)
    res.status(loginResult.status).json(loginResult)
  } catch (err) {
    res.status(err.status || 500).json(errorObj(err))
  }
})

// used only for testing authenticateAccount middleware 
router.get('/secret-admin', authenticateAdmin, (req, res) => {
  const account = req.account
  const secretData = ['admin', 'alpha', 'bruno', 'changshi']
  res.status(200).json({data:secretData})
})

// used only for testing authenticateAccount middleware 
router.get('/secret-neoter', authenticateAccount, (req, res) => {
  const account = req.account
  const secretData = ['neoter', 'alpha', 'bruno', 'changshi']
  res.status(200).json({data:secretData})
})

export default router