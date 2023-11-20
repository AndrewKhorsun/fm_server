import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/db.js'
import { User } from './User.js'

interface TokenAttributes {
  refreshToken: string
  userId: number
}

interface TokenInstance extends Model<TokenAttributes>, TokenAttributes {}

export const Token = sequelize.define<TokenInstance>('token', {
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

Token.belongsTo(User)
User.hasOne(Token)
