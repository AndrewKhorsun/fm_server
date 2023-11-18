import { Request, Response, NextFunction } from 'express'

interface controllerFunction {
  (req: Request, res: Response, next?: NextFunction): Promise<Response | void>
}

export const catchError = (actions: controllerFunction) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await actions(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
