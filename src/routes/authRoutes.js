const express = require('express');
const { signup, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/signup', async (req, res) => {
  try {
    const user = await signup(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post('/login', async (req, res) => {
  try {
    const token = await login(req.body);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});
module.exports = router;
