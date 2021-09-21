export default {
	state: () => ({
		apiBackend: "https://sdk-demo-api.chamaileon.io/getAuthToken",
		apiKey: "",
		chamaileonSdk: "https://plugins.chamaileon.io/static/chamaileonSdk.js",
		environmentName: "sdk-playground-prod",
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
	}),
	mutations: {
		updateSDKConfig(state, payload) {
			for (const key in payload) state[key] = payload[key];
		},
	},
	actions: {},
	getters: {},
};
