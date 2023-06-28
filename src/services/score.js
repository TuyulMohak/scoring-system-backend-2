import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import data from '../data/score-query.js'

import { check, validationResult } from 'express-validator'
import { errorObj } from '../services/error.js'


const checkErrorFromValidate = (validationRes) => {
  if(!validationRes.isEmpty()) {
    const errMessages = validationRes.errors.map((err, index) => index+1+ '. '+ err.msg).join(', ')
    throw { status: 400, errors: validationRes.errors, message: errMessages }
  }
  return
}

// { roundId, playerId, scoreVal }
async function upsertOneScore(req, res) {
	const scoreToInsert = req.body.data
	const validationRes = validationResult(req)
	try {
		checkErrorFromValidate(validationRes)
		console.log(scoreToInsert)
		const score = await data.pUpsertOneScore(scoreToInsert)
		res.status(200).json( { message:`Score Successfully Deleted`, data:score })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
		console.log(err)
	}
}

export default { upsertOneScore }