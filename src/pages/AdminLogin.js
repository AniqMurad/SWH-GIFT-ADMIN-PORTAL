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
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light"
            style={{
                background: `url('/12.jpeg') no-repeat center center/cover`,
            }}>
            <div className="card shadow p-4" style={{ width: "350px", borderRadius: "12px" }}>
                <h2 className="text-center mb-4 text-primary">Admin Login</h2>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default AdminLogin;
