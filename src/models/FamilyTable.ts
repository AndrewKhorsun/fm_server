import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/db.js'
import { User } from './User.js'

export interface FamilyTableAttributes {
  familyName: string
  category: string
  amount: number
  userId?: number
  transactionType: string
}

export interface FamilyTable
  extends Model<FamilyTableAttributes>,
    FamilyTableAttributes {}

export const FamilyTable = sequelize.define<FamilyTable>('FamilyTable', {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  familyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

FamilyTable.belongsTo(User)
