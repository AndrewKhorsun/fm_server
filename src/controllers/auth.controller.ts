import { Request, Response } from 'express'
import { user } from '../modules/user.js'

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const newUser = await user.create({ email, password })
  res.send(newUser)
}

export const authController = {
  register,
}
