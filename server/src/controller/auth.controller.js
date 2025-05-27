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
        console.error('Error in authController.login:', err);
        return next(err);
    }
};

const register = async (req, res, next) => {
    try {
        console.log('Received registration request:', req.body);
        const { email, password, role, name, surname, phone } = req.body;
        console.log('Received registration request for email:', email);

        const existingUser = await usersService.findByEmail(email);
        if (existingUser) {
            console.log('Registration failed: Email already exists');
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const newUser = await usersService.create({
            email,
            password: hashedPassword,
            role: role || 'USER', // Default role to USER
            name,
            surname,
            phone
        });
        console.log('User and person created successfully:', newUser);

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
        console.log('Generated token for new user');

        return res.status(201).json({
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
            access_token: token,
            message: 'User registered successfully'
        });

    } catch (err) {
        console.error('Error in authController.register:', err);
        return next(err);
    }
};

module.exports = {
    login,
    register
};
