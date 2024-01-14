import { Request, Response } from 'express'
import { PersonalizedTableService } from '../services/personalizedTable.service.js'
import { tokenService } from '../services/token.service.js'
import { ApiError } from '../exeption/ApiError.js'
import { PersonalizedTableAttributes } from '../models/PersonalizedTable.js'
import moment from 'moment'

const getAllRows = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const { startDate, endDate } = req.query

  const start = (startDate as string) ?? moment(new Date()).format('YYYY-MM-DD')
  const end =
    endDate?.toString() ??
    moment(start ?? new Date())
      .add(1, 'month')
      .format('YYYY-MM-DD')

  const user = await tokenService.getByToken(refreshToken)

  if (!user?.userId) {
    throw ApiError.NotFound('User not found')
  }

  const table = await PersonalizedTableService.getAllPersonalizedData(
    user?.userId,
    start,
    end,
  )

  if (!Array.isArray(table)) {
    throw ApiError.NotFound('No data for the selected month')
  }
  res.send(table.map(el => el.dataValues))
}

const updateTable = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const user = await tokenService.getByToken(refreshToken)
  const data: PersonalizedTableAttributes = req.body

  if (!user?.userId) {
    throw ApiError.NotFound('User not found')
  }

  await PersonalizedTableService.addPersonalizedData(user?.userId, data)

  const table = await getAllRows(req, res)

  res.send(table)
}

export const PersonalizedTableController = {
  getAllRows,
  updateTable,
}
