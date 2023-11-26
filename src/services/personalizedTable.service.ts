import { ApiError } from '../exeption/api.error.js'
import {
  PersonalizedTable,
  PersonalizedTableAttributes,
} from '../models/PersonalizedTable.js'
import { userService } from './user.service.js'

const getAllPersonalizedData = async (userId: number) => {
  try {
    const result = await PersonalizedTable.findAll({
      where: {
        userId,
      },
    })

    if (!result || result.length === 0) {
      throw ApiError.notFound()
    }

    return result
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        status: error.status,
        message: error.message,
        errors: error.errors,
      }
    } else {
      throw ApiError.badRequest('Something went wrong')
    }
  }
}

const addPersonalizedData = async (
  userId: number,
  value: PersonalizedTableAttributes,
) => {
  const user = await userService.findById(userId)

  if (!user || !user.id) {
    throw ApiError.notFound('User with this ID not found')
  }

  const personalData = await PersonalizedTable.create({
    ...value,
    userId: user.id,
  })

  return personalData
}

export const PersonalizedTableService = {
  getAllPersonalizedData,
  addPersonalizedData,
}
