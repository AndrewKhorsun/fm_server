import { Request, Response } from 'express'
import { tokenService } from '../services/token.service.js'
import { ApiError } from '../exeption/ApiError.js'
import { FamilyTableService } from '../services/familyTable.service.js'
import { FamilyTableAttributes } from '../models/FamilyTable.js'

const createFamilyTable = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const { familyName } = req.body

  const user = await tokenService.getByToken(refreshToken)

  if (!user?.userId) {
    throw ApiError.NotFound('User not found')
  }

  await FamilyTableService.createFamilyTable(user?.userId, familyName)

  res.send('Table created')
}
const deleteFamilyName = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const user = await tokenService.getByToken(refreshToken)

  if (!user?.userId) {
    throw ApiError.NotFound('User not found')
  }

  await FamilyTableService.deleteFamilyName(user?.userId)

  res.send()
}

const updateFamilyData = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const user = await tokenService.getByToken(refreshToken)
  const data: FamilyTableAttributes = req.body

  if (!user?.userId) {
    throw ApiError.NotFound('User not found')
  }

  const test = await FamilyTableService.addFamilyData(user?.userId, {
    userId: user?.userId,
    ...data,
  })

  res.send(test)
}

export const FamilyTableController = {
  createFamilyTable,
  deleteFamilyName,
  updateFamilyData,
}
