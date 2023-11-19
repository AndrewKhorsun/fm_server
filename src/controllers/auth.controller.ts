import { Request, Response } from 'express'
import { User, UserModel } from '../models/User.js'
import { userService } from '../services/user.service.js'
import { jwtService } from '../services/jwt.service.js'
import { ApiError } from '../exeption/api.error.js'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import { JwtPayload } from 'jsonwebtoken'

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const errors = userService.validateInputs(email, password)

  if (errors.email || errors.password) {
    throw ApiError.badRequest('Invalidate data', errors)
  }

  const hashedPass = await bcrypt.hash(password, 10)

  await userService.register(email, hashedPass)

  res.send({ message: 'OK' })
}

const activate = async (req: Request, res: Response) => {
  const { activationToken } = req.params
  const user = await User.findOne({ where: { activationToken } })

  if (!user) {
    res.sendStatus(404)
    return
  }

  user.activationToken = null
  user.save()

  res.send(user)
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await userService.findByEmail(email)

  const isPasswordValid = await bcrypt.compare(password, user?.password ?? '')

  if (!user || !isPasswordValid) {
    throw ApiError.badRequest(
      'Invalid login or password information. Please try again.',
    )
  }

  await sendAuthentication(res, user)
}

const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const userData = jwtService.validateRefreshToken(refreshToken)

  if (!userData || typeof userData === 'string') {
    throw ApiError.unauthorized()
  }

  const user = await userService.findByEmail(userData?.email)

  if (!user) {
    throw ApiError.notFound()
  }

  await sendAuthentication(res, user)
}

async function sendAuthentication(res: Response, user: UserModel) {
  const userData = userService.normalize(user)
  const accessToken = jwtService.generateAccessToken(userData)
  const refreshToken = jwtService.generateRefreshToken(userData)

  res.cookie('refreshToken', refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  })

  res.send({
    user: userData,
    accessToken,
  })
}

export const authController = {
  register,
  activate,
  login,
  refresh,
}
