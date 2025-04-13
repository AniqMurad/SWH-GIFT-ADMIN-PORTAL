import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState('');

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/admin/get-order');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const deleteOrder = async (id) => {
        console.log("Deleting order with ID:", id);

        try {
            await axios.delete(`http://localhost:5001/api/admin/delete/${id}`);
            fetchOrders(); // Refresh orders after deletion
            setMessage('Order Deleted successfully!');
        } catch (error) {
            setMessage('Order Not Deleted!');
            console.error("Error deleting order:", error.response ? error.response.data : error);
        }
    };

    return (
        <div className='container'>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1050 }}>
                {message && (
                    <div
                        className="mt-3 alert alert-info"
                        style={{
                            position: 'fixed',
                            top: '10px',
                            right: '10px',
                            zIndex: 1050,
                            width: 'auto',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        {message}
                    </div>
                )}
            </div>

            <h2 className="my-4">Your Orders</h2>
            {orders.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Username</th>
                            <th>Checkout Info</th>
                            <th>Cart Items</th>
                            <th>Total Price</th>
                            <th>Order Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const totalPrice = order.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user ? order.user.name : 'Guest'}</td>
                                    <td>
                                        <p><strong>Name:</strong> {order.checkoutInfo.name}</p>
                                        <p><strong>Email:</strong> {order.checkoutInfo.email}</p>
                                        <p><strong>Contact:</strong> {order.checkoutInfo.contactNumber}</p>
                                        <p><strong>Address:</strong> {order.checkoutInfo.address}, {order.checkoutInfo.city}, {order.checkoutInfo.country}</p>
                                    </td>
                                    <td>
                                        {order.cartItems.map((item, index) => (
                                            <div key={index}>
                                                <p><strong>Product:</strong> {item.name}</p>
                                                <p><strong>Size:</strong> {item.size}</p>
                                                <p><strong>Color:</strong> {item.color.colorName}</p>
                                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                                <p><strong>Price:</strong> Rs {item.price}</p>
                                            </div>
                                        ))}
                                    </td>
                                    <td>Rs {totalPrice}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteOrder(order._id)}>Delete Order</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No orders available.</p>
            )}
        </div>
    );
};

export default Orders;
