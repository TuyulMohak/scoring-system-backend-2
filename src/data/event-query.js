import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function pGetMaxEventSequence() {
	return await prisma.event.aggregate({
		_max: {
			sequence: true,
		}
	}) 
}

async function pCreateOneEvent(eventData) {
	return await prisma.event.create({data: eventData})
}

async function pUpdateOneEvent(id, data) {
	return await prisma.event.update({
		where: {
			id: id
		},
		// only able to accept string name & string desc
		data: data
	})
}

async function pGetTwoRowBefore (id, sequenceNum) {
	return await prisma.event.findMany({
		where: {
		    id:{ equals: id },
		    sequence: {
		      lte: sequenceNum,
		    },
		},
		take: 2
	})
}

async function pGetTwoRowAfter (id, sequenceNum) {
	return await prisma.event.findMany({
		where: {
			id:{ equals: id },
		    sequence: {
		      gte: sequenceNum,
		    },
		},
		take: 2
	})
}

async function pFindManyEvents () {
	return await prisma.event.findMany()
}

async function pDeleteOneEvent (id) {
	return await prisma.event.delete({
		where: {
			id: id
		},
	})
}

async function pGetOneEvent (id) {
	return await prisma.event.findFirst({
		where: {
			id: id
		},
		include: {
			rounds: {
				select: {
					id: true, name: true, type: true, sequence: true, scores: true
				}
			}
		}
	})
}

export {
	pCreateOneEvent,
	pGetMaxEventSequence,
	pUpdateOneEvent,
	pGetTwoRowBefore,
	pGetTwoRowAfter,
	pFindManyEvents,
	pDeleteOneEvent,
	pGetOneEvent
}


// const complete sampleCreateQuery = {
//   "username": "admin",
//   "password": "admin202313",
//   "data": {
//     "name": "secondEvent",
// 	"desc": "this is starting event",
// 	"sequence": 1 ,
// 	"rounds": {
//       "create": [
//         { 
//           "name": "name", 
//           "type": "select",
//           "sequence": 1, 
//           "selectOptions":{ 
//             "create": [
//               { "name":"me" }, 
//               { "name":"another me" }
//             ]
//            }
// 		}
//       ]
//     }
//   }
// }

// const eventData = { 
// 	data:{
// 		name, 
// 		desc, 
// 		sequence,
// 		rounds: [
// 			{
// 				name,
// 				type,
// 				sequence,
// 				selectOptions: ['opt1', 'opt2'],	
// 			},
// 			{
// 				name,
// 				type,
// 				sequence,
// 				selectOptions: ['opt1', 'opt2'],	
// 			}
// 		]
// 	}
// }
