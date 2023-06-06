import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { pFindUserByEmail } from '../services/prisma-queries.js'

async function authenticateUser (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  try {
    if (token === null) {
      throw { status: 401, messsage: "You don't have any token" }
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        throw { status: 401, messsage: 'token not recognized or expired' }
      }

      const userRow = await pFindUserByEmail(user.email)

      // checking if the user is verified
      const result = await bcrypt.compare(user.password, userRow.password)
      if (!result) {
        throw { status: 400, message: 'Wrong login credentials' }
      }
      if(!user.isVerified) {
        throw { status: 401, message: 'Account not verified, please check your email to for the verification link'}
      }
      req.user = user
      next()
    })
  } catch (err) {
    res.status(err.status || 500).json({ status: err.status, message: err.message, completeError: err })
  }
}

export default authenticateUser