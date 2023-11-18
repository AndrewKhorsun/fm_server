import { jwtService } from '../services/jwt.service.js'
import { Response, Request, NextFunction } from 'express'

export const authMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization: string = req.headers['authorization'] || ''
  const [, token] = authorization.split(' ')

  if (!authorization || !token) {
    res.sendStatus(401)
    return
  }

  const userData = jwtService.verify(token)

  if (!userData) {
    res.sendStatus(401)
    return
  }

  next()
}
