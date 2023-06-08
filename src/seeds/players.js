import { pFindManySubdivisions } from '../data/prisma-queries.js'


const getPlayers = async () => {
	const subdivisions = await pFindManySubdivisions()
	const players = []
	for(let i = 0; i < subdivisions.length ;i++){
		players.push({
			data: {
			    playerName: subdivisions[i].name + "_player_" + i,
			    name: subdivisions[i].name + "_player",
			    subdivision: {
			      connect: { id: subdivisions[i].id },
			    },
			},
			include: {
			    subdivision: true, // Include all posts in the returned object
			}
		})
	}
	return players
}


export { getPlayers}