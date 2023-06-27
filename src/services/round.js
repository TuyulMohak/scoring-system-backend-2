import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import data from '../data/round-query.js'

import { check, validationResult } from 'express-validator'
import { errorObj } from '../services/error.js'


const checkErrorFromValidate = (validationRes) => {
  if(!validationRes.isEmpty()) {
    const errMessages = validationRes.errors.map((err, index) => index+1+ '. '+ err.msg).join(', ')
    throw { status: 400, errors: validationRes.errors, message: errMessages }
  }
  return
}


async function postOneRound(req, res) {
	const validationRes = validationResult(req)

	const { eventId, name, type, selectOptions, sequence } = req.body.data
	try {
		checkErrorFromValidate(validationRes)
		let roundData = { 
				event: { connect:{ id: eventId } }, 
				name, 
				type, 
				sequence
			}
		if(type === 'select') {
			roundData.selectOptions = { 
				create: selectOptions.map(opt=> {
					return { name: opt }
				})
			} 
		} 

		const roundPosted = await data.pCreateOneRound(roundData)
		res.status(200).json({ message:"Round Successfully Created", data: roundPosted })
	} catch (err) {
		console.log(err)
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function deleteOneRound(req, res) {
	const roundId = req.params.id
	const validationRes = validationResult(req)
	try {
		checkErrorFromValidate(validationRes)
		const round = await data.pDeleteOneRound(roundId)
		res.status(200).json( { message:`Round Successfully Deleted`, data:round })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

export default { postOneRound, deleteOneRound }