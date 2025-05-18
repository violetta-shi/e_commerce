const jwt = require('jsonwebtoken');
const usersService = require('../service/users.service');
const { ROLE_ADMIN, ROLE_USER } = require('../model/roles');

const authenticate = async (req, res, next) => {
    try {
        const { id } = jwt.verify(req.token, process.env.JWT_SECRET_KEY);
        const user = await usersService.findById(id);
        if (user) {
            req.authentication = { user };
        }
    } catch (err) {
        /*NOP*/
    }
    return next();
};

const ensureAuth = (res, next, condition) => {
    if (condition) {
        return next();
    } else {
        return res.status(401).end();
    }
};

const ensureRole = (req, res, next, role) => {
    ensureAuth(res, next, req.authentication?.user?.role === role);
};

const ensureUserRole = (req, res, next) => ensureRole(req, res, next, ROLE_USER);

const ensureAdminRole = (req, res, next) => ensureRole(req, res, next, ROLE_ADMIN);

const ensureAuthenticated = (req, res, next) => ensureAuth(res, next, req.authentication?.user);

module.exports = {
    authenticate,
    ensureUserRole,
    ensureAdminRole,
    ensureAuthenticated,
}