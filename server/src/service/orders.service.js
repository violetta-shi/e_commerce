const { transactional, pool } = require('../persistence/mysql');

const createOrder = async (order, creatorId) => transactional(async (connection) => {
    const { city, street, building, housing, flat, entrance, code, floor } = order.address;
    const [createdAddress] = await connection.execute(`
                INSERT INTO address (city, street, building, housing, flat, entrance, code, floor)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [city, street, building, housing, flat, entrance, code, floor]);
    const addressId = createdAddress.insertId;

    const { payment_method, delivery_timestamp, name, email, phone_number, comment, total_price } = order;
    const [createdOrder] = await connection.execute(`
                INSERT INTO \`order\` (payment_method, delivery_timestamp, name, email, phone_number, comment, total_price, delivery_address_id, created_by)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [payment_method, delivery_timestamp, name, email, phone_number, comment, total_price, addressId, creatorId ?? null]);
    const orderId = createdOrder.insertId;

    const args = order.items.map(item => [orderId, item.product.id, item.amount]);
    await connection.query(`INSERT INTO order_item (order_id, product_id, amount) VALUES ?`, [args]);
});

async function getAllOrders() {
  console.log('getAllOrders function called');
  try {
    const [rows, fields] = await pool.query(
      'SELECT o.*, a.city, a.street, a.building, a.housing, a.flat, a.entrance, a.code, a.floor FROM `order` o JOIN address a ON o.delivery_address_id = a.id'
    );
    console.log('Database query result (rows):', rows);
    console.log('All orders:', rows);
    return rows; // Or process the data as needed
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Handle the error appropriately
  }
}

module.exports = {
    createOrder,
    getAllOrders,
};
