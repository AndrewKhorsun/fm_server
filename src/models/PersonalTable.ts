import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/db.js'
import { User } from './User.js'

export interface PersonalTableAttributes {
  userId: number
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
    allowNull:true
  },
  car: {
    type: DataTypes.INTEGER,
    allowNull:true
  },
  study: {
    type: DataTypes.INTEGER,
    allowNull:true
  },
  cafe: {
    type: DataTypes.INTEGER,
    allowNull:true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

PersonalTable.belongsTo(User)
