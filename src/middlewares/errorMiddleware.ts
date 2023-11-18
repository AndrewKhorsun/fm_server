import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

export const errorMiddleware: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error) {
    res.statusCode = 500
    res.send({
      message: 'some error text',
    })
  }

  next()
}
