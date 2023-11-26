import { Router } from 'express'
import { userController } from '../controllers/user.controller.js'
import { authMiddleWare } from '../middlewares/authMiddleware.js'
import { catchError } from '../utils/catchError.js'
import { PersonalizedTableController } from '../controllers/personalizedTable.controller.js'
import { FamilyTableController } from '../controllers/familyTable.controller.js'

export const userRouter = Router()

userRouter.get('/', authMiddleWare, catchError(userController.getAllActivated))
userRouter.post(
  '/update-expenses',
  authMiddleWare,
  catchError(PersonalizedTableController.updateTable),
)
userRouter.get(
  '/get-expenses',
  authMiddleWare,
  catchError(PersonalizedTableController.getAllRows),
)
userRouter.post(
  '/create-family-table',
  authMiddleWare,
  catchError(FamilyTableController.createFamilyTable),
)
userRouter.get(
  '/delete-family-name',
  authMiddleWare,
  catchError(FamilyTableController.deleteFamilyName),
)

userRouter.post(
  '/update-family-expenses',
  authMiddleWare,
  catchError(FamilyTableController.updateFamilyData),
)
