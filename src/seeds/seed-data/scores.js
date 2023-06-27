import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { pFindManyPlayers } from '../../data/prisma-queries.js'
import eventData from '../../data/event-query.js'

	// roundId String @db.ObjectId
	// playerId String @db.ObjectId
	// textScore String?
	// numberScore Float? 
	// selectedOptionId String? @db.ObjectId
	
	// { roundId, playerId, score }
const sendScores = async () => {
	const players = await pFindManyPlayers()
	const events = await eventData.pFindManyEvents()
	const chosenEvent = await eventData.pGetOneEvent(events[0].id)

	const scoreQueries = []
	for ( let i=0; i<3; i++ ) {
		chosenEvent.rounds.map(async round => {
			const scoreQuery = {
				player: {
					connect:{
						id: players[i].id
					}
				},
				round: {
					connect: {
						id: round.id
					}
				}
			}

			if (round.type === 'text' || round.type === 'textarea' || round.type === 'datetime') {
				scoreQuery.textScore = "TextVALUE"
			}
			else if (round.type === 'number') {
				scoreQuery.numberScore = 99
			}
			else if (round.type === 'select') {
				scoreQuery.selectedOptionId = round.selectOptions[0].id
			}

			await prisma.score.create({ data: scoreQuery })
			// scoreQueries.push({ data: scoreQuery })
			console.log("added SCORE")
		})
	}
}


export { sendScores }