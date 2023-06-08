import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { pCreateOneEvent, pGetMaxEventSequence, pUpdateOneEvent, pGetTwoRowBefore, pGetTwoRowAfter, pFindManyEvents, pDeleteOneEvent } from '../data/event-query.js'

import { check, validationResult } from 'express-validator'
import { errorObj } from '../services/error.js'


const checkErrorFromValidate = (validationRes) => {
  if(!validationRes.isEmpty()) {
    const errMessages = validationRes.errors.map((err, index)=> index+1+ '. '+ err.msg).join(', ')
    throw { status: 400, errors: validationRes.errors, message: errMessages }
  }
  return
}



async function postOneEvent(req, res) {
	const validationRes = validationResult(req)
	const { name, desc } = req.body.data
	try {
		checkErrorFromValidate(validationRes)
		const maxSequence = await pGetMaxEventSequence()
		const sequence = maxSequence._max.sequence + 1
		const eventPosted = await pCreateOneEvent({ name, desc, sequence })
		res.status(200).json({ message:"Event Successfully Created", data: eventPosted })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function updateOneEvent (req, res) {
	const validationRes = validationResult(req)
	const { eventId, data } = req.body
	try {
		checkErrorFromValidate(validationRes)
		const eventUpdated = await pUpdateOneEvent(eventId, data)
		res.status(200).json({ message:"Event Successfully Updated", data: eventUpdated })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function moveUpEvent (req, res) {
	const validationRes = validationResult(req)
	const sequence = Number(req.params.sequence)
	try {
		checkErrorFromValidate(validationRes)
		const twoRowToSwap = await pGetTwoRowBefore(sequence)
		if (twoRowToSwap.length === 0) {
			throw { status:404, message:"No Event Exist on that Sequence Number" }
		}
		if (twoRowToSwap.length < 2) {
			throw { status:403, message:"On top already" }
		}
		const first = twoRowToSwap[0]
		const second = twoRowToSwap[1]

		const updateFirst = await pUpdateOneEvent(first.id, { sequence: second.sequence } )
		const updateSecond = await pUpdateOneEvent(second.id, { sequence: first.sequence } )

		res.status(200).json({ message:"Event Successfully Swapped", data:[ updateFirst, updateSecond ] })
	} catch (err) {
		console.log(err)
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function moveDownEvent (req, res) {
	const validationRes = validationResult(req)
	const sequence = Number(req.params.sequence)
	try {
		checkErrorFromValidate(validationRes)
		const twoRowToSwap = await pGetTwoRowAfter(sequence)
		
		if (twoRowToSwap.length === 0) {
			throw { status:404, message:"No Event Exist on that Sequence Number" }
		}
		if (twoRowToSwap.length < 2) {
			throw { status:403, message:"On bottom already" }
		}
		const first = twoRowToSwap[0]
		const second = twoRowToSwap[1]

		const updateFirst = await pUpdateOneEvent(first.id, { sequence: second.sequence } )
		const updateSecond = await pUpdateOneEvent(second.id, { sequence: first.sequence } )

		res.status(200).json({ message:"Event Successfully Swapped", data:[ updateFirst, updateSecond ] })
	} catch (err) {
		console.log(err)
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function getEvents (req, res) {
	const validationRes = validationResult(req)
	try {
		checkErrorFromValidate(validationRes)
		const events = await pFindManyEvents()
		res.status(200).json({ data: events })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function deleteOneEvents(req, res) {
	const eventId = req.params.id
	const validationRes = validationResult(req)
	try {
		checkErrorFromValidate(validationRes)
		const event = await pDeleteOneEvent(eventId)
		res.status(200).json( { message:`Event Successfully Deleted`, data:event })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

export default { postOneEvent, updateOneEvent, moveUpEvent, moveDownEvent, getEvents, deleteOneEvents }