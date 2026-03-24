import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import Game from "./Game";

function App() {

    const [gameStarted, setGameStarted] = useState(false);

    return (
        <BrowserRouter basename="/4-obstacale-avoidance">
            <Routes>
                <Route
                    path="/"
                    element={<WelcomeScreen setGameStarted={setGameStarted} />}
                />
                <Route
                    path="/game"
                    element={
                        gameStarted ? <Game /> : <Navigate to="/" replace />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;