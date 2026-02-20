const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const componentRoutes = require('./routes/components');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/components', componentRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));