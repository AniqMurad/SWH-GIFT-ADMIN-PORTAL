import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = () => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const fetchMessages = async () => {
        try {
            const response = await axios.get("https://swhmaah.vercel.app/api/admin/messages");
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

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

            <h2 className="my-4">Contact Messages</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <tr key={msg._id}>
                                <td>{msg.name}</td>
                                <td>{msg.email}</td>
                                <td>{msg.message}</td>
                                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No messages found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Messages;