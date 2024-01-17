const express = require('express');
const router = express.Router();

const { login, register, logout, profile, deleteUser, getUserByUsername } = require('../controllers/authController');

router.route('/userbyname').post(getUserByUsername);
router.route("/profile").get(profile);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/:id').delete(deleteUser);

module.exports = router;