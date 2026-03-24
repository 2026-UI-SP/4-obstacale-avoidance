import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import Game from "./Game";

function App() {

    const [gameStarted, setGameStarted] = useState(false);
    const [participantCode, setParticipantCode] = useState(null);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;