import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { pFindManyPlayers, pFindOnePlayer, pCreateOnePlayer, pDeleteOnePlayer, pUpdateOnePlayer } from './prisma-queries.js'


async function getPlayers (username, password) {
	try {
		return await pFindManyPlayers()
	} catch (err) {
		throw { status: err.status || 500, errors: err, message: err.message }
	}
}

async function getOnePlayer (id) {
	try {
		return await pFindOnePlayer(id)
	} catch (err) {
		throw { status: err.status || 500, errors: err, message: err.message }
	}
}

async function postOnePlayer(playerName, name, subdivisionId) {
	try {
		return await pCreateOnePlayer(playerName, name, subdivisionId)
	} catch (err) {
		throw { status: err.status || 500, errors: err, message: err.message }
	}
}

async function deleteOnePlayer(playerId) {
	try {
		return await pDeleteOnePlayer(playerId)
	} catch (err) {
		throw { status: err.status || 500, errors: err, message: err.message }
	}
}

async function updateOnePlayer(playerId, data) {
	try {
		return await pUpdateOnePlayer(playerId, data)
	} catch (err) {
		throw { status: err.status || 500, errors: err, message: err.message }
	}
}

export { getPlayers, getOnePlayer, postOnePlayer, deleteOnePlayer, updateOnePlayer }