const router = require('express').Router();
const ordersController = require('../controller/orders.controller');

router.route('/')
    .post(ordersController.createOrder);

module.exports = router;
