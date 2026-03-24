import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginScreen({ setParticipantCode }) {
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    const handleSubmit = () => {
        if (code.trim() === "") return; // prevent empty submission
        setParticipantCode(code.trim());
        navigate("/welcome");
    };

    return (
        <div className="App">
            <div className="welcome-container">
                <h1 className="game-title">Object Avoidance</h1>
                <div className="description-box">
                    <h3>Participant Login</h3>
                    <p>Please enter the participation code you received in your email.</p>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        placeholder="Enter your code"
                        className="code-input"
                    />
                </div>
                <button className="start-button" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default LoginScreen;