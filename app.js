const express = require('express');
const { db } = require('./models');
const { userRoutes, orderRoutes } = require('./routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', orderRoutes);

app.listen(3000, async () => {
  console.log('Server is running on port 3000');
  
  // Connect to PostgreSQL
  try {
    await db.sequelize.authenticate();
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
});