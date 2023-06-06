import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { pFindAccountByUsername } from './prisma-queries.js'

function generateHourToken(data) {
	return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

async function loginAccount (username, password) {		

	try {
		// finding one matching account
		const accountRow = await pFindAccountByUsername(username)
		if(accountRow === null) {
			throw { status: 404, message: 'User not found' }
		}

		// comparing the password on database and sent by the user
		const result = await bcrypt.compare(password, accountRow.password)
		if (!result) {
			throw { status: 400, message: 'Wrong login credentials' }
		}

		// creating accesstoken
		const accessToken = generateHourToken(accountRow)
		return { status:200, message: 'Logged in', token: accessToken, accountRow }

	} catch (err) {
		throw { status: err.status || 500, errors: err, message: err.message }
	}
}

export { loginAccount }