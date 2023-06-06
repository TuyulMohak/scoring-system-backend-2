import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { adminAccount, neoterAccounts } from './accounts.js'
import divisions from './divisions.js'
import { getPlayers } from './players.js'

async function main () {
	try {
		await prisma.account.createMany({
			data:[ adminAccount, ...neoterAccounts ]
		})
		console.log('Created Seeding Accounts for testing')

		divisions.map(async (division) => {
			await prisma.division.create(division)
		})
		console.log('Created Divisions and Subdivisions for testing')
		
		const players = await getPlayers()
		players.map(async (player) => {
			await prisma.player.create(player)
		})
		console.log('Created Players for testing')
	
	} catch (err) {
		console.log('seeding failed: ', err.message)
	}
}
await main()