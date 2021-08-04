import Vue from "vue";
import Vuex from "vuex";

import editorConfig from "../components/EmailEditor/store/emailEditorConfig";
import previewConfig from "../components/Preview/store/preview";
import variableEditorConfig from "../components/VariableEditor/store/variableEditor";
import thumbnailConfig from "../components/Thumbnail/store/thumbnail";
import document from "../components/AppElements/store/emailDocument";
import menu from "../components/AppElements/store/menuData";
import sdkConfig from "../components/Dashboard/store/sdkConfig";
import generatorConfig from "../components/HtmlGenerator/store/htmlGenerator";
import importConfig from "../components/HtmlImport/store/htmlImport";

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	modules: {
		editorConfig,
		previewConfig,
		variableEditorConfig,
		document,
		thumbnailConfig,
		sdkConfig,
		menu,
		generatorConfig,
		importConfig,
	},
	state: {
		logoCreatorFunction: undefined,
		sdk: null,
	},
	mutations: {
		//Load from local storage
		sdkConfigLoad(state, sdkConfig) {
			state.sdkConfig = sdkConfig;
		},

		editorConfigLoad(state, editorConfig) {
			state.editorConfig = editorConfig;
		},

		previewConfigLoad(state, previewConfig) {
			state.previewConfig = previewConfig;
		},

		variableEditorConfigLoad(state, variableEditorConfig) {
			state.variableEditorConfig = variableEditorConfig;
		},

		thumbnailConfigLoad(state, thumbnailConfig) {
			state.thumbnailConfig = thumbnailConfig;
		},

		generatorConfigLoad(state, generatorConfig) {
			state.generatorConfig = generatorConfig;
		},
		//SDK Settings

		changeLogoFunction(state, fn) {
			state.logoCreatorFunction = fn;
		},
		addSDK(state, sdk) {
			state.sdk = sdk;
		},

		//TODO: move to own module and wire up
		updateSDKConfig(state, payload) {
			state.sdkConfig = { ...state.sdkConfig, ...payload };
		},
	},
	actions: {
		async initSDK({ commit, state }) {
			const accessTokenRequest = await fetch(
				"https://sdk-demo-api.chamaileon.io/getAuthToken"
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
			//TODO: Variable Editor icon has to be mdi-*iconTitle*

			x.hooks = state.editorConfig.hooks;
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

			let tmpArr = [];

			out.settings.variablesToEdit.forEach((c) => {
				if (c.edit) tmpArr.push(c.name);
			});

			out.settings.variablesToEdit = tmpArr;

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
