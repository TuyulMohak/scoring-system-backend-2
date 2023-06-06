import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { pFindManyPlayers, pFindAPlayer, pCreateOnePlayer } from './prisma-queries.js'


async function getPlayers (username, password) {
	try {
		return await pFindManyPlayers()
	} catch (err) {
		throw { status: err.status || 500, errors: err, message: err.message }
	}
}

async function getOnePlayer (id) {
	try {
		return await pFindAPlayer(id)
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

export { getPlayers, getOnePlayer, postOnePlayer }