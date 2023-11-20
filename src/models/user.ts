import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/db.js'

export interface UserCreationAttributes {
  email: string
  password: string
  activationToken: string | null
  id?: number
}

export interface UserModel
  extends Model<UserCreationAttributes>,
    UserCreationAttributes {}
export const User = sequelize.define<UserModel>('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  activationToken: {
    type: DataTypes.STRING,
  },
})
