import app from '../../../app.js'
import request from 'supertest'
import { describe, expect, test } from 'vitest'
import jwt from 'jsonwebtoken'

import eventData from '../../data/event-query.js'
const adminToken = jwt.sign({ username:"admin", role:"ADMIN" }, process.env.ACCESS_TOKEN_SECRET)
const events = await eventData.pFindManyEvents()
const choosenEvent = await eventData.pGetOneEvent(events[0].id)
const roundToPost = {
	"data": {
		eventId: events[0].id,
	    name: "testing event",
	    type: "select",
	    sequence: 5,
	    selectOptions: [ "firstOption", "secondOption" ]
	}
}

describe('Round', () => {
	// create one round
	test.concurrent('if round post success return 200', async () => {
		const res = await request(app).post(`/rounds`).set("authorization", "bearer "+ adminToken).send(roundToPost)
		console.log(res.body)
		expect(res.status).toBe(200)
		expect(res.body.message).toBe("Round Successfully Created")
	}, 50000)

	// delete one round
	test.concurrent('if get all events success return status 200', async () => {
		const res = await request(app).delete(`/rounds/${choosenEvent.rounds[0].id}`).set("authorization", "bearer " + adminToken)
		console.log(res.body)
		expect(res.status).toBe(200)
		expect(res.body.message).toBe("Round Successfully Deleted")
	}, 50000)

})
