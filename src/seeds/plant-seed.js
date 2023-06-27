import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { adminAccount, neoterAccounts } from './seed-data/accounts.js'
import divisions from './seed-data/divisions.js'
import { getPlayers } from './seed-data/players.js'
import events from './seed-data/events.js'
import { sendScores } from './seed-data/scores.js'

async function main () {
	try {
		// Adding Accounts
		await prisma.account.createMany({
			data:[ adminAccount, ...neoterAccounts ]
		})
		console.log('Created Seeding Accounts for testing')


		// Adding Divisions and Subdivisions
		divisions.map(async (division) => {
			await prisma.division.create(division)
		})
		console.log('Created Divisions and Subdivisions for testing')

		
		// adding players
		const players = await getPlayers()
			// const playerCreated = prisma.player.createMany({data: players})
		for (let i=0; i < players.length; i++) {
			await prisma.player.create(players[i])
		}
		console.log('Created Players for testing')


		// Adding Events
		await prisma.event.create(events)
		console.log('Created Events for testing')


		// Adding Scores
		await sendScores()
		console.log('Created Scores for testing')

		// create event with rounds + scores for some of the players
		console.log('FINISHED')
	} catch (err) {
		console.log('seeding failed: ', err.message)
	}
}
await main()