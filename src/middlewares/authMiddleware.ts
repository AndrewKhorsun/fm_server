import { ApiError } from '../exeption/api.error.js'
import { jwtService } from '../services/jwt.service.js'
import { Response, Request, NextFunction } from 'express'

export const authMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    throw ApiError.unauthorized()
  }

  const [, accessToken] = authHeader.split(' ')

  if (!accessToken) {
    throw ApiError.unauthorized()
  }

  const userData = jwtService.validateAccessToken(accessToken)

  if (!userData) {
    throw ApiError.unauthorized()
  }

  next()
}
