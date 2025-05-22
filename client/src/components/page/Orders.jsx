import React, { useState, useEffect } from 'react';
import MainContainer from '../util/MainContainer';

const TransactionTable = () => {
    const [orders, setOrders] = useState([]); // State to hold fetched orders
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state

    // States for date filters
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');

    // States for new text filters
    const [filterId, setFilterId] = useState('');
    const [filterAddress, setFilterAddress] = useState('');

    // States for amount range filter
    const [filterMinAmount, setFilterMinAmount] = useState('');
    const [filterMaxAmount, setFilterMaxAmount] = useState('');

    // State for payment method dropdown filter
    const [filterPaymentMethod, setFilterPaymentMethod] = useState(''); // Changed to empty string for 'All'
    const [uniquePaymentMethods, setUniquePaymentMethods] = useState([]); // State to hold unique payment methods

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/v1/orders'); // Fetch data from the backend endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched data on frontend:', data); // Added logging
                setOrders(data); // Update the state with fetched data

                // Extract unique payment methods
                const methods = [...new Set(data.map(order => order.payment_method))].filter(Boolean); // Filter out potential null/undefined
                setUniquePaymentMethods(methods);

            } catch (error) {
                console.error('Error fetching orders:', error);
                setError(error); // Set error state
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchOrders();
    }, []); // Empty dependency array means this effect runs once on mount

    // Filtering logic including all columns
    const filteredOrders = orders.filter(order => {
        // Date filter based on delivery_timestamp
        const deliveryTimestamp = new Date(order.delivery_timestamp);
        const startDate = filterStartDate ? new Date(filterStartDate) : null;
        const endDate = filterEndDate ? new Date(filterEndDate) : null;

        const isAfterStartDate = !startDate || deliveryTimestamp >= startDate;
        // Add one day to endDate to include the entire end day
        const isBeforeEndDate = !endDate || deliveryTimestamp < new Date(endDate.getTime() + 24 * 60 * 60 * 1000);

        // Text filters (case-insensitive for strings)
        const idMatch = !filterId || order.id.toString().includes(filterId);

        // Amount range filter
        const minAmount = filterMinAmount !== '' ? parseFloat(filterMinAmount) : null;
        const maxAmount = filterMaxAmount !== '' ? parseFloat(filterMaxAmount) : null;
        const amount = parseFloat(order.total_price);

        const isAboveMinAmount = minAmount === null || (amount >= minAmount);
        const isBelowMaxAmount = maxAmount === null || (amount <= maxAmount);
        const amountMatch = isAboveMinAmount && isBelowMaxAmount;

        // Payment Method filter (dropdown)
        const paymentMethodMatch = !filterPaymentMethod || (order.payment_method === filterPaymentMethod);

        // Address filter requires reconstructing the address string
        const fullAddress = `${order.city || ''}, ${order.street || ''}, ${order.building || ''}` +
                            `${order.housing ? ', корп. ' + order.housing : ''}` +
                            `${order.flat ? ', кв. ' + order.flat : ''}` +
                            `${order.entrance ? ', под. ' + order.entrance : ''}` +
                            `${order.code ? ', код ' + order.code : ''}` +
                            `${order.floor ? ', эт. ' + order.floor : ''}`;
        const addressMatch = !filterAddress || fullAddress.toLowerCase().includes(filterAddress.toLowerCase());

        // Combine all filter conditions
        return isAfterStartDate && isBeforeEndDate && idMatch && amountMatch && paymentMethodMatch && addressMatch;
    });

    if (loading) {
        return <MainContainer><div>Loading orders...</div></MainContainer>;
    }

    if (error) {
        return <MainContainer><div>Error loading orders: {error.message}</div></MainContainer>;
    }

    return (
        <MainContainer>
        <div className="container mt-5">
            <h2>Данные заказов</h2>

            {/* Filter input fields for all columns */}
            <div className="mb-4">
                <h4>Фильтры</h4>
                <div className="row">
                    {/* Date filters (already exist) */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="startDateFilter" className="form-label">Дата доставки (от):</label>
                        <input
                            type="date"
                            id="startDateFilter"
                            value={filterStartDate}
                            onChange={(e) => setFilterStartDate(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="endDateFilter" className="form-label">Дата доставки (до):</label>
                        <input
                            type="date"
                            id="endDateFilter"
                            value={filterEndDate}
                            onChange={(e) => setFilterEndDate(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    {/* New text filters */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="idFilter" className="form-label">ID клиента:</label>
                        <input
                            type="text"
                            id="idFilter"
                            value={filterId}
                            onChange={(e) => setFilterId(e.target.value)}
                            className="form-control"
                            placeholder="Введите ID клиента"
                        />
                    </div>
                     {/* Amount range filters */}
                    <div className="col-md-3 mb-3">
                        <label htmlFor="minAmountFilter" className="form-label">Сумма (от):</label>
                        <input
                            type="number"
                            id="minAmountFilter"
                            value={filterMinAmount}
                            onChange={(e) => setFilterMinAmount(e.target.value)}
                            className="form-control"
                            placeholder="Мин. сумма"
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="maxAmountFilter" className="form-label">Сумма (до):</label>
                        <input
                            type="number"
                            id="maxAmountFilter"
                            value={filterMaxAmount}
                            onChange={(e) => setFilterMaxAmount(e.target.value)}
                            className="form-control"
                            placeholder="Макс. сумма"
                        />
                    </div>
                    {/* Payment Method dropdown filter */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="paymentMethodFilter" className="form-label">Способ оплаты:</label>
                        <select
                            id="paymentMethodFilter"
                            value={filterPaymentMethod}
                            onChange={(e) => setFilterPaymentMethod(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Все</option> {/* Option to show all */}
                            {uniquePaymentMethods.map(method => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="addressFilter" className="form-label">Полный адрес:</label>
                        <input
                            type="text"
                            id="addressFilter"
                            value={filterAddress}
                            onChange={(e) => setFilterAddress(e.target.value)}
                            className="form-control"
                            placeholder="Введите часть адреса"
                        />
                    </div>
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
                        <th>Способ оплаты</th>
                        <th>Полный адрес</th>
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
                                <td>{order.id}</td>
                                <td>{new Date(order.delivery_timestamp).toLocaleDateString()}</td>
                                <td>{new Date(order.delivery_timestamp).toLocaleDateString()}</td>
                                <td>{order.total_price} руб.</td>
                                <td>{order.payment_method}</td>
                                <td>
                                    {`${order.city || ''}, ${order.street || ''}, ${order.building || ''}`}
                                    {order.housing ? `, корп. ${order.housing}` : ''}
                                    {order.flat ? `, кв. ${order.flat}` : ''}
                                    {order.entrance ? `, под. ${order.entrance}` : ''}
                                    {order.code ? `, код ${order.code}` : ''}
                                    {order.floor ? `, эт. ${order.floor}` : ''}
                                </td>
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
