require('dotenv').config(); //prepare env as early as possible

const path = require('path');
const express = require('express');
const bearerToken = require('express-bearer-token');

const authMiddleware = require('./src/middleware/authentication.middleware');

const users = require('./src/route/users.route');
const categories = require('./src/route/categories.route');
const products = require('./src/route/products.route');
const orders = require('./src/route/orders.route');
const auth = require('./src/route/auth.route');

const app = express();

// config
app.use(express.json());
app.use(bearerToken());
app.use(authMiddleware.authenticate);

// static content
app.use('/static', express.static(path.join(__dirname, 'public')));
// routes
app.use('/api/v1/users', users);
app.use('/api/v1/categories', categories);
app.use('/api/v1/categories/:categoryId/products', products.categoryProductsRouter);
app.use('/api/v1/products', products.productsRouter);
app.use('/api/v1/orders', orders);
app.use('/api/v1/auth', auth);

//TODO middleware test, remove it
app.get('/api/admin', authMiddleware.ensureAdminRole, (req, res) => {
    res.json({message: 'You admin'});
});
app.get('/api/user', authMiddleware.ensureUserRole, (req, res) => {
    res.json({message: 'You just user'});
});
app.get('/api/any', authMiddleware.ensureAuthenticated, (req, res) => {
    res.json({message: 'You authenticated'});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on ${port} port...`);
});
