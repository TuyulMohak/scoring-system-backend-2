import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function pFindUserByEmail(email) {
	return await prisma.user.findFirst({
		where: {
			email: email
		}
	}) 
}

async function pFindAccountByUsername(username) {
	return await prisma.account.findFirst({
		where: {
			username: username
		}
	})
}

export { pFindUserByEmail, pFindAccountByUsername }