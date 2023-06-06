import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { 
	adminAccount,
	neoterAccounts
} from './accounts.js'

async function main () {
	try {
		const newUser = await prisma.account.createMany({
			data:[ adminAccount, ...neoterAccounts ]
		})
		console.log('Created Seeding Accounts for testing')
	} catch (err) {
		console.log('seeding failed: ', err.message)
	}
}
await main()