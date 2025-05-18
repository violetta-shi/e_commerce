const productsRouter = require('express').Router({ mergeParams: true });
const categoryProductsRouter = require('express').Router({ mergeParams: true });
const productsController = require('../controller/products.controller');
const { ensureAdminRole } = require('../middleware/authentication.middleware');
const { upload } = require('../middleware/multipartform.middleware');

productsRouter.route('/')
    .post(ensureAdminRole, upload.single('image'), productsController.createProduct);
productsRouter.route('/statistics')
    .get(ensureAdminRole, productsController.getProductStatistics);

categoryProductsRouter.route('/')
    .get(productsController.findAllByCategoryId);

module.exports = {
    productsRouter,
    categoryProductsRouter
};
