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
		const handleOnTrialEnd = (trialNum, condition, obstacle, collision, completion_time) => {
			//alert(`DEBUG: Trial Ended - Trial Number: ${trialNum}, Condition: ${condition}, Obstacle: ${obstacle}, Collision: ${collision}, Completion Time: ${completion_time}`);
		};
		const TrialsFinished = () => {
			//alert("DEBUG: TRIALS FINISHED");
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


	const LEFT_TRIAL_AMT = 1;
	const RIGHT_TRIAL_AMT = 1;
	const CONTROL_TRIAL_AMT = 1;
	const TRIAL_PATTERN = "LCRCLR";

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