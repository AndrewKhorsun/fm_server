import { ApiError } from '../exeption/api.error.js'
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

const addFamilyData = async (userId: number, value: FamilyTableAttributes) => {
  const user = await userService.findById(userId)

  if (!user || !user.id) {
    throw ApiError.notFound('User with this ID not found')
  }

  if (!user.familyName) {
    throw ApiError.notFound('family name not found')
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
    throw ApiError.notFound('User not found')
  }

  if (!user || user.familyFlag) {
    throw ApiError.forbidden('User already has family table')
  }

  console.log('----------')
  console.log(familyName)
  console.log('----------')

  user.familyName = familyName
  user.familyFlag = true

  await user.save()
}

const deleteFamilyName = async (userId: number) => {
  const user = await User.findByPk(userId)

  if (!user) {
    throw ApiError.notFound('User not found')
  }

  if (user.familyName === null) {
    throw ApiError.notFound('User does not have family name')
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
