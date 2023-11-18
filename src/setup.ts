import 'dotenv/config'
import { sequelize } from './utils/db.js'
import './models/user.js'
import './models/costsList.js'

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Tables created successfully')
  })
  .catch(error => {
    console.error('Error creating tables:', error)
  })
