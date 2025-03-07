import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onLogin }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminId = "Aniq"; 
    const adminPass = "AMNfina510*"; 

    if (id === adminId && password === adminPass) {
      localStorage.setItem("isAdmin", "true");
      onLogin();
      navigate("/");
    } else {
      alert("Invalid ID or Password");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Admin Login</h2>
      <input type="text" placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)} />
      <br />
      <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
