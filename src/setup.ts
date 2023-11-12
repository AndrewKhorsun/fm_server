import 'dotenv/config'
import { sequelize } from './utils/db.js'
import './modules/user.js'
import './modules/costsList.js'

sequelize
  .sync()
  .then(() => {
    console.log('Tables created successfully')
  })
  .catch(error => {
    console.error('Error creating tables:', error)
  })
