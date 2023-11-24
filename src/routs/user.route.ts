import { Router } from 'express'
import { userController } from '../controllers/user.controller.js'
import { authMiddleWare } from '../middlewares/authMiddleware.js'
import { catchError } from '../utils/catchError.js'
import { personalTableController } from '../controllers/personalTable.controller.js'

export const userRouter = Router()

userRouter.get('/', authMiddleWare, catchError(userController.getAllActivated))
userRouter.post(
  '/update-expenses',
  authMiddleWare,
  catchError(personalTableController.updateTable),
)
userRouter.get(
  '/get-expenses',
  authMiddleWare,
  catchError(personalTableController.getAllRows),
)
