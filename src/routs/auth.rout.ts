import { Router } from 'express'
import { authController } from '../controllers/auth.controller.js'
import { catchError } from '../utils/catchError.js'

export const authRouter = Router()

authRouter.post('/registration', catchError(authController.register))
authRouter.get(
  '/activation/:activationToken',
  catchError(authController.activate),
)
authRouter.post('/login', catchError(authController.login))
authRouter.post('/refresh', catchError(authController.refresh))
