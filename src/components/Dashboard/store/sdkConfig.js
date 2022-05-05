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
				"https://app.chamaileon.io/splashScreen.html",
			createLogoJS:
				"https://app.chamaileon.io/createLogoWithText.js",
		},
		colors: {
			primary: "#00bee6",
			secondary: "#9b9b9b",
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
