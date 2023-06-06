// WORKING FINE
import app from '../../../app.js'
import request from 'supertest'
import { describe, expect, test } from 'vitest'
import jwt from 'jsonwebtoken'

const correctAdminAccount = { username:process.env.ADMIN_USERNAME, password:process.env.ADMIN_PASSWORD } 
const correctNeoterAccount = { username:process.env.NEOTER_USERNAME , password:process.env.NEOTER_USERNAME }
const notRegisteredAccount = { username:'nobody', password: 'wrongpassword' }
const badFormatAccount = { username: 'fu', password: 'mu' } //username & password too short
const CorrectUsernameWrongPasswordAccount = { username: adminAccount.username, password:'wrongpassword' }

describe('Login', () => {
	test.concurrent('Registered Admin Must return status 200 and having ADMIN role token ',async () => {
		const res = await request(app).post('/account/login').send(correctAdminAccount)
		const userData = jwt.verify(res.body.token, process.env.ACCESS_TOKEN_SECRET)
		
		expect(userData.role).toBe("ADMIN")
		expect(res.status).toBe(200)
		console.log(res.body)
	}, 50000)

	test.concurrent('Registered Neoter Must return status 200 and having NEOTER role token ',async () => {
		const res = await request(app).post('/account/login').send(correctNeoterAccount)
		const userData = jwt.verify(res.body.token, process.env.ACCESS_TOKEN_SECRET)
		
		expect(userData.role).toBe("NEOTER")
		expect(res.status).toBe(200)
		console.log(res.body)
	}, 50000)

	test.concurrent('Not registered/not found user return 404', async () => {
		const res = await request(app).post('/account/login').send(notRegisteredAccount)
		expect(res.status).toBe(404)
		console.log(res.body)
	}, 50000)

	test.concurrent('Wrong format of username and or password return 400', async () => {
		const res = await request(app).post('/account/login').send(badFormatAccount)
		expect(res.status).toBe(400)
		console.log(res.body)
	}, 30000)

	test.concurrent('Correct username But wrong password return 400', async () => {
		const res = await request(app).post('/account/login').send(CorrectUsernameWrongPasswordAccount)
		expect(res.status).toBe(400)
	}, 30000)

})
