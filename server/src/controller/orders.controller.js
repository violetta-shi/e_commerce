const ordersService = require('../service/orders.service');

const createOrder = async (req, res, next) => {
    try {
        const order = req.body;
        const creatorId = req.authentication?.user?.id;
        await ordersService.createOrder(order, creatorId);
        res.status(201).end();
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    createOrder,
};
