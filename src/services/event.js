import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import data from '../data/event-query.js'

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
	try {
		const { name, desc, startDate, rounds } = req.body.data
		const newRounds = { 
			create: rounds.map(round => {
				const newRound = {
					name: round.name,
					type: round.type,
					sequence: round.sequence
				}

				if (round.hasOwnProperty('selectOptions')) {
					const opts = { 
						create: round.selectOptions.map(opt => {
							return { name: opt.name }
						})
					}
					newRound.selectOptions = opts
				}
				return newRound
			})
		}
		checkErrorFromValidate(validationRes)
		const eventPosted = await data.pCreateOneEvent({ name, desc, startDate, rounds: newRounds })
		res.status(200).json({ message:"Event Successfully Created", data: eventPosted })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function updateOneEvent (req, res) {
	const validationRes = validationResult(req)
	try {
		const eventId = req.params.id
		const updateData = req.body.data
		checkErrorFromValidate(validationRes)
		const eventUpdated = await data.pUpdateOneEvent(eventId, updateData)
		res.status(200).json({ message:"Event Successfully Updated", data: eventUpdated })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function getEvents (req, res) {
	const validationRes = validationResult(req)
	try {
		checkErrorFromValidate(validationRes)
		const events = await data.pFindManyEvents()
		res.status(200).json({ data: events })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function getOneEvent (req, res) {
	const validationRes = validationResult(req)
	try {
		const eventId = req.params.id
		checkErrorFromValidate(validationRes)
		const event = await data.pGetOneEvent(eventId)
		res.status(200).json( { data:event })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function deleteOneEvents(req, res) {
	const validationRes = validationResult(req)
	try {
		const eventId = req.params.id
		checkErrorFromValidate(validationRes)
		const event = await data.pDeleteOneEvent(eventId)
		res.status(200).json( { message:`Event Successfully Deleted`, data:event } )
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}


export default { postOneEvent, updateOneEvent, getEvents, deleteOneEvents, getOneEvent }