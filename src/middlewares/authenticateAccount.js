import jwt from 'jsonwebtoken'
import { pFindAccountByUsername } from '../services/prisma-queries.js'

async function authenticateAccount (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  try {
    if (token === null) {
      throw { status: 401, messsage: "You don't have any token" }
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, account) => {
      if (err) {
        throw { status: 401, messsage: 'Token not recognized or expired' }
      }
      req.account = account
      next()
    })
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
}

export default authenticateAccount