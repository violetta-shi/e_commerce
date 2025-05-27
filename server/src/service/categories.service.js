const { pool, transactional } = require('../persistence/mysql');


const findAll = async () => {
    const [categories, ] = await pool.query(`
        SELECT id, name, image_url, COALESCE(p_count.product_count, 0) AS product_count
        FROM category c
        LEFT OUTER JOIN (SELECT category_id, COUNT(DISTINCT grouping_key) AS product_count
                         FROM product 
                         GROUP BY category_id) AS p_count ON c.id = p_count.category_id 
        `);
    return categories;
};

const createCategory = async (category) => transactional(async (connection) => {
    await connection.execute(
        `INSERT INTO category (name, image_url) VALUES (?,?)`,
        [category.name, category.image_url]
    );
});

const updateCategory = async (id, category) => transactional(async (connection) => {
    // Only update fields that are provided
    const fields = [];
    const values = [];
    if (category.name !== undefined) {
        fields.push('name = ?');
        values.push(category.name);
    }
    if (category.image_url !== undefined) {
        fields.push('image_url = ?');
        values.push(category.image_url);
    }
    if (fields.length === 0) return; // nothing to update
    values.push(id);
    await connection.execute(
        `UPDATE category SET ${fields.join(', ')} WHERE id = ?`,
        values
    );
});

const deleteCategory = async (id) => transactional(async (connection) => {
    await connection.execute(
        `DELETE FROM category WHERE id = ?`,
        [id]
    );
});

module.exports = {
    findAll,
    createCategory,
    updateCategory,
    deleteCategory
};
