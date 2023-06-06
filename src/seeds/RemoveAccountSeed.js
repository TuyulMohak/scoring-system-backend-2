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
	} catch (err) {
		console.log('the Deletion failed: ', err.message)
	}
}

await main()