import Vue from "vue";
import Vuex from "vuex";

import editorConfig from "./modules/emailEditorConfig";
import previewConfig from "./modules/preview";
import variableEditorConfig from "./modules/variableEditor";
import document from "./modules/emailDocument";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		editorConfig,
		previewConfig,
		variableEditorConfig,
		document,
	},
	state: {
		apiKey: "Y8mbu7S5Qh4cyCqJCVBn",
		logoCreatorFunction: undefined,
		sdk: null,
		sdkConfig: {
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
		},
	},
	mutations: {
		changeLogoFunction(state, fn) {
			state.logoCreatorFunction = fn;
		},
		addSDK(state, sdk) {
			state.sdk = sdk;
		},

		updateSDKConfig(state, payload) {
			state.sdkConfig = { ...state.sdkConfig, ...payload };
		},
	},
	actions: {
		async initSDK({ commit, state }) {
			const accessTokenRequest = await fetch(
				"https://sdk-api.chamaileon.io/api/v1/tokens/generate",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${state.apiKey}`,
					},
				}
			);

			const accessTokenResponse = await accessTokenRequest.json();
			const accessToken = accessTokenResponse.result;

			const chamaileonPlugins = await window.chamaileonSdk.init({
				mode: "serverless",
				accessToken: accessToken,
				whitelabel: {
					...this.state.sdkConfig,
				},
			});

			commit("addSDK", chamaileonPlugins);
			commit("changeLogoFunction", window.createLogo);
		},
		async updateSDK({ dispatch }) {
			window.chamaileonSdk.destroy();

			window.document
				.querySelectorAll(".in-chamaileon-iframe")
				.forEach((c) => c.remove());
			let elems = window.document.head.getElementsByTagName("script");
			let links = window.document.head.getElementsByTagName("link");
			links[links.length - 1].remove();

			let styles = window.document.head.getElementsByTagName("style");
			let i = styles.length - 1;
			while (
				i >= 0 &&
				styles[i].innerHTML.includes("chamaileon-plugin-wrapper iframe")
			)
				i--;
			console.log(styles[i]);

			i = elems.length;

			while (i--) {
				elems[i].remove();
			}

			dispatch("initSDK");
		},
	},
	getters: {
		getEmail: (state) => {
			return state.document;
		},

		//TODO: move to editor
		getConfigObject: (state) => {
			//Deep copy
			let x = JSON.parse(JSON.stringify(state.editorConfig));

			let currentElems = x.settings.elements;
			let keepElementsTab = false;

			for (const key in currentElems) {
				let keep = false;
				let obj = currentElems[key];
				for (const elem in obj) {
					keep = keep || obj[elem];
				}

				if (!keep) currentElems[key] = false;
				keepElementsTab = keepElementsTab || keep;
			}

			x.settings.elements = keepElementsTab ? currentElems : false;

			//Addons processing
			let addons = x.addons;
			for (const key in addons) {
				switch (addons[key].state) {
				case "enabled":
					addons[key] = { enabled: true };
					break;
				case "disabled":
					addons[key] = { enabled: false };
					break;
				case "hidden":
					addons[key] = false;
					break;
				default:
					break;
				}
			}
			x.settings.addons = addons;

			//User processing
			if (!x.user.enabled) x.user = false;

			x.document = state.document;
			//Variable Editor icon has to be mdi-*iconTitle*

			return x;
		},

		getVariableEditorConfigObject: (state) => {
			let out = {};

			out.document = state.document;
			out.settings = JSON.parse(
				JSON.stringify(state.variableEditorConfig.settings)
			);

			out.settings.buttons.header.left = [
				{ id: "close", label: "close", icon: "mdi-arrow-left" },
				...out.settings.buttons.header.left,
			];

			let varsToEdit = state.document.variables.map((c) => c.name);

			out.settings.variablesToEdit = varsToEdit;

			return out;
		},

		getPreviewConfigObject: (state) => {
			let out = {};

			let doc = JSON.parse(JSON.stringify(state.document));

			out.document = doc;
			out.settings = state.previewConfig.settings;
			out.hooks = {};

			return out;
		},
	},
});
