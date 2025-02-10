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
        console.log("Deleting order with ID:", id); // Debugging

        try {
            await axios.delete(`http://localhost:5001/api/admin/delete/${id}`);
            fetchOrders(); // Refresh the orders after deletion
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
            <div className="row">
                {orders.length > 0 ? (
                    orders.map((order) => {
                        const totalPrice = order.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

                        return (
                            <div key={order._id} className="col-md-4 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Order ID: {order._id}</h5>
                                        <p className="card-text"><strong>Name:</strong> {order.checkoutInfo.name}</p>
                                        <p className="card-text"><strong>Contact Number:</strong> {order.checkoutInfo.contactNumber}</p>
                                        <p className="card-text"><strong>Address:</strong> {order.checkoutInfo.address}, {order.checkoutInfo.city}, {order.checkoutInfo.country}</p>
                                        <p className="card-text"><strong>Order Status:</strong> {order.status}</p>

                                        <h6>Cart Items:</h6>
                                        {order.cartItems.map((item, index) => (
                                            <div key={index}>
                                                <p><strong>Product:</strong> {item.name}</p>
                                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                                <p><strong>Price:</strong> Rs {item.price}</p>
                                            </div>
                                        ))}

                                        <p><strong>Total Price: </strong>Rs {totalPrice}</p>
                                        <button className="btn btn-danger" onClick={() => deleteOrder(order._id)}>Delete Order</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No orders available.</p>
                )}
            </div>
        </div>
    );
}

export default Orders;