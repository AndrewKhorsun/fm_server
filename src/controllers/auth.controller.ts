import { Request, Response } from 'express'
import { User, UserModel } from '../models/User.js'
import { userService } from '../services/user.service.js'
import { jwtService } from '../services/jwt.service.js'
import { ApiError } from '../exeption/ApiError.js'
import bcrypt from 'bcrypt'
import { tokenService } from '../services/token.service.js'

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const errors = userService.validateInputs(email, password)

  if (errors.email || errors.password) {
    throw ApiError.BadRequest('Invalid data', errors)
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
  await user.save()

  res.send(user)
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await userService.findByEmail(email)

  const isPasswordValid = await bcrypt.compare(password, user?.password ?? '')

  if (!user || !isPasswordValid) {
    throw ApiError.BadRequest(
      'Invalid login or password information. Please try again.',
    )
  }

  await sendAuthentication(res, user)
}

const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const userData = jwtService.validateRefreshToken(refreshToken)

  res.clearCookie('refreshToken')

  if (!userData || !refreshToken) {
    throw ApiError.Unauthorized()
  }

  if (typeof userData !== 'string') {
    await tokenService.remove(userData.id)
  }

  res.sendStatus(204)
}

const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const userData = jwtService.validateRefreshToken(refreshToken)
  const token = await tokenService.getByToken(refreshToken)

  if (!userData || typeof userData === 'string' || !token) {
    throw ApiError.Unauthorized('Invalid refresh token')
  }

  const user = await userService.findByEmail(userData?.email)

  if (!user) {
    throw ApiError.NotFound('User not found')
  }

  await sendAuthentication(res, user)
}

const sendAuthentication = async (res: Response, user: UserModel) => {
  const userData = userService.normalize(user)
  const accessToken = jwtService.generateAccessToken(userData)
  const refreshToken = jwtService.generateRefreshToken(userData)

  if (!userData.id) {
    throw ApiError.NotFound()
  }

  await tokenService.save(userData.id, refreshToken)

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
  logout,
}
