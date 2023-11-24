import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/db.js'
import { User } from './User.js'

export interface PersonalTableAttributes {
  userId: number
  category: string
  amount: number
}

export interface PersonalTable
  extends Model<PersonalTableAttributes>,
    PersonalTableAttributes {}

export const PersonalTable = sequelize.define<PersonalTable>('PersonalTable', {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

PersonalTable.belongsTo(User)
