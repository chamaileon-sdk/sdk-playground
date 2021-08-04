export default {
	state: () => ({
		settings: {
			vmlBackground: {
				displayText: "VML background for Outlook",
				value: true,
			},
			rolePresentation: {
				displayText: "Layout table presentation role",
				value: false,
			},
			encodeUrls: {
				displayText: "Encode URLs",
				value: true,
			},
			buttonType: {
				displayText: "Minimal buttons",
				value: false,
			},
			forceHexaColors: {
				displayText: "Hexadecimal color codes",
				value: true,
			},
			lineLength: {
				displayText: "Maximum length of lines",
				value: 799,
			},
			templatingLanguage: {
				displayText: "Templating language",
				value: "handlebars",
			},
		},
	}),
	mutations: {
		updateHtmlGeneratorSettings(state, payload) {
			state.settings[payload.key].value = payload.value;
		},

		updateInt(state, payload) {
			let x = parseInt(payload.value);

			state.settings[payload.key].value = x >= 0 ? x : 0;
		},
	},
	actions: {},
	getters: {
		getHtmlGeneratorSettings(state) {
			return state.settings;
		},

		getHtmlGeneratorConfigObject(state) {
			let cnfg = {};

			for (const key in state.settings) {
				if (key === "buttonType") {
					cnfg[key] = state.settings[key].value ? "minimal" : "classic";
				} else {
					cnfg[key] = state.settings[key].value;
				}
			}

			return cnfg;
		},
	},
};
