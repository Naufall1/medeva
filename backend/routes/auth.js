// implement route for login
const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const { loginSchema } = require('../validators/auth');
const authController = require('../controllers/authController');

router.post('/login', validate(loginSchema), authController.login);
// TODO: implement route for /me to get current user info based on token

module.exports = router;