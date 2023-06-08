import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function pGetTwoRowBefore (num) {
	return await prisma.event.findMany({
		where: {
		    sequence: {
		      lte: num,
		    },
		},
		take: 2
	})
}
const val = await pGetTwoRowBefore(7)
console.log(val)