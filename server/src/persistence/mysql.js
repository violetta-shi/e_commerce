const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 3),
}).promise();

const transactional = async (callback) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await callback(connection);
        await connection.commit();
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        await connection.release();
    }
}

module.exports = {
    pool,
    transactional
};
