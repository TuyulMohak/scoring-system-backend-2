import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function pUpsertOneScore (scoreData) {
	const { roundId, playerId } = scoreData
	console.log(roundId, playerId)
	delete scoreData.roundId
	delete scoreData.playerId

	const isScoreExist = await prisma.score.findFirst({
		where: {
			AND: [
		      {
		        roundId: {
		          equals: roundId,
		        },
		      },
		      {
		        playerId: {
		          equals: playerId,
		        },
		      },
		    ]
		}
	})
	const roundData = await prisma.round.findFirst({
		where:{
			id:roundId
		}
	})
	console.log(isScoreExist)

	const insertData = {
		round: {
			connect:{
				id: roundId
			}
		},
		player: {
			connect: {
				id: playerId
			}
		}
	}
	console.log(roundData)
	console.log("THEST THRUTYHY NESS: ", roundData.type.toLowerCase() === 'select')
	if (roundData.type.toLowerCase() === "select") {
		insertData.selectedOptionId = scoreData.selectedOptionId
	} else if (roundData.type.toLowerCase() === "number") {
		insertData.numberScore = scoreData.numberScore
	} else if (roundData.type.toLowerCase() === "text") {
		insertData.textScore = scoreData.textScore
	}
	console.log("THIS IS THE INSERT DATA")
	console.log(insertData)
	if(!isScoreExist) {
		return await prisma.score.create({
			data:insertData
		})
	}

	delete insertData.roundId
	delete insertData.playerId
	return await prisma.score.update({
		where:{
			id:isScoreExist.id
		},
		data:{
			...insertData
		}
	})

}

export default { pUpsertOneScore }