const express = require('express');
const router = express.Router();
const ordersController = require('../controller/orders.controller');
const { getAllOrders } = require('../service/orders.service');

router.route('/')
    .post(ordersController.createOrder);

router.get('/', async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error in orders route:', error);
    res.status(500).send('Error retrieving orders');
  }
});

module.exports = router;
