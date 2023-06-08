import jwt from 'jsonwebtoken'

async function authenticateAdmin (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  try {
    if (token === null) {
      throw { status: 401, messsage: "You don't have any token" }
    }
    const account = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (account.role !== "ADMIN") {
      throw { status: 401, messsage: "You're Not Authorized" }
    }
    req.account = account
    next()
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
}

export default authenticateAdmin