import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const Game = () => {
	const {
		unityProvider,
		isLoaded,
		addEventListener,
		removeEventListener,
		sendMessage,
	} = useUnityContext({
		loaderUrl: `${process.env.PUBLIC_URL}/UnityBuild/Build/Obstacle-Avoidance_Build.loader.js`,
		dataUrl: `${process.env.PUBLIC_URL}/UnityBuild/Build/Obstacle-Avoidance_Build.data`,
		frameworkUrl: `${process.env.PUBLIC_URL}/UnityBuild/Build/Obstacle-Avoidance_Build.framework.js`,
		codeUrl: `${process.env.PUBLIC_URL}/UnityBuild/Build/Obstacle-Avoidance_Build.wasm`,
	});

	useEffect(() => {
		// after an individual trial ends it provides the following information as parameters.
		const handleOnTrialEnd = (trialNum, condition, obstacle, collision, completion_time) => {
			
		};
		// once EVERY trial is finished, the game will trigger the following event.
		const TrialsFinished = () => {
			
		};

		// Attach the listener
		addEventListener("OnTrialEnd", handleOnTrialEnd);
		addEventListener("TrialsOver", TrialsFinished);

		// Clean up when the user leaves the Game page
		return () => {
			removeEventListener("OnTrialEnd", handleOnTrialEnd);
			removeEventListener("TrialsOver", TrialsFinished);
		};
	}, [addEventListener, removeEventListener]);

	// TUNING KNOBS - adjust these values to change the number of trials and their pattern. 
	// The pattern is a string where L = left trial, R = right trial, and C = control trial. 
	// So "LCRCLR" would be left trial, control trial, right trial, control trial, and left trial.
	// if you run out of left trials it will move to the next trial type in the pattern, 
	const LEFT_TRIAL_AMT = 1;
	const RIGHT_TRIAL_AMT = 1;
	const CONTROL_TRIAL_AMT = 1;
	const TRIAL_PATTERN = "LCRCLR";

	// pass the trial information to Unity once it's loaded so it can set up the trials accordingly.
	useEffect(() => {
		if (!isLoaded) return;
		sendMessage("GameController", "SetLeftTrialAmt", LEFT_TRIAL_AMT);
		sendMessage("GameController", "SetRightTrialAmt", RIGHT_TRIAL_AMT);
		sendMessage("GameController", "SetControlTrialAmt", CONTROL_TRIAL_AMT);
		sendMessage("GameController", "SetTrialPattern", TRIAL_PATTERN);
	}, [isLoaded, sendMessage]);

	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
			<Unity unityProvider={unityProvider} style={{ width: "90vw", height: "90vh" }} />
		</div>
	);
};

export default Game;