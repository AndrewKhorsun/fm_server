import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/db.js'

export const costsList = sequelize.define('cost_lists', {
  house: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  car: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  study: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cafe: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})
