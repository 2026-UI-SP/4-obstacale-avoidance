import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const Game = () => {
	const {
		unityProvider,
		//isLoaded,
		addEventListener,
		removeEventListener
	} = useUnityContext({
		loaderUrl: "/4-obstacale-avoidance/UnityBuild/Build/Obstacle-Avoidance_Build.loader.js",
		dataUrl: "/4-obstacale-avoidance/UnityBuild/Build/Obstacle-Avoidance_Build.data",
		frameworkUrl: "/4-obstacale-avoidance/UnityBuild/Build/Obstacle-Avoidance_Build.framework.js",
		codeUrl: "/4-obstacale-avoidance/UnityBuild/Build/Obstacle-Avoidance_Build.wasm",
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

	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
			<Unity unityProvider={unityProvider} style={{ width: "90vw", height: "90vh" }} />
		</div>
	);
};

export default Game;