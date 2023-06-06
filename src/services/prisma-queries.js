import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function pFindAccountByUsername(username) {
	return await prisma.account.findFirst({
		where: {
			username: username
		}
	})
}

async function pFindManySubdivisions() {
	return await prisma.subdivision.findMany()
}

async function pFindManyPlayers() {
	return await prisma.player.findMany()
}

async function pFindAPlayer(id) {
	return await prisma.player.findFirst({
		where: {
			id: id
		}
	})
}

async function pCreateOnePlayer(playerName, name, subdivisionId) {
	return await prisma.player.create({
		data: {
			playerName, name, 
			subdivision: {
				connect: {
					id: subdivisionId
				}
			}
		}
	})	
}



export { 
	pFindAccountByUsername, 
	pFindManyPlayers, pFindAPlayer, pCreateOnePlayer,
	pFindManySubdivisions
}