import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { pFindManyPlayers } from '../data/prisma-queries.js'

const players = await pFindManyPlayers()

async function createEvent (num) {
	return await prisma.event.create({
		  "data": {
		    "name": "SecondGeneratedEvent",
			"desc": "this is starting event",
			"sequence": 1 ,
			"rounds": {
		      "create": [
		        { 
		          "name": "isAlive", 
		          "type": "select",
		          "sequence": 1, 
		          "selectOptions":{ 
		            "create": [
		              { "name":"me" }, 
		              { "name":"another me" }
		            ]
		           }
				},
				{ 
		          "name": "age", 
		          "type": "number",
		          "sequence": 2,
		          "scores": {
		          	create: [
		          		{
		          			name:'useless stuf',
		          			player: {
		          				connect: { id: players[0].id }
		          			},
		          			numberScore: 60
		          		},
		          		// {
		          		// 	name:'useless stuf',
		          		// 	player: {
		          		// 		connect: {
		          		// 			id: "648160efba00197a7718f3be"
		          		// 		}
		          		// 	},
		          		// 	numberScore: 70
		          		// }
		          	]
		          }
				}
		      ]
		    }
		  }
	})
}
const val = await createEvent()
console.log(val)