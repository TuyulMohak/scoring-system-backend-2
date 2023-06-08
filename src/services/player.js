import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { pFindManyPlayers, pFindOnePlayer, pCreateOnePlayer, pDeleteOnePlayer, pUpdateOnePlayer } from '../data/prisma-queries.js'

import { check, validationResult } from 'express-validator'
import { errorObj } from '../services/error.js'


const checkErrorFromValidate = (validationRes) => {
  if(!validationRes.isEmpty()) {
    const errMessages = validationRes.errors.map((err, index)=> index+1+ '. '+ err.msg).join(', ')
    throw { status: 400, errors: validationRes.errors, message: errMessages }
  }
  return
}


async function postOnePlayer(req, res) {
	const validationRes = validationResult(req)
	const { playerName, name, subdivisionId } = req.body.data
	try {
		checkErrorFromValidate(validationRes)
		const playerPosted = await pCreateOnePlayer(playerName, name, subdivisionId)
		res.status(200).json({ message:"Player Successfully Created", data: playerPosted })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function getPlayers (req, res) {
	const validationRes = validationResult(req)
	try {
		checkErrorFromValidate(validationRes)
		const players = await pFindManyPlayers()
		res.status(200).json({ data: players })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function getOnePlayer (req, res) {
	const playerId = req.params.id
	const validationRes = validationResult(req)
	try {
		checkErrorFromValidate(validationRes)
		const player = await pFindOnePlayer(playerId)
		res.status(200).json({ data: player })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function deleteOnePlayer(req, res) {
	const playerId = req.params.id
	const validationRes = validationResult(req)
	try {
		checkErrorFromValidate(validationRes)
		const player = await pDeleteOnePlayer(playerId)
		res.status(200).json( { message:`Player Successfully Deleted`, data:player })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function updateOnePlayer(req, res) {
	const validationRes = validationResult(req)
	// data only able to contain string name, string playerName, string subDivisionId, bool isActive
	const { playerId, data } = req.body
	console.log(playerId, data)
	try {
		checkErrorFromValidate(validationRes)
		const playerUpdated = await pUpdateOnePlayer(playerId, data)
		res.status(200).json({ message:"Player Successfully Updated", data: playerUpdated })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

export default { getPlayers, getOnePlayer, postOnePlayer, deleteOnePlayer, updateOnePlayer }