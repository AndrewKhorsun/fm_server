import { User, UserModel } from '../models/user.js'

function getAllActivated() {
  return User.findAll({
    where: {
      activationToken: null,
    },
  })
}

function normalize(data: UserModel) {
  const { id, email } = data

  return { id, email }
}

function findByEmail(email: string) {
  return User.findOne({ where: { email } })
}

export const userService = {
  getAllActivated,
  normalize,
  findByEmail,
}
