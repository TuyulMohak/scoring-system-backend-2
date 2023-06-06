import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main () {
	try {
		const deletedData = await prisma.account.deleteMany({})
		console.log('Deleted all accounts Records')
	} catch (err) {
		console.log('the Deletion failed: ', err.message)
	}
}

await main()