const { pool } = require('../persistence/mysql');

const create = async (person) => {
    const { name, lastName, phone } = person;
    console.log('Attempting to create person with data:', { name, lastName, phone });
    try {
        const [result] = await pool.query(
            'INSERT INTO person(name, lastName, phone) VALUES(?, ?, ?)',
            [name, lastName, phone]
        );
        console.log('Person created successfully, insertId:', result.insertId);
        return result.insertId;
    } catch (error) {
        console.error('Error creating person:', error);
        throw error;
    }
};

module.exports = {
    create,
}; 