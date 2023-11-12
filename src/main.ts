import express from 'express'
import 'dotenv/config'
import { authRouter } from './routs/auth.rout.js'

const PORT = process.env.PORT || 3005
const app = express()
app.use(express.json())

app.use(authRouter)

app.get('/', (req, res) => {
  res.send('WORK!')
})

app.listen(PORT, () => console.log('server is running'))
