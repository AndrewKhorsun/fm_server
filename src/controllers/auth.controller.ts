import { Request, Response } from 'express'
import { User } from '../models/User.js'
import { userService } from '../services/user.service.js'
import { jwtService } from '../services/jwt.service.js'
import { ApiError } from '../exeption/api.error.js'
import bcrypt from 'bcrypt'

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

  const normalizedUser = userService.normalize(user)
  const accessToken = jwtService.sign(normalizedUser)

  res.send({
    user: normalizedUser,
    accessToken,
  })
}

export const authController = {
  register,
  activate,
  login,
}
