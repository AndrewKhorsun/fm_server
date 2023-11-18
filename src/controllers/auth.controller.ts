import { Request, Response } from 'express'
import { User } from '../models/user.js'
import { userService } from '../services/user.service.js'
import { jwtService } from '../services/jwt.service.js'
import { ApiError } from '../exeption/api.error.js'

function validateEmail(value: string) {
  if (!value) {
    return 'Email is required'
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/

  if (!emailPattern.test(value)) {
    return 'Email is not valid'
  }

  return ''
}

function validatePassword(value: string) {
  if (!value) {
    return 'Password is required'
  }

  if (value.length < 6) {
    return 'At least 6 characters'
  }
  return ''
}

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }

  if (errors.email || errors.password) {
    throw ApiError.badRequest('Invalidate data', errors)
  }

  await userService.register(email, password)

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

  if (!user || user.password !== password) {
    res.send(401)
    return
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
