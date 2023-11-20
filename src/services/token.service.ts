import { Token } from '../models/Token.js'

const save = async (userId: number, newToken: string) => {
  const token = await Token.findOne({
    where: { userId },
  })

  if (!token || !token.refreshToken) {
    await Token.create({ userId, refreshToken: newToken })
    return
  }

  token.refreshToken = newToken
  await token.save()
}

const getByToken = (refreshToken: string) => {
  return Token.findOne({
    where: { refreshToken },
  })
}

const remove = (userId: number) => {
  return Token.destroy({
    where: { userId },
  })
}

export const tokenService = {
  getByToken,
  save,
  remove,
}
