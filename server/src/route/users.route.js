const router = require('express').Router();
const usersController = require('../controller/users.controller');
const {ensureAuthenticated} = require("../middleware/authentication.middleware");

router.route('/')
    .get(usersController.findAll)
    .post(usersController.create);
router.route('/self')
    .get(ensureAuthenticated, usersController.self);

module.exports = router;
