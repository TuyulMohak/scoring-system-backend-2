import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function pCreateOneRound (roundData) {
	return await prisma.round.create({ data: roundData })
}

async function pDeleteOneRound (id) {
	return await prisma.round.delete({
		where: {
			id: id
		},
	})
}

export default { pCreateOneRound, pDeleteOneRound }