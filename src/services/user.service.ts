import { ApiError } from '../exeption/api.error.js'
import { User, UserModel } from '../models/user.js'
import { v4 as uuidv4 } from 'uuid'
import { emailService } from './email.service.js'

function getAllActivated() {
  return User.findAll({
    where: {
      activationToken: null,
    },
  })
}

function normalize(data: UserModel) {
  const { id, email } = data

  return { id, email }
}

function findByEmail(email: string) {
  return User.findOne({ where: { email } })
}

async function register(email: string, password: string) {
  const activationToken = uuidv4()

  const existUser = await findByEmail(email)

  if (existUser) {
    throw ApiError.badRequest('User alredy exist', {
      email: 'User alredy exist',
    })
  }
  await User.create({ email, password, activationToken })
  emailService.sendActivationEmail(email, activationToken)
}

export const userService = {
  getAllActivated,
  normalize,
  findByEmail,
  register,
}
