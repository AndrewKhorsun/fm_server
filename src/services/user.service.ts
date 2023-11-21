import { ApiError } from '../exeption/api.error.js'
import { User, UserModel } from '../models/User.js'
import { v4 as uuidv4 } from 'uuid'
import { emailService } from './email.service.js'

const getAllActivated = () => {
  return User.findAll({
    where: {
      activationToken: null,
    },
  })
}

const findById = (id: number) => {
  return User.findOne({ where: { id } })
}

const normalize = (data: UserModel) => {
  const { id, email } = data

  return { id, email }
}

const findByEmail = (email: string) => {
  return User.findOne({ where: { email } })
}

const register = async (email: string, password: string) => {
  const activationToken = uuidv4()

  const existUser = await findByEmail(email)

  if (existUser) {
    throw ApiError.badRequest('User already exist', {
      email: 'User already exist',
    })
  }
  await User.create({ email, password, activationToken })
  emailService.sendActivationEmail(email, activationToken)
}

const validateInputs = (
  email: string,
  password: string,
): Record<string, string> => {
  const errors: Record<string, string> = {
    email: '',
    password: '',
  }

  if (!email) {
    errors.email = 'Email is required'
  } else {
    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/
    if (!emailPattern.test(email)) {
      errors.email = 'Email is not valid'
    }
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'At least 6 characters'
  }

  return errors
}

export const userService = {
  getAllActivated,
  normalize,
  findByEmail,
  register,
  validateInputs,
  findById
}
