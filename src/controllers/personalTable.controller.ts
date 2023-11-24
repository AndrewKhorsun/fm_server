import { Request, Response } from 'express'
import { personalTableService } from '../services/personalTable.service.js'
import { tokenService } from '../services/token.service.js'
import { ApiError } from '../exeption/api.error.js'
import { PersonalTableAttributes } from '../models/PersonalTable.js'

const getAllRows = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const user = await tokenService.getByToken(refreshToken)

  if (!user?.userId) {
    throw ApiError.notFound('User not found')
  }

  const table = await personalTableService.getAllTable(user?.userId)

  if (!Array.isArray(table)) {
    throw ApiError.notFound('User data not found')
  }
  res.send(table.map(el => el.dataValues))
}

const updateTable = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const user = await tokenService.getByToken(refreshToken)
  const data: PersonalTableAttributes = req.body

  if (!user?.userId) {
    throw ApiError.notFound('User not found')
  }

  await personalTableService.insertPersonalData(user?.userId, data)

  const table = await getAllRows(req, res)

  res.send(table)
}

export const personalTableController = {
  getAllRows,
  updateTable,
}
