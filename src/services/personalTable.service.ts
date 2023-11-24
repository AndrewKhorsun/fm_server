import { ApiError } from '../exeption/api.error.js'
import {
  PersonalTable,
  PersonalTableAttributes,
} from '../models/PersonalTable.js'
import { userService } from './user.service.js'

const getAllTable = async (userId: number) => {
  try {
    const result = await PersonalTable.findAll({
      where: {
        userId,
      },
    });

    if (!result || result.length === 0) {
      throw  ApiError.notFound();
    }

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        status: error.status,
        message: error.message,
        errors: error.errors,
      };
    } else {

      throw ApiError.badRequest('Something went wrong');
    }
  }
}

const insertPersonalData = async (
  userId: number,
  value: PersonalTableAttributes,
) => {
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
