import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import data from '../data/event-query.js'

import { pFindManyPlayers } from '../data/prisma-queries.js'
import { check, validationResult } from 'express-validator'
import { errorObj } from '../services/error.js'


const checkErrorFromValidate = (validationRes) => {
  if(!validationRes.isEmpty()) {
    const errMessages = validationRes.errors.map((err, index)=> index+1+ '. '+ err.msg).join(', ')
    throw { status: 400, errors: validationRes.errors, message: errMessages }
  }
  return
}

async function postOneEvent(req, res) {
	const validationRes = validationResult(req)
	try {
		const { name, desc, startDate, rounds } = req.body.data
		const newRounds = { 
			create: rounds.map(round => {
				const newRound = {
					name: round.name,
					type: round.type,
					sequence: round.sequence
				}

				if (round.hasOwnProperty('selectOptions')) {
					const opts = { 
						create: round.selectOptions.map(opt => {
							return { name: opt.name }
						})
					}
					newRound.selectOptions = opts
				}
				return newRound
			})
		}
		checkErrorFromValidate(validationRes)
		const eventPosted = await data.pCreateOneEvent({ name, desc, startDate, rounds: newRounds })
		res.status(200).json({ message:"Event Successfully Created", data: eventPosted })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function updateOneEvent (req, res) {
	const validationRes = validationResult(req)
	try {
		const eventId = req.params.id
		const updateData = req.body.data
		checkErrorFromValidate(validationRes)
		const eventUpdated = await data.pUpdateOneEvent(eventId, updateData)
		res.status(200).json({ message:"Event Successfully Updated", data: eventUpdated })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function getEvents (req, res) {
	const validationRes = validationResult(req)
	try {
		checkErrorFromValidate(validationRes)
		const events = await data.pFindManyEvents()
		res.status(200).json({ message: "Success", data: events })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function getOneEvent (req, res) {
	const validationRes = validationResult(req)
	try {
		const eventId = req.params.id
		checkErrorFromValidate(validationRes)
		const event = await data.pGetOneEvent(eventId)
		if(event === null) {
			throw { status: 404, message: "Event not exist" }
		}

		// Take the rounds array of object
		// loop then flatten first to { playerId, roundId, scoreId }
		// Loop through each of em, flatten it, change it to { playerId, scores: [{ roundId, Score }, { roundId, Score }] }
		// Gabungin jd satu array gede, sort by playerId
		// Ambil semua players
		// loop ke setiap player
		// if playerId di player sama dgn playerId di object score

		let allScores = []
		for (let i=0;i<event.rounds.length; i++) {
			event.rounds[i].scores.map(score => {
				allScores.push(score)
			})
			delete event.rounds[i].scores
		}

		// sort by playerId
		const newScores = []
		allScores = allScores.sort((a, b) => a.playerId.localeCompare(b.playerId));
		let currentStart = 0
		for (let i=0; i<allScores.length; i++) {
			if(i === allScores.length-1) {
				newScores.push({
					playerId: allScores[i].playerId,
					scores: allScores.slice(currentStart)
				})
			}
			else if(allScores[i].playerId !== allScores[i+1].playerId) {
				newScores.push({
					playerId: allScores[i].playerId,
					scores: allScores.slice(currentStart, i+1)
				})
				currentStart = i+1
			}
		}

		// get all the players
		let players = await pFindManyPlayers()
		// THIS IS HIGHLY INNEFICIENT, REFACTOR
		// There are a lot of unnecessary loop on the newScores.map
		const newPlayers = players.map((player) => {
			newScores.map((score) => {
				console.log(player.id === score.playerId)
				
				if(player.id === score.playerId) {
					player.scores = score.scores
					// newScores.splice(index, 1)
				}
			})
			return player
		})
		console.log(newPlayers)

		event.players = newPlayers
		res.status(200).json({ message: "Success", data:event })
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}

async function deleteOneEvents(req, res) {
	const validationRes = validationResult(req)
	try {
		const eventId = req.params.id
		checkErrorFromValidate(validationRes)
		const event = await data.pDeleteOneEvent(eventId)
		res.status(200).json( { message:`Event Successfully Deleted`, data:event } )
	} catch (err) {
		res.status(err.status || 500).json(errorObj(err))
	}
}


export default { postOneEvent, updateOneEvent, getEvents, deleteOneEvents, getOneEvent }