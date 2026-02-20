const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Hardcoded user 
const HARDCODED_USER = {
  username: 'nathaniel',
  password: 'password123'
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== HARDCODED_USER.username || password !== HARDCODED_USER.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ token });
});

module.exports = router;