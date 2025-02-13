// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductForm = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState('');
//   const [category, setCategory] = useState('');
//   const [gender, setGender] = useState('Male');
//   const [description, setDescription] = useState('');
//   const [message, setMessage] = useState('');
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]); // State to store orders
//   const [users, setUsers] = useState([]);
//   const [messages, setMessages] = useState([]);

//   // Fetch products when the component loads
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('https://swhmaah.vercel.app/api/user/products');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   // Fetch orders when the component loads
//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get('https://swhmaah.vercel.app/api/admin/get-order');
//       setOrders(response.data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('https://swhmaah.vercel.app/api/admin/get-users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get("https://swhmaah.vercel.app/api/admin/messages");
//       setMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchOrders();
//     fetchUsers();
//     fetchMessages();
//   }, []);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => {
//         setMessage('');
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !price || !image || !category || !description) {
//       setMessage('Please fill in all fields.');
//       return;
//     }

//     const productData = { name, price, image, category, gender, description };

//     try {
//       await axios.post('https://swhmaah.vercel.app/api/admin/add', productData);
//       setMessage('Product added successfully!');

//       setName('');
//       setPrice('');
//       setImage('');
//       setCategory('');
//       setGender('Male');
//       setDescription('');

//       fetchProducts();
//     } catch (error) {
//       console.error('Error adding product:', error.response);
//       setMessage('Error adding product. Please try again.');
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`https://swhmaah.vercel.app/api/admin/delete/${id}`);
//       fetchProducts();
//       setMessage('Product Deleted successfully!');
//     } catch (error) {
//       setMessage('Product Not Deleted!');
//       console.error(error);
//     }
//   };

//   const deleteOrder = async (id) => {
//     console.log("Deleting order with ID:", id); // Debugging

//     try {
//       await axios.delete(`https://swhmaah.vercel.app/api/admin/delete/${id}`);
//       fetchOrders(); // Refresh the orders after deletion
//       setMessage('Order Deleted successfully!');
//     } catch (error) {
//       setMessage('Order Not Deleted!');
//       console.error("Error deleting order:", error.response ? error.response.data : error);
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`https://swhmaah.vercel.app/api/admin/delete/${id}`);
//       fetchUsers();
//       setMessage('User deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       setMessage('User not deleted!');
//     }
//   };

//   return (
//     <div className="container">
//       {/* Success/Error Message */}
//       <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1050 }}>
//         {message && (
//           <div
//             className="mt-3 alert alert-info"
//             style={{
//               position: 'fixed',
//               top: '10px',
//               right: '10px',
//               zIndex: 1050,
//               width: 'auto',
//               padding: '10px',
//               borderRadius: '5px',
//             }}
//           >
//             {message}
//           </div>
//         )}
//       </div>

//       <h2 className="my-4">Post Product</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group mb-3">
//           <label htmlFor="name">Product Name</label>
//           <input type="text" className="form-control" id="name" placeholder="Enter product name" value={name} onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="price">Price</label>
//           <input type="number" className="form-control" id="price" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="image">Image URL</label>
//           <input type="text" className="form-control" id="image" placeholder="Enter image URL" value={image} onChange={(e) => setImage(e.target.value)} />
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="category">Category</label>
//           <input type="text" className="form-control" id="category" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} />
//         </div>
//         <div className="form-group mb-3">
//           <label>Gender</label>
//           <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>
//         <div className="form-group mb-3">
//           <label htmlFor="description">Description</label>
//           <textarea className="form-control" id="description" placeholder="Enter product description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3"></textarea>
//         </div>
//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>

//       <h2 className="my-4">Current Products</h2>
//       <div className="row">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product._id} className="col-md-4 mb-4">
//               <div className="card">
//                 <img src={product.image} alt={product.name} className="card-img-top" />
//                 <div className="card-body">
//                   <h5 className="card-title">{product.name}</h5>
//                   <p className="card-text">Price: Rs {product.price}</p>
//                   <p className="card-text"><strong>Category:</strong> {product.category}</p>
//                   <p className="card-text"><strong>Description:</strong> {product.description}</p>
//                   <button className="btn btn-danger" onClick={() => deleteProduct(product._id)}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No products available.</p>
//         )}
//       </div>

//       <h2 className="my-4">Your Orders</h2>
//       <div className="row">
//         {orders.length > 0 ? (
//           orders.map((order) => {
//             const totalPrice = order.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//             return (
//               <div key={order._id} className="col-md-4 mb-4">
//                 <div className="card">
//                   <div className="card-body">
//                     <h5 className="card-title">Order ID: {order._id}</h5>
//                     <p className="card-text"><strong>Name:</strong> {order.checkoutInfo.name}</p>
//                     <p className="card-text"><strong>Contact Number:</strong> {order.checkoutInfo.contactNumber}</p>
//                     <p className="card-text"><strong>Address:</strong> {order.checkoutInfo.address}, {order.checkoutInfo.city}, {order.checkoutInfo.country}</p>
//                     <p className="card-text"><strong>Order Status:</strong> {order.status}</p>

//                     <h6>Cart Items:</h6>
//                     {order.cartItems.map((item, index) => (
//                       <div key={index}>
//                         <p><strong>Product:</strong> {item.name}</p>
//                         <p><strong>Quantity:</strong> {item.quantity}</p>
//                         <p><strong>Price:</strong> Rs {item.price}</p>
//                       </div>
//                     ))}

//                     <p><strong>Total Price: </strong>Rs {totalPrice}</p>
//                     <button className="btn btn-danger" onClick={() => deleteOrder(order._id)}>Delete Order</button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p>No orders available.</p>
//         )}
//       </div>

//       <h2 className="my-4">Users List</h2>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">No users found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <h2 className="my-4">Contact Messages</h2>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Message</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {messages.length > 0 ? (
//             messages.map((msg) => (
//               <tr key={msg._id}>
//                 <td>{msg.name}</td>
//                 <td>{msg.email}</td>
//                 <td>{msg.message}</td>
//                 <td>{new Date(msg.createdAt).toLocaleString()}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No messages found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//     </div>
//   );
// };

// export default ProductForm;
