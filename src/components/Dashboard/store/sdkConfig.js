const getDefaultState = () => {
	return {
		apiBackend: "https://sdk-demo-api.chamaileon.io/getAuthToken",
		apiKey: "",
		chamaileonSdk: "https://plugins.chamaileon.io/static/chamaileonSdk.js",
		environmentName: location.host === "sdk-playground.chamaileon.io" ? "sdk-playground-prod" : "sdk-playground-staging",
		locale: "en",
		urls: {
			splashScreen:
				"https://plugins.chamaileon.io/mega-spa/3.2.2/splashScreen.html",
			createLogoJS:
				"https://plugins.chamaileon.io/mega-spa/3.2.2/createLogoWithText.js",
		},
		colors: {
			primary: "#000000",
			secondary: "#000000",
		},
	}
}

export default {
	state: getDefaultState(),
	mutations: {
		updateSDKConfig(state, payload) {
			for (const key in payload) state[key] = payload[key];
		},
		resetSdkConfigState(state) {
			Object.assign(state, getDefaultState());
		}
	},
	actions: {},
	getters: {},
};
