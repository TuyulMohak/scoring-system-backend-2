import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function pFindAccountByUsername(username) {
	return await prisma.account.findFirst({
		where: {
			username: username
		}
	})
}

async function pfindManySubdivisions() {
	return await prisma.subdivision.findMany()
}

async function pFindManyPlayers() {
	return await prisma.player.findMany()
}



export { 
	pFindAccountByUsername, 
	pFindManyPlayers,
	pfindManySubdivisions
}