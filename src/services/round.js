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

	const { eventId, name, type, selectOptions } = req.body.data
	try {
		checkErrorFromValidate(validationRes)
		const maxSequence = await data.pGetMaxRoundSequence()
		const sequence = maxSequence._max.sequence + 1
		
		let roundData = null
		if(type === 'select') {
			roundData = { 
				event: { connect:{ id: eventId } }, 
				name, 
				type, 
				sequence, 
				selectOptions: { create: selectOptions } 
			}
		} else {
			roundData = { 
				event: { connect: { id:eventId } }, 
				name, 
				type, 
				sequence 
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

async function moveUpRound (req, res) {
	const validationRes = validationResult(req)
	const sequence = Number(req.params.sequence)
	const roundId = req.params.id
	try {
		checkErrorFromValidate(validationRes)
		const twoRowToSwap = await data.pGetTwoRowBefore(roundId, sequence)
		if (twoRowToSwap.length === 0) {
			throw { status:404, message:"No Round Exist on that Sequence Number" }
		}
		if (twoRowToSwap.length < 2) {
			throw { status:403, message:"On top already" }
		}
		const first = twoRowToSwap[0]
		const second = twoRowToSwap[1]

		const updateFirst = await data.pUpdateOneRound(first.id, { sequence: second.sequence } )
		const updateSecond = await data.pUpdateOneRound(second.id, { sequence: first.sequence } )

		res.status(200).json({ message:"Event Successfully Swapped", data:[ updateFirst, updateSecond ] })
	} catch (err) {
		console.log(err)
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function moveDownRound (req, res) {
	const roundId = req.params.id
	const validationRes = validationResult(req)
	const sequence = Number(req.params.sequence)
	try {
		checkErrorFromValidate(validationRes)
		const twoRowToSwap = await data.pGetTwoRowAfter(roundId, sequence)
		
		if (twoRowToSwap.length === 0) {
			throw { status:404, message:"No Event Exist on that Sequence Number" }
		}
		if (twoRowToSwap.length < 2) {
			throw { status:403, message:"On bottom already" }
		}
		const first = twoRowToSwap[0]
		const second = twoRowToSwap[1]

		const updateFirst = await data.pUpdateOneRound(first.id, { sequence: second.sequence } )
		const updateSecond = await data.pUpdateOneRound(second.id, { sequence: first.sequence } )

		res.status(200).json({ message:"Event Successfully Swapped", data:[ updateFirst, updateSecond ] })
	} catch (err) {
		console.log(err)
		res.status(err.status || 500).json(errorObj(err))
	}
}


export default { postOneRound, deleteOneRound, moveUpRound, moveDownRound }