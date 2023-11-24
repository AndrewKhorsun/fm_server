import jwt from 'jsonwebtoken'
import 'dotenv/config'

interface Sign {
  id: number | undefined
  email: string
}

const generateAccessToken = (user: Sign) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('JWT_KEY is not defined in the environment variables')
  }

  const token = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '60s',
  })

  return token
}

const validateAccessToken = (token: string) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('JWT_KEY is not defined in the environment variables')
  }

  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
  } catch (e) {
    return null
  }
}

const generateRefreshToken = (user: Sign) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_KEY is not defined in the environment variables')
  }

  const token = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '2500000s',
  })

  return token
}

const validateRefreshToken = (token: string) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_KEY is not defined in the environment variables')
  }

  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
  } catch (e) {
    return null
  }
}

export const jwtService = {
  generateAccessToken,
  validateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
}
