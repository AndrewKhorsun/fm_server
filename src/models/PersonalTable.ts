import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/db.js'
import { User } from './User.js'

export interface PersonalTableAttributes {
  house?: number
  car?: number
  study?: number
  cafe?: number
}

export interface PersonalTable
  extends Model<PersonalTableAttributes>,
    PersonalTableAttributes {}

export const PersonalTable = sequelize.define<PersonalTable>('PersonalTable', {
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

PersonalTable.belongsTo(User)
