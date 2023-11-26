import 'dotenv/config'
import { sequelize } from './utils/db.js'
import './models/User.js'
import './models/PersonalizedTable.js'
import './models/Token.js'
import './models/FamilyTable.js'

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Tables created successfully')
  })
  .catch(error => {
    console.error('Error creating tables:', error)
  })
