import { ApiError } from '../exeption/api.error.js'
import { PersonalTable } from '../models/PersonalTable.js'
import { userService } from './user.service.js'

const getAllTable = (userId: number) => {
  return PersonalTable.findAll({
    where: {
      userId,
    },
  })
}

const insertPersonalData = async (userId: number, value: PersonalTable) => {
  const user = await userService.findById(userId)

  if (!user || !user.id) {
    throw ApiError.notFound('User with this ID not found')
  }

  const personalData = await PersonalTable.create({
    ...value,
    userId: user.id,
  })

  return personalData
}

export const personalTableService = {
  getAllTable,
  insertPersonalData,
}
