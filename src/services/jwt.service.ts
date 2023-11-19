import jwt from 'jsonwebtoken'
import 'dotenv/config'

interface Sign {
  id: string | undefined
  email: string
}

function sign(user: Sign) {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined in the environment variables')
  }

  const token = jwt.sign(user, process.env.JWT_KEY, {
    expiresIn: '5s'
  })

  return token
}

function verify(token: string) {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined in the environment variables')
  }

  try {
    return jwt.verify(token, process.env.JWT_KEY)
  } catch (e) {
    return null
  }
}

export const jwtService = {
  sign,
  verify,
}
