import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

export const user = sequelize.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
