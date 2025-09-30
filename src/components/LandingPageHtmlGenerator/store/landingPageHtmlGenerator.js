import dummyDoc from "./landingPageDummyDocument";

const getDefaultState = () => {
	return {
		fetchingLandingPageHTML: false,
		landingPageJson: dummyDoc,
		landingPageHtml: "",
		landingPageDummyHtml: "",
		landingPageSettings: {
			encodeUrls: {
				displayText: "Encode URLs",
				value: true,
			},
			templatingLanguage: {
				displayText: "Templating language",
				value: "handlebars",
			},
			minifyCss: {
				displayText: "Minify CSS",
				value: false,
			},
		},
	};
};

export default {
	state: getDefaultState(),
	mutations: {
		resetLandingPageHtmlGeneratorState(state) {
			Object.assign(state, getDefaultState());
		},

		toggleLandingPageFetching(state) {
			state.fetchingLandingPageHTML = !state.fetchingHTML;
		},

		updateLandingPageHtmlGeneratorSettings(state, payload) {
			state.landingPageSettings[payload.key].value = payload.value;
		},

		updateLandingPageDummyHtml(state, dummyHtml) {
			state.landingPageDummyHtml = dummyHtml;
		},

	},
	actions: {
		async fetchLandingPageDummyHtml(context) {
			const genRequest = await fetch(
				"https://sdk-demo-api.chamaileon.io/fetchDocument",
				{
					method: "POST",
					body: JSON.stringify({
						document: context.state.landingPageJson,
						settings: { ...context.getters.getLandingPageHtmlGeneratorConfigObject, generatorMode: "landing-page" },
					}),
				},
			);

			if (!genRequest.ok) {
				throw new Error("Auth error");
			}

			const response = await genRequest.json();

			context.commit("updateLandingPageDummyHtml", response.result);
		},
	},
	getters: {
		getLandingPageHtmlGeneratorSettings(state) {
			return state.landingPageSettings;
		},

		getLandingPageHtmlGeneratorConfigObject(state) {
			const cnfg = {};

			for (const key in state.landingPageSettings) {
				cnfg[key] = state.landingPageSettings[key].value;
			}

			return cnfg;
		},

		getLandingPageHtmlDocument: state => state.landingPageHtml,

		getLandingPageDummyJSON: state => state.landingPageJson,

		getLandingPageDummyHtmlDocument: state => state.landingPageDummyHtml,

		getLandingPageHTMLFetchStatus(state) {
			return state.landingPageFetchingHTML;
		},
	},
};
