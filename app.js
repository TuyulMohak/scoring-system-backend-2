import express from 'express'
const app = express()

import router from './src/routes/index.js'

app.use(express.json())
app.use('/', router);

export default app