const router = require('express').Router();
const authController = require('../controller/auth.controller');

router.route('/login')
    .post(authController.login);

router.route('/register')
    .post(authController.register);

module.exports = router;
