import dummyDoc from "./dummyDocument";

export default {
	state: () => ({
		fetchingHTML: false,
		html: "",
		dummyHtml: "",
		htmlSize: "0B",
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
		toggleFetching(state) {
			state.fetchingHTML = !state.fetchingHTML;
		},

		updateHtmlGeneratorSettings(state, payload) {
			state.settings[payload.key].value = payload.value;
		},

		updateInt(state, payload) {
			let x = parseInt(payload.value);

			state.settings[payload.key].value = x >= 0 ? x : 0;
		},

		updateHtml(state, html) {
			state.html = html;
		},

		updateDummyHtml(state, dummyHtml) {
			state.dummyHtml = dummyHtml;
		},

		updateSize(state, size) {
			let s = size;

			if (size > 1024) s = (size / 1024).toFixed(2) + "kB";
			else s += "B";

			state.htmlSize = s;
		},
	},
	actions: {
		async fetchDummyHtml(context) {
			const genRequest = await fetch(
				"https://sdk-api.chamaileon.io/api/v1/emails/generate",
				{
					method: "POST",
					headers: {
						Authorization: "Y8mbu7S5Qh4cyCqJCVBn",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						document: dummyDoc,
						settings: context.getters.getHtmlGeneratorConfigObject,
					}),
				}
			);

			if (!genRequest.ok) {
				throw new Error("Auth error");
			}

			const response = await genRequest.json();

			context.commit("updateDummyHtml", response.result);
		},

		async fetchHtml(context) {
			context.commit("toggleFetching");

			const genRequest = await fetch(
				"https://sdk-api.chamaileon.io/api/v1/emails/generate",
				{
					method: "POST",
					headers: {
						Authorization: "Y8mbu7S5Qh4cyCqJCVBn",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						document: context.rootState.document,
						settings: context.getters.getHtmlGeneratorConfigObject,
					}),
				}
			);

			if (!genRequest.ok) {
				throw new Error("Auth error");
			}

			const response = await genRequest.json();

			const size = genRequest.headers.get("content-length");
			context.commit("updateSize", size);

			context.commit("updateHtml", response.result);
			context.commit("toggleFetching");
		},
	},
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

		getHtmlDocument: (state) => state.html,

		getDummyHtmlDocument: (state) => state.dummyHtml,

		getHTMLFetchStatus(state) {
			return state.fetchingHTML;
		},

		getSize: (state) => state.htmlSize,
	},
};