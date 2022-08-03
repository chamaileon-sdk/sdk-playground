const getDefaultState = () => {
	return {
		environmentName: location.host !== "sdk-playground-staging.chamaileon.io"
			? "sdk-playground-prod"
			: "sdk-playground-staging",
		locale: "en",
		apiKey: "sdkApiKeyThatWasGeneratedWithTheAutomatedScript",
		apiBackend: "https://sdk-demo-api.chamaileon.io/getAuthToken",
		urls: {
			splashScreen:
				"https://cdn.chamaileon.io/assets/splashScreen.html",
			createLogoJS:
				"https://cdn.chamaileon.io/assets/createLogoWithText.js",
		},
		colors: {
			primary: "#00bee6",
			secondary: "#9b9b9b",
			error: "#FF5252",
			info: "#2196F3",
			success: "#4CAF50",
			warning: "#FFC107",
		},
		font: {
			url: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700",
			family: "'Roboto', sans-serif",
		},
	};
};

export default {
	state: getDefaultState(),
	mutations: {
		UPDATE_SDK_CONFIG(state, payload) {
			for (const key in payload) state[key] = payload[key];
		},
		resetSdkConfigState(state) {
			Object.assign(state, getDefaultState());
		},
	},
	actions: {
		updateSdkConfig({ commit, dispatch }, payload) {
			commit("UPDATE_SDK_CONFIG", payload);
			dispatch("updateSDK");
		},
	},
	getters: {},
};
