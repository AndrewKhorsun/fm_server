import 'dotenv/config'

import { sequelize } from './utils/db.js'

sequelize.sync({ force: true, logging: console.log })
.then(() => {
  console.log('Tables created successfully');
})
.catch((error) => {
  console.error('Error creating tables:', error);
});
