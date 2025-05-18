const usersService = require('../service/users.service');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await usersService.findByEmail(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, { expiresIn: '2h'});
            return res.status(200).json({
                id: user.id,
                email: user.email,
                role: user.role,
                access_token: token
            });
        }
        return res.status(401).json({
            message: 'Email or password is not valid'
        });
    } catch (err) {
        console.error(err);
        return next(err);
    }
};

module.exports = {
    login
};
