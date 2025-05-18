const router = require('express').Router();
const authController = require('../controller/auth.controller');

router.route('/login')
    .post(authController.login);

module.exports = router;
