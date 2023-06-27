import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main () {
	try {
		await prisma.account.deleteMany({})
		console.log('Deleted all accounts Records')
		await prisma.division.deleteMany({})
		console.log('Deleted all divisions Records')
		await prisma.player.deleteMany({})
		console.log('Deleted all players Records')
		await prisma.event.deleteMany({})
		console.log('Deleted all events Records')
		await prisma.round.deleteMany({})
		console.log('Deleted all rounds Records')
		await prisma.score.deleteMany({})
		console.log('Deleted all scores Records')
	} catch (err) {
		console.log('the Deletion failed: ', err.message)
	}
}

await main()