import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ApiError } from '../exeption/api.error.js'

export const errorMiddleware: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ApiError) {
    res.status(error.status).send({
      message: error.message,
      errors: error.errors,
    })
  }

  if (error) {
    res.statusCode = 500
    res.send({
      message: 'Server error',
    })
  }

  next()
}
