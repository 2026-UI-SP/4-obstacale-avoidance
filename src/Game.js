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
		const handleOnTrialEnd = (isWin) => {
			if (isWin) {
				alert("DEBUG: SAFE");
			} else {
				alert("DEBUG: COLLISION");
			}
		};

		// Attach the listener
		addEventListener("OnTrialEnd", handleOnTrialEnd);

		// Clean up when the user leaves the Game page
		return () => {
			removeEventListener("OnTrialEnd", handleOnTrialEnd);
		};
	}, [addEventListener, removeEventListener]);


	const LEFT_TRIAL_AMT = 3;
	const RIGHT_TRIAL_AMT = 2;
	const CONTROL_TRIAL_AMT = 4;
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