import 'dotenv/config'
import { sequelize } from './utils/db.js'
import './models/User.js'
import './models/costsList.js'
import './models/Token.js'

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Tables created successfully')
  })
  .catch(error => {
    console.error('Error creating tables:', error)
  })
