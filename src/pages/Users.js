import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://swhmaah.vercel.app/api/admin/get-users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`https://swhmaah.vercel.app/api/admin/delete/${id}`);
            fetchUsers();
            setMessage('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user:', error);
            setMessage('User not deleted!');
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

            <h2 className="my-4">Users List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Users;