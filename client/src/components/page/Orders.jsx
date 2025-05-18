import React, { useState } from 'react';
import MainContainer from '../util/MainContainer';

const TransactionTable = () => {
    // Данные транзакции
    const orders = [
        {
            orderDate: '2024-12-17 01:33:00',
            deliveryDate: '2024-12-19 01:32:00',
            amount: 3590.00,
            products: ['Холодильник LG', 'Микроволновка Samsung'],
            clientId: 12,
            city: 'Минск',
        },
        {
            orderDate: '2024-12-18 10:15:00',
            deliveryDate: '2024-12-20 11:00:00',
            amount: 2500.00,
            products: ['Телевизор Sony', 'Смартфон Xiaomi'],
            clientId: 15,
            city: 'Гомель',
        },
        {
            orderDate: '2024-12-19 14:05:00',
            deliveryDate: '2024-12-21 16:30:00',
            amount: 1800.00,
            products: ['Ноутбук HP', 'Клавиатура Logitech'],
            clientId: 12,
            city: 'Минск',
        },
        // Добавьте больше данных по мере необходимости
    ];

    // Состояния для фильтров: по дате заказа и по ID клиента
    const [filterDate, setFilterDate] = useState('');
    const [filterClientId, setFilterClientId] = useState('');

    // Фильтрация заказов по дате и ID клиента
    const filteredOrders = orders.filter(order =>
        order.orderDate.includes(filterDate) &&
        (order.clientId.toString().includes(filterClientId) || filterClientId === '')
    );
    return (
        <MainContainer>
        <div className="container mt-5">
            <h2>Данные заказов</h2>

            {/* Фильтры по дате заказа и по ID клиента */}
            <div className="mb-4 d-flex justify-content-between">
                <div className="w-45">
                    <label htmlFor="orderDateFilter">Поиск по дате заказа:</label>
                    <input
                        type="date"
                        id="orderDateFilter"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="w-45">
                    <label htmlFor="clientIdFilter">Поиск по ID клиента:</label>
                    <input
                        type="number"
                        id="clientIdFilter"
                        value={filterClientId}
                        onChange={(e) => setFilterClientId(e.target.value)}
                        className="form-control"
                        placeholder="Введите ID клиента"
                    />
                </div>
            </div>

            {/* Таблица заказов */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID клиента</th>
                        <th>Дата заказа</th>
                        <th>Дата доставки</th>
                        <th>Сумма</th>
                        <th>Товары</th>
                        <th>Город доставки</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length === 0 ? (
                        <tr>
                            <td colSpan="6">Нет заказов, соответствующих фильтру.</td>
                        </tr>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.clientId}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.deliveryDate}</td>
                                <td>{order.amount} руб.</td>
                                <td>{order.products.join(', ')}</td>
                                <td>{order.city}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </MainContainer>
    );
}

export default TransactionTable;
