import express from 'express'
import 'dotenv/config'
import { authRouter } from './routs/auth.rout.js'
import cors from 'cors'
import { userRouter } from './routs/user.route.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'

const PORT = process.env.PORT || 3005
const app = express()
app.use(express.json())

app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  }),
)
app.use(authRouter)
app.use('/users', userRouter)
app.get('/', (req, res) => {
  res.send('WORK!')
})

app.use(errorMiddleware)
app.listen(PORT, () => console.log('server is running'))
