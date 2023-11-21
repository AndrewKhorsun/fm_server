import { Request, Response } from 'express'
import { personalTableService } from '../services/personalTable.service.js'
import { tokenService } from '../services/token.service.js'
import { ApiError } from '../exeption/api.error.js'

const getAllRows = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const user = await tokenService.getByToken(refreshToken)

  if (!user?.userId) {
    throw ApiError.notFound('User not found')
  }

  const table = await personalTableService.getAllTable(user?.userId)

  console.log(table.map(el => el.dataValues))
}

export const personalTableController = {
  getAllRows,
}
