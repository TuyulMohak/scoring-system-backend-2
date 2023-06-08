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
	return await prisma.player.findMany({
		select: {
			id: true,
			playerName: true,
			name: true,
			subdivision: {
				select: {
					id:true,
					name:true,
			        division: true
			    },
			}
		}
	})
}

async function pFindOnePlayer(id) {
	return await prisma.player.findFirst({
		where: {
			id: id
		},
		select: {
			id: true,
			playerName: true,
			name: true,
			subdivision: {
				select: {
					id:true,
					name:true,
			        division: true
			    },
			}
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

async function pDeleteOnePlayer(id) {
	return await prisma.player.delete({
		where: {
			id: id
		},
	})
}

async function pUpdateOnePlayer(id, data) {
	return await prisma.player.update({
		where: {
			id: id
		},
		// only able to accept string name, string playerName, string subDivisionId, bool isActive
		data: data
	})
}

export { 
	pFindAccountByUsername, 
	pFindManyPlayers, pFindOnePlayer, pCreateOnePlayer, pDeleteOnePlayer, pUpdateOnePlayer,
	pFindManySubdivisions
}