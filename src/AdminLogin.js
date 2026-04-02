import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = "your-chosen-password-here";

function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem("adminAuthed", "true");
            navigate("/admin");
        } else {
            setError("Incorrect password.");
        }
    };

    return (
        <div className="App">
            <div className="welcome-container">
                <h1 className="game-title">Admin Access</h1>
                <div className="description-box">
                    <p>Enter the admin password to access participant data.</p>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        className="code-input"
                    />
                    {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                </div>
                <button className="start-button" onClick={handleLogin}>
                    Enter
                </button>
            </div>
        </div>
    );
}

export default AdminLogin;