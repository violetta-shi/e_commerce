const usersService = require('../service/users.service');
const bcrypt = require('bcryptjs');
const { ROLE_USER } = require('../model/roles');
const { validateCreateUser } = require('../service/validator/users.validator')

const findAll = async (req, res, next) => {
    try {
        res.json(await usersService.findAll());
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const self = async (req, res) => {
    return res.json(req.authentication.user)
};

const create = async (req, res, next) => {
    try {
        const user = req.body;
        const errors = validateCreateUser(user);
        if (errors) {
            return res.status(400).json(errors);
        }
        await usersService.create({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            role: ROLE_USER
        });
        res.status(201).end();
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({message: 'Email already in use'});
        }
        console.error(err);
        next(err);
    }
}

module.exports = {
    findAll,
    self,
    create,
};
