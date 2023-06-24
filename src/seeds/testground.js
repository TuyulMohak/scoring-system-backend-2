import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { pFindManyPlayers } from '../data/prisma-queries.js'

const players = await pFindManyPlayers()

async function createEvent (num) {
	return await prisma.event.create({
		  "data": {
		    "name": "SecondGeneratedEvent",
			"desc": "this is starting event",
			"startDate": "NOW",
			"rounds": {
		      "create": [
		        { 
		          "name": "isAlive", 
		          "type": "select",
		          "sequence": 1, 
		          "selectOptions":{ 
		            "create": [
		              { "name":"yes" }, 
		              { "name":"no" }
		            ]
		           }
				},
				{ 
		          "name": "age", 
		          "type": "number",
		          "sequence": 2
				}
		      ]
		    }
		  }
	})
}
const val = await createEvent()
console.log(val)