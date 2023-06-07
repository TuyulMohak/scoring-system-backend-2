// WORKING FINE
import app from '../../../app.js'
import request from 'supertest'
import { describe, expect, test } from 'vitest'
import jwt from 'jsonwebtoken'
import { pFindManyPlayers, pFindManySubdivisions } from '../../services/prisma-queries.js'

const adminToken = jwt.sign({ username:"admin", role:"ADMIN" }, process.env.ACCESS_TOKEN_SECRET)
const players = await pFindManyPlayers()
const subdivisions = await pFindManySubdivisions()
const playerToPost = { playerName: 'newGuy', name:'randomTestingDude', subdivisionId:subdivisions[0].id } //Post a new player 
const playerToUpdate = { playerId:players[0].id, data: { playerName: 'UPDATED Player' } } //update one machine learning player

describe('Player CRUD', () => {
	test.concurrent('Post correct playerData return status 200 ', async () => {
		const res = await request(app).post('/players').set("authorization", "bearer "+ adminToken).send(playerToPost)
		
		expect(res.body.message).toBe("Player Successfully Created")
		expect(res.body.data).toBeDefined()
		expect(res.status).toBe(200)
	}, 50000)

	test.concurrent('Patch correct playerData return status 200', async () => {
		const res = await request(app).patch('/players').set("authorization", "bearer "+ adminToken).send(playerToUpdate)
		
		expect(res.body.message).toBe("Player Successfully Updated")
		expect(res.body.data).toBeDefined()
		expect(res.status).toBe(200)
	}, 50000)

	test.concurrent('Get all players return status 200', async () => {
		const res = await request(app).get('/players').set("authorization", "bearer "+ adminToken)
		
		expect(res.body.data).toBeDefined()
		expect(res.status).toBe(200)
	}, 50000)

	test.concurrent('Get one players return status 200', async () => {
		const playerIdToFind = players[0].id
		const res = await request(app).get(`/players/${playerIdToFind}`).set("authorization", "bearer "+adminToken)
		
		expect(res.body.data).toBeDefined()
		expect(res.status).toBe(200)
	}, 50000)

	test.concurrent('Delete one players return status 200', async () => {
		const playerIdToDelete = players[1].id
		const res = await request(app).delete(`/players/${playerIdToDelete}`).set("authorization", "bearer "+adminToken)
		
		expect(res.body.message).toBe("Player Successfully Deleted")
		expect(res.status).toBe(200)
	}, 50000)
})
