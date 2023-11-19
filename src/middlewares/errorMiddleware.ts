import { ErrorRequestHandler, Request, Response } from 'express'
import { ApiError } from '../exeption/api.error.js'

export const errorMiddleware: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
) => {
  if (error instanceof ApiError) {
    const { status, message, errors } = error;

    res.status(status).send({ message, errors });
    return;
  }

  console.debug(error);

  res.status(500).send({
    message: 'Unexpected error',
  });
}
