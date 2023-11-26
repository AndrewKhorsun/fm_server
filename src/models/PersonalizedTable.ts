import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utils/db.js'
import { User } from './User.js'

export interface PersonalizedTableAttributes {
  userId: number
  category: string
  amount: number
}

export interface PersonalizedTable
  extends Model<PersonalizedTableAttributes>,
    PersonalizedTableAttributes {}

export const PersonalizedTable = sequelize.define<PersonalizedTable>(
  'PersonalizedTable',
  {
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
  },
)

PersonalizedTable.belongsTo(User)
