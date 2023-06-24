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
	const { name, desc } = req.body.data
	try {
		checkErrorFromValidate(validationRes)
		const eventPosted = await data.pCreateOneEvent({ name, desc })
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
		const eventUpdated = await data.pUpdateOneEvent(eventId, data)
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
	const eventId = req.params.id
	const validationRes = validationResult(req)
	try {
		checkErrorFromValidate(validationRes)
		const event = await data.pGetOneEvent(eventId)
		res.status(200).json( { data:event })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function deleteOneEvents(req, res) {
	const eventId = req.params.id
	const validationRes = validationResult(req)
	try {
		checkErrorFromValidate(validationRes)
		const event = await data.pDeleteOneEvent(eventId)
		res.status(200).json( { message:`Event Successfully Deleted`, data:event } )
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}


export default { postOneEvent, updateOneEvent, moveUpEvent, moveDownEvent, getEvents, deleteOneEvents, getOneEvent }