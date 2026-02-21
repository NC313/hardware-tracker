const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const componentRoutes = require('./routes/components');
const authRoutes = require('./routes/auth');
const passport = require('./config/passport');


const app = express();
app.set('trust proxy', 1);
app.use(cors({
  origin: ['http://localhost:5173', 'https://hardware-tracker-rho.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URI,)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/components', componentRoutes);
app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));