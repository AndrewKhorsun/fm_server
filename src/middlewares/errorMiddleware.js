import { ApiError } from '../exeption/ApiError.js'

export function errorMiddleware(error, req, res, next) {
  if (error instanceof ApiError) {
    const { status, message, errors } = error
    console.log(status, message, errors)
    res.status(status).send({ message, errors })
    return
  }

  if (error) {
    res.status(500).send({
      message: 'Unexpected error',
    })
  }

  next()
}
