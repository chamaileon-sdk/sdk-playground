/* eslint-disable require-await */
/* eslint-disable no-shadow */
import Vue from "vue";
import Vuex from "vuex";

import editorConfig from "../components/EmailEditor/store/emailEditorConfig";
import megaGalleryConfig from "../components/MegaGallery/store/megaGalleryConfig";
import previewConfig from "../components/Preview/store/preview";
import variableEditorConfig from "../components/VariableEditor/store/variableEditor";
import thumbnailConfig from "../components/Thumbnail/store/thumbnail";
import document from "../components/AppElements/store/emailDocument";
import menu from "../components/AppElements/store/menuData";
import sdkConfig from "../components/Dashboard/store/sdkConfig";
import generatorConfig from "../components/HtmlGenerator/store/htmlGenerator";
import importConfig from "../components/HtmlImport/store/htmlImport";

import createChamaileonSdk from "../../../chamaileon-sdk/src/chamaileonSdk";

Vue.use(Vuex);
const getDefaultState = () => {
	return {
		logoCreatorFunction: undefined,
	};
};

const chamaileonSdk = createChamaileonSdk();

export default new Vuex.Store({
	strict: true,
	modules: {
		editorConfig,
		megaGalleryConfig,
		previewConfig,
		variableEditorConfig,
		document,
		thumbnailConfig,
		sdkConfig,
		menu,
		generatorConfig,
		importConfig,
	},
	state: getDefaultState(),
	mutations: {
		resetState(state) {
			Object.assign(state, getDefaultState());
		},
		// Load from local storage
		sdkInitConfigLoad(state, sdkConfig) {
			state.sdkConfig = sdkConfig;
		},
		setIsGalleryVisible(state, payload) {
			state.isGalleryVisible = payload;
		},
		editorConfigLoad(state, editorConfig) {
			state.editorConfig = {
				...state.editorConfig,
				...editorConfig,
				settings: {
					...state.editorConfig.settings,
					...editorConfig.settings,
				},
			};
		},
		galleryConfigLoad(state, megaGalleryConfig) {
			state.megaGalleryConfig = megaGalleryConfig;
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
			state.generatorConfig.settings = generatorConfig.settings;
		},
		emailDocumentLoad(state, emailDocument) {
			state.document = emailDocument;
		},
		// SDK Settings
		changeLogoFunction(state, fn) {
			state.logoCreatorFunction = fn;
		},
		addSDK(state, sdk) {
			state.sdk = sdk;
		},
		addMegaPreviewInterface(state, megaPreviewInterface) {
			state.megaPreviewInterface = megaPreviewInterface;
		},
		addvariablePreviewInterface(state, variablePreviewInterface) {
			state.variablePreviewInterface = variablePreviewInterface;
		},
	},
	actions: {
		async initSDK({ commit, state }) {
			const apiBackend = state.sdkConfig.apiBackend;

			async function fetchAccessToken() {
				if (apiBackend === "https://sdk-demo-api.chamaileon.io/getAuthToken") {
					const accessTokenRequest = await fetch(
						"https://sdk-demo-api.chamaileon.io/getAuthToken",
					);
					const accessTokenResponse = await accessTokenRequest.json();
					return accessTokenResponse.result;
				} else {
					const apiKey = state.sdkConfig.apiKey;
					const accessTokenRequest = await fetch(apiBackend, {
						method: "GET",
						headers: {
							Authorization: `Bearer ${apiKey}`,
						},
					});
					if (!accessTokenRequest.ok) {
						throw new Error("Auth error");
					}
					const accessTokenResponse = await accessTokenRequest.json();
					return accessTokenResponse.result;
				}
			}

			async function getAccessToken() {
				let accessTokenCache = JSON.parse(localStorage.getItem("chamaileonSdkAccessTokenCache"));
				const now = new Date();

				if (!accessTokenCache || !accessTokenCache.accessToken || now - new Date(accessTokenCache.createdAt) > 3600000) {
					const accessToken = await fetchAccessToken();

					accessTokenCache = {
						accessToken,
						createdAt: now,
					};

					localStorage.setItem("chamaileonSdkAccessTokenCache", JSON.stringify(accessTokenCache));
				}

				return accessTokenCache.accessToken;
			}

			const accessToken = await getAccessToken();

			const chamaileonPlugins = await chamaileonSdk.init({
				mode: "serverless",
				environmentName: "dev",
				accessToken,
				whitelabel: {
					...this.state.sdkConfig,
				},
			});

			Vue.prototype.$chamaileon = chamaileonPlugins;
			commit("changeLogoFunction", window.createLogo);
		},
		async updateSDK({ dispatch }) {
			chamaileonSdk.destroy();

			window.document
				.querySelectorAll(".in-chamaileon-iframe")
				.forEach(c => c.remove());
			const elems = window.document.head.getElementsByTagName("script");
			const links = window.document.head.getElementsByTagName("link");
			links[links.length - 1].remove();

			const styles = window.document.head.getElementsByTagName("style");
			let i = styles.length - 1;
			while (
				i >= 0
				&& styles[i].innerHTML.includes("chamaileon-plugin-wrapper iframe")
			) {
				i--;
			}

			i = elems.length;

			while (i--) {
				elems[i].remove();
			}

			dispatch("initSDK");
		},
		resetPlayGround({ commit }) {
			commit("resetState");
			commit("resetEmailDocumentState");
			commit("resetSdkConfigState");
			commit("resetEditorState");
			commit("resetEditorBlockLibraryContainerState");
			commit("resetHtmlGeneratorState");
			commit("resetGalleryState");
			commit("resetPreviewState");
			commit("resetThumbnailState");
			commit("resetVariableEditorState");
		},
	},
	getters: {
		getEmail: (state) => {
			return state.document;
		},
		getGalleryConfigObject: (state) => {
			const x = JSON.parse(JSON.stringify(state.megaGalleryConfig));
			return x;
		},
		getConfigObject: (state) => {
			// Deep copy
			const x = JSON.parse(JSON.stringify(state.editorConfig));

			const currentElems = x.settings.elements;
			let keepElementsTab = false;

			for (const key in currentElems) {
				let keep = false;
				const obj = currentElems[key];
				for (const elem in obj) {
					keep = keep || obj[elem];
				}

				if (!keep) currentElems[key] = false;
				keepElementsTab = keepElementsTab || keep;
			}

			x.settings.elements = keepElementsTab ? currentElems : false;

			// Addons processing
			const addons = x.addons;
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

			// User processing
			if (!x.user.enabled) x.user = false;

			x.document = state.document;
			// TODO: Variable Editor icon has to be mdi-*iconTitle*

			x.hooks = state.editorConfig.hooks;

			// TOOD: figure out static asset base url on the playground because for now it's not
			// passed to the editor
			// x.settings.staticAssetsBaseUrl = state.editorConfig.staticAssetsBaseUrl;

			x.settings.videoElementBaseUrl = state.editorConfig.videoElementBaseUrl;

			return x;
		},
		getVariableEditorConfigObject: (state) => {
			const config = {};

			const document = JSON.parse(JSON.stringify(state.document));

			config.data = { document }; // !important change we set data from now, not document

			config.settings = JSON.parse(
				JSON.stringify(state.variableEditorConfig.settings),
			);

			config.settings.buttons.header.left = [
				{ id: "close", label: "close", icon: "mdi-arrow-left" },
				...config.settings.buttons.header.left,
			];

			const tmpArr = [];

			config.settings.variablesToEdit.forEach((variable) => {
				if (variable.edit) tmpArr.push(variable.name);
			});

			config.settings.variablesToEdit = tmpArr;

			const editorConfig = JSON.parse(JSON.stringify(state.editorConfig));

			config.settings.fontStacks = editorConfig.settings.fontStacks;
			config.settings.hideDefaultFonts = editorConfig.settings.hideDefaultFonts;

			console.log(config);

			return config;
		},
		getPreviewConfigObject: (state) => {
			const config = {};
			const document = JSON.parse(JSON.stringify(state.document));

			config.data = { document }; // !important change we set data from now, not document
			config.settings = state.previewConfig.settings;

			return config;
		},
	},
});
