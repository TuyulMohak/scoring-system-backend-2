import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { pFindAccountByUsername, pFindManyPlayers } from './prisma-queries.js'

async function getPlayers (username, password) {
	try {
		return await pFindManyPlayers()
	} catch (err) {
		throw { status: err.status || 500, errors: err, message: err.message }
	}
}

export { getPlayers }