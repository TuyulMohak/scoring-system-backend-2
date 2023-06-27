// WORKING FINE
import app from '../../../app.js'
import request from 'supertest'
import { describe, expect, test } from 'vitest'
import jwt from 'jsonwebtoken'

import eventData from '../../data/event-query.js'
const adminToken = jwt.sign({ username:"admin", role:"ADMIN" }, process.env.ACCESS_TOKEN_SECRET)
const events = await eventData.pFindManyEvents()

const eventToPost = {
	"data": {
	    "name": "testing event",
	    "desc": "This is my testing event",
	    "startDate": "50 years from now",
	    "rounds": [
	      { 
	        "name": "namae" , 
	        "type": "text",
	        "sequence": 1
	      }, 
	      {
	        "name": "isGood", 
	        "type": "select", 
	        "sequence": 1,
	        "selectOptions": [{ name: 'yes'}, {name: 'no'}]
	      }
	    ]
	  }}


describe('Event', () => {
	// get 1 event
		// if not exist
	test.concurrent('if event not exist return 404', async () => {
		const res = await request(app).get('/events/6481819e51e7ccaa52564dad').set("authorization", "bearer "+ adminToken)
		console.log(res.body)
		expect(res.status).toBe(404)
		expect(res.body.message).toBe("Event not exist")
	}, 50000)

		// if exist 
	test.concurrent('if event exist return status 200', async () => {
		const res = await request(app).get(`/events/${events[0].id}`).set("authorization", "bearer "+ adminToken)
		console.log(res.body)
		expect(res.status).toBe(200)
		expect(res.body.message).toBe("Success")
	}, 50000)

	// get all event
	test.concurrent('if get all events success return status 200', async () => {
		const res = await request(app).get('/events').set("authorization", "bearer " + adminToken)
		console.log(res.body)
		expect(res.status).toBe(200)
		expect(res.body.message).toBe("Success")
	}, 50000)

	// post one event
	test.concurrent('if event posted return status 200', async () => {
		const res = await request(app).post('/events').set("authorization", "bearer " + adminToken).send(eventToPost)
		console.log(res.body)
		expect(res.status).toBe(200)
		expect(res.body.message).toBe("Event Successfully Created")
	}, 50000)

	// update one event
	test('if event update success return status 200', async () => {
		const res = await request(app).patch(`/events/${events[0].id}`).set("authorization", "bearer " + adminToken).send({ data:{ name:"newName for testing" } })
		console.log(res.body)
		expect(res.status).toBe(200)
		expect(res.body.message).toBe("Event Successfully Updated")
	}, 50000)

	// delete one event
	test('if event delete success return status 200', async () => {
		const res = await request(app).delete(`/events/${events[0].id}`).set("authorization", "bearer " + adminToken)
		console.log(res.body)
		expect(res.status).toBe(200)
		expect(res.body.message).toBe("Event Successfully Deleted")
	}, 50000)
})
