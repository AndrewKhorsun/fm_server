import { Request, Response } from 'express'
import { PersonalizedTableService } from '../services/personalizedTable.service.js'
import { tokenService } from '../services/token.service.js'
import { ApiError } from '../exeption/api.error.js'
import { PersonalizedTableAttributes } from '../models/PersonalizedTable.js'

const getAllRows = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const user = await tokenService.getByToken(refreshToken)

  if (!user?.userId) {
    throw ApiError.notFound('User not found')
  }

  const table = await PersonalizedTableService.getAllPersonalizedData(
    user?.userId,
  )

  if (!Array.isArray(table)) {
    throw ApiError.notFound('User data not found')
  }
  res.send(table.map(el => el.dataValues))
}

const updateTable = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const user = await tokenService.getByToken(refreshToken)
  const data: PersonalizedTableAttributes = req.body

  if (!user?.userId) {
    throw ApiError.notFound('User not found')
  }

  await PersonalizedTableService.addPersonalizedData(user?.userId, data)

  const table = await getAllRows(req, res)

  res.send(table)
}

export const PersonalizedTableController = {
  getAllRows,
  updateTable,
}
