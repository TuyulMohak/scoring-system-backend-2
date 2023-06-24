import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function pGetMaxRoundSequence() {
	return await prisma.round.aggregate({
		_max: {
			sequence: true,
		}
	}) 
}

async function pCreateOneRound (roundData) {
	return await prisma.round.create({ data: roundData })
}

async function pUpdateOneRound(id, data) {
	return await prisma.round.update({
		where: {
			id: id
		},
		// only able to accept string name & string desc
		data: data
	})
}

async function pDeleteOneRound (id) {
	return await prisma.round.delete({
		where: {
			id: id
		},
	})
}

async function pGetTwoRowBefore (id, sequenceNum) {
	return await prisma.round.findMany({
		where: {
		    id:{ equals: id },
		    sequence: {
		      lte: sequenceNum,
		    },
		},
		take: 2
	})
}

async function pGetTwoRowAfter (id, sequenceNum) {
	return await prisma.round.findMany({
		where: {
			id:{ equals: id },
		    sequence: {
		      gte: sequenceNum,
		    },
		},
		take: 2
	})
}

export default { pGetMaxRoundSequence, pCreateOneRound, pDeleteOneRound, pGetTwoRowAfter, pGetTwoRowBefore }