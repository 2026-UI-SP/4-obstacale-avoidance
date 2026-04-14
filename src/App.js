import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import Game from "./Game";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage";
import ExitScreen from "./ExitScreen";

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [participantCode, setParticipantCode] = useState(null);

    return (
        <HashRouter basename="/4-obstacale-avoidance">
            <Routes>
                <Route
                    path="/"
                    element={<LoginScreen setParticipantCode={setParticipantCode} />}
                />
                <Route
                    path="/welcome"
                    element={
                        participantCode
                            ? <WelcomeScreen setGameStarted={setGameStarted} />
                            : <Navigate to="/" replace />
                    }
                />
                <Route
                    path="/game"
                    element={
                        gameStarted
                            ? <Game participantCode={participantCode} />
                            : <Navigate to="/" replace />
                    }
                />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/exit" element={<ExitScreen />} />
            </Routes>
        </HashRouter>
    );
}

export default App;