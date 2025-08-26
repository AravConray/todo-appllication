const authService = require('../services/authService');
const { validationResult } = require('express-validator');
const logger = require('../config/logger');
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const user = await authService.registerUser({ name, email, password });
    return res.status(201).json(user);
  } catch (err) {
    logger.error('Register failed', err);
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const tokens = await authService.loginUser({ email, password });
    return res.status(200).json(tokens);
  } catch (err) {
    logger.error('Login failed', err);
    return res
      .status(401)
      .json({ message: err.message || 'Invalid credentials' });
  }
};
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token required' });
    }
    const tokens = await authService.refreshToken(refreshToken);
    return res.status(200).json(tokens);
  } catch (err) {
    logger.error('Token refresh failed', err);
    return res
      .status(401)
      .json({ message: err.message || 'Invalid refresh token' });
  }
};
module.exports = { register, login, refreshToken };
