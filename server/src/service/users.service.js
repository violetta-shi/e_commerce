const { pool } = require('../persistence/mysql');
const personService = require('./person.service');

const findAll = async () => {
    const [users, ] = await pool.query('SELECT * FROM `user`');
    return users;
};

const findByEmail = async (email) => {
    console.log('Attempting to find user by email:', email);
    const [[user], ] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
    console.log('Result of findByEmail:', user);
    return user;
};

const findById = async (id) => {
    console.log('Attempting to find user by id:', id);
    const [[user], ] = await pool.query('SELECT id, email, role FROM user WHERE id = ?', [id]);
    console.log('Result of findById:', user);
    return user;
};

const create = async (userData) => {
    const { email, password, role, name, surname, phone } = userData;
    console.log('Attempting to create user and person with data:', { email, password: '[HASHED]', role, name, surname, phone });

    try {
        // Create a person record first
        const personId = await personService.create({ name, lastName: surname, phone });
        console.log('Created person with id:', personId);

        // Then create the user record with the person_id
        const [result] = await pool.query(
            'INSERT INTO user(email, password, role, person_id) VALUES(?, ?, ?, ?)',
            [email, password, role, personId]
        );
        console.log('Created user with id:', result.insertId);

        // Fetch and return the newly created user, potentially joining with person data
        const [[newUser], ] = await pool.query(
            'SELECT u.id, u.email, u.role, p.name, p.lastName as surname, p.phone FROM user u JOIN person p ON u.person_id = p.id WHERE u.id = ?',
            [result.insertId]
        );
        console.log('Fetched new user data:', newUser);

        return newUser;
    } catch (error) {
        console.error('Error in usersService.create:', error);
        throw error;
    }
};

module.exports = {
    findAll,
    findByEmail,
    findById,
    create,
};
