import { ApiError } from '../exeption/ApiError.js'
import { FamilyTable, FamilyTableAttributes } from '../models/FamilyTable.js'
import { User } from '../models/User.js'
import { userService } from './user.service.js'

const getAllFamilyData = async (familyName: string) => {
  try {
    const result = await FamilyTable.findAll({
      where: {
        familyName,
      },
    })

    if (!result || result.length === 0) {
      throw ApiError.NotFound()
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
      throw ApiError.BadRequest('Something went wrong')
    }
  }
}

const addFamilyData = async (userId: number, value: FamilyTableAttributes) => {
  const user = await userService.findById(userId)

  if (!user || !user.id) {
    throw ApiError.NotFound('User with this ID not found')
  }

  if (!user.familyName) {
    throw ApiError.NotFound('family name not found')
  }

  const personalData = await FamilyTable.create({
    ...value,
    familyName: user.familyName,
  })

  return personalData
}

const createFamilyTable = async (userId: number, familyName: string) => {
  const user = await User.findByPk(userId)

  if (!user) {
    throw ApiError.NotFound('User not found')
  }

  if (!user || user.familyFlag) {
    throw ApiError.Forbidden('User already has family table')
  }

  user.familyName = familyName
  user.familyFlag = true

  await user.save()
}

const deleteFamilyName = async (userId: number) => {
  const user = await User.findByPk(userId)

  if (!user) {
    throw ApiError.NotFound('User not found')
  }

  if (user.familyName === null) {
    throw ApiError.NotFound('User does not have family name')
  }

  user.familyFlag = false
  user.familyName = null

  await user.save()
}

export const FamilyTableService = {
  getAllFamilyData,
  addFamilyData,
  createFamilyTable,
  deleteFamilyName,
}
