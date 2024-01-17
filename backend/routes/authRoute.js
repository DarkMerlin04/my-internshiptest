const express = require('express');
const router = express.Router();

const { login, register, logout, profile } = require('../controllers/authController');

router.get("/profile",profile)
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);

module.exports = router;