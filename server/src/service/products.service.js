const { pool, transactional} = require('../persistence/mysql');
const { v4: uuidv4 } = require('uuid');

const findAllByCategoryId = async (categoryId) => {
    const [products, ] = await pool.query(`
        SELECT 
            p.id, 
            p.grouping_key, 
            p.category_id,
            p.supplier_id,
            p.name, 
            p.image_url, 
            p.size, 
            p.price, 
            p.weight,
            s.company_name as supplier_name
        FROM product p
        LEFT JOIN supplier s ON p.supplier_id = s.supplier_id
        WHERE p.category_id = ?`, [categoryId]);
    return products;
};

const findAll = async () => {
    const [products, ] = await pool.query(`
        SELECT 
            p.id, 
            p.grouping_key, 
            p.category_id,
            p.supplier_id,
            p.name, 
            p.image_url, 
            p.size, 
            p.price, 
            p.weight,
            s.company_name as supplier_name
        FROM product p
        LEFT JOIN supplier s ON p.supplier_id = s.supplier_id`);
    return products;
};

const findById = async (productId) => {
    const [products, ] = await pool.query(`
        SELECT 
            p.id, 
            p.grouping_key, 
            p.category_id,
            p.supplier_id,
            p.name, 
            p.image_url, 
            p.size, 
            p.price, 
            p.weight,
            s.company_name as supplier_name
        FROM product p
        LEFT JOIN supplier s ON p.supplier_id = s.supplier_id
        WHERE p.id = ?`, [productId]);
    return products[0]; // Return the first product found (or undefined)
};

const updateProduct = async (productId, productData) => transactional(async (connection) => {
    // Assuming productData contains the fields to update (name, price, etc.)
    console.log('Backend received update request for product ID:', productId);
    console.log('Backend received product data:', productData);
    const { category_id, supplier_id, name, image_url, size, price, weight } = productData; // Only extract fields used in the UPDATE query
    try {
        const [result] = await connection.execute(
            `UPDATE product SET
                category_id = ?,
                supplier_id = ?,
                name = ?,
                image_url = ?,
                size = ?,
                price = ?,
                weight = ?
             WHERE id = ?`,
            [category_id, supplier_id, name, image_url, size, price, weight, productId] // Provide only the values corresponding to the placeholders
        );
        console.log('Database update result:', result);
    } catch (error) {
        console.error('Error during database update:', error);
        throw error; // Re-throw the error to potentially be caught by the transactional wrapper
    }
});

const deleteProduct = async (productId) => transactional(async (connection) => {
    await connection.execute(`DELETE FROM product WHERE id = ?`, [productId]);
});

const getProductStatistics = async (start, end) => {
    const [orderCountStatistic, ] = await pool.query(`
        SELECT DATE_FORMAT(o.created_at, '%Y-%m') AS date, COUNT(*) AS count
        FROM \`order\` o
        WHERE o.created_at >= ? AND o.created_at < ?
        GROUP BY DATE_FORMAT(o.created_at, '%Y-%m')
        ORDER BY date`, [start, end]);
    const [revenueStatistic, ] = await pool.query(`
        SELECT DATE_FORMAT(o.created_at, '%Y-%m') AS date, SUM(o.total_price) AS revenue
        FROM \`order\` o
        WHERE o.created_at >= ? AND o.created_at < ?
        GROUP BY DATE_FORMAT(o.created_at, '%Y-%m')
        ORDER BY date`, [start, end]);
    const [topProductStatistic, ] = await pool.query(`
        SELECT p.name AS name, COUNT(*) AS count
        FROM order_item oi
                 INNER JOIN product p on oi.product_id = p.id
        GROUP BY oi.product_id
        ORDER BY count DESC, oi.product_id DESC
        LIMIT 10`);
    const [paymentMethodStatistic, ] = await pool.query(`
        SELECT o.payment_method AS payment_method, COUNT(*) AS count
        FROM \`order\` o
        WHERE o.created_at >= ? AND o.created_at < ?
        GROUP BY o.payment_method`, [start, end]);
    return {
        orderCountStatistic,
        revenueStatistic,
        topProductStatistic,
        paymentMethodStatistic,
    }
};

const createProduct = async (product) => transactional(async (connection) => {
    const grouping_key = uuidv4();
    const args = product.variants.map(({ 
        size, price, weight, color, material, power, 
        warranty_months, energy_class, dimensions 
    }) => [
        grouping_key, 
        product.category_id, 
        product.name, 
        product.image_url, 
        size, 
        price, 
        weight,
        color,
        material,
        power,
        warranty_months,
        energy_class,
        dimensions
    ]);
    await connection.query(
        `INSERT INTO product (
            grouping_key, category_id, name, image_url, size, price, weight,
            color, material, power, warranty_months, energy_class, dimensions
        ) VALUES ?`,
        [args]
    );
});

module.exports = {
    findAllByCategoryId,
    findAll,
    findById,
    updateProduct,
    deleteProduct,
    getProductStatistics,
    createProduct,
};
