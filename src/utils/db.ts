import { Sequelize, Options } from 'sequelize'
import 'dotenv/config'

const sequelizeConfig: Options = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeConfig)
