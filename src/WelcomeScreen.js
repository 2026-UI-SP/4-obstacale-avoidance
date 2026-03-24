import { useNavigate } from "react-router-dom";

function WelcomeScreen({ setGameStarted }) {
    const navigate = useNavigate();

    const handleStart = () => {
        setGameStarted(true);
        navigate("/game");
    };

    // WelcomeScreen.js
    return (
        <div className="App">
            <div className="welcome-container">
                <h1 className="game-title">Object Avoidance</h1>

                <div className="description-box">
                    <h3>Welcome to the Object Avoidance study!</h3>
                    <p>
                        In this activity, you will move your cursor from the Start region to the Finish region without
                        colliding with the *insert color here* barriers. Please continue playing until you reach the
                        conclusion page, at which you should follow the instructions provided to you at that time.
                    </p>
                    <p>Best of luck!</p>
                </div>

                {/* Button moved inside welcome-container */}
                <button className="start-button" onClick={handleStart}>
                    Click to Start
                </button>
            </div>
        </div>
    );
}

export default WelcomeScreen;