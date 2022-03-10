/* eslint-disable no-unused-vars */
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

// import createChamaileonSdk from "../../../chamaileon-sdk/src/chamaileonSdk";
import zango from "zangodb";
import favoriteImages from "./favoriteImages";
import createChamaileonSdk from "@chamaileon-sdk/plugins";

Vue.use(Vuex);
const getDefaultState = () => {
	return {
		logoCreatorFunction: undefined,
		sdkInited: false,
		emailEditorInited: false,
		emailPreviewInited: false,
		galleryInited: false,
	};
};

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
		sdkConfigLoad(state, sdkConfig) {
			state.sdkConfig = sdkConfig;
		},
		setIsGalleryVisible(state, payload) {
			state.isGalleryVisible = payload;
		},
		emailEditorConfigLoad(state, editorConfig) {
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
		setSdkInited(state, payload) {
			state.sdkInited = payload;
		},
		setEmailEditorInited(state, payload) {
			state.emailEditorInited = payload;
		},
		setEmailPreviewInited(state, payload) {
			state.emailPreviewInited = payload;
		},
		setGalleryInited(state, payload) {
			state.galleryInited = payload;
		},
	},
	actions: {
		async initSDK({ commit, dispatch, state }) {
			commit("setSdkInited", "pending");

			if (Vue.prototype?.$chamaileon?.sdk?.destroy && typeof Vue.prototype?.$chamaileon?.sdk?.destroy === "function") {
				Vue.prototype.$chamaileon.sdk.destroy();
			}
			const apiBackend = "http://localhost:12101/api/v1/tokens/generate";

			async function fetchAccessToken() {
				// if (apiBackend === "http://localhost:12101/api/v1/tokens/generate") {
				// 	const accessTokenRequest = await fetch(
				// 		"http://localhost:12101/api/v1/tokens/generate",
				// 	);
				// 	const accessTokenResponse = await accessTokenRequest.json();
				// 	return accessTokenResponse.result;
				// } else {
					const apiKey = state.sdkConfig.apiKey;
					const accessTokenRequest = await fetch(apiBackend, {
						method: "GET",
						headers: {
							Authorization: `Bearer qtme1WMFYwzULdmMVW4u`,
						},
					});
					if (!accessTokenRequest.ok) {
						throw new Error("Auth error");
					}
					const accessTokenResponse = await accessTokenRequest.json();
					return accessTokenResponse.result;
				// }
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

			Vue.prototype.$chamaileon = {};
			Vue.prototype.$chamaileon.sdk = createChamaileonSdk();
			Vue.prototype.$chamaileon.createPlugins = await Vue.prototype.$chamaileon.sdk.init({
				...state.sdkConfig,
				accessToken,
			});

			commit("setSdkInited", true);
			commit("changeLogoFunction", window.createLogo);

			dispatch("initEmailEditor");
		},
		async initEmailEditor({ commit, dispatch, getters, state }) {
			if (!state.emailEditorInited) {
				commit("setEmailEditorInited", "pending");
				try {
					Vue.prototype.$chamaileon.emailEditor = await Vue.prototype.$chamaileon.createPlugins.createEmailEditor({
						...getters.getConfigObject,
						hooks: {
							close: () => {
								Vue.prototype.$chamaileon.emailEditor.hide();
							},
							onSave: async (obj) => {
								await dispatch("updateDocument", obj.document);
							},
							onAutoSave: async (obj) => {
								commit("updateDocument", obj.document);
							},
							onChange: () => {
								return new Promise((resolve) => {
									resolve();
								});
							},
							onBeforeClose: () => {
								return new Promise((resolve) => {
									resolve();
								});
							},
							onAfterClose: () => {
								return new Promise((resolve) => {
									resolve();
								});
							},
							onEditTitle: ({ title }) => {
								return new Promise((resolve) => {
									resolve(title);
								});
							},
							onEditImage: async ({
								originalImage,
								lockDimensions,
							}) => {
								if (!Vue.prototype.$chamaileon.gallery) {
									await dispatch("initGallery");
								}
								if (Vue.prototype.$chamaileon.gallery.show) {
									Vue.prototype.$chamaileon.gallery.show();
									const { url } = await Vue.prototype.$chamaileon.gallery.methods.pickImage();
									Vue.prototype.$chamaileon.gallery.hide();
									return url;
								}
							},
							onEditBackgroundImage: async ({
								originalImage,
								lockDimensions,
							}) => {
								if (!Vue.prototype.$chamaileon.gallery) {
									await dispatch("initGallery");
								}
								if (Vue.prototype.$chamaileon.gallery.show) {
									Vue.prototype.$chamaileon.gallery.show();
									const { url } = await Vue.prototype.$chamaileon.gallery.methods.pickImage();
									Vue.prototype.$chamaileon.gallery.hide();
									return url;
								}
							},
							onLoadBlocks: ({ libId }) => {
								const blocks = getters.getBlocksById(libId);

								return new Promise((resolve) => {
									resolve({ blocks });
								});
							},
							onBlockSave: ({ libId, block }) => {
								commit("addBlockToLib", { libId, block });

								return new Promise((resolve) => {
									resolve({ block });
								});
							},
							onBlockRename: ({ libId, block: { _id, title } }) => {
								commit("renameBlock", {
									libId,
									block: { _id, title },
								});

								return new Promise((resolve) => {
									resolve();
								});
							},
							onBlockDelete: ({ libId, block: { _id } }) => {
								commit("deleteBlock", {
									libId,
									blockId: _id,
								});

								return new Promise((resolve) => {
									resolve();
								});
							},
							onHeaderButtonClicked: async ({ buttonId }) => {
								if (buttonId === "preview") {
									if (!Vue.prototype.$chamaileon.emailPreview) {
										await dispatch("initEmailPreview");
									}
									if (Vue.prototype.$chamaileon.emailPreview.show) {
										Vue.prototype.$chamaileon.emailPreview.methods.updateData({ document: getters.getEmail });
										Vue.prototype.$chamaileon.emailPreview.show();
									}
								}
							},
							onTextInsertPluginButtonClicked: ({ buttonId }) => {
								return new Promise((resolve) => {
									resolve({ value: buttonId });
								});
							},
							onExpressionEditClicked: ({ expression }) => {
								return new Promise((resolve) => {
									resolve({ expression });
								});
							},
						},
					});
					commit("setEmailEditorInited", true);
				} catch (error) {
					commit("setEmailEditorInited", false);
					Vue.prototype.$chamaileon.emailEditor = null;
					console.error(error);
				}
			}
		},
		async initEmailPreview({ getters, commit, state }) {
			if (!state.emailPreviewInited) {
				commit("setEmailPreviewInited", "pending");
				try {
					Vue.prototype.$chamaileon.emailPreview = await Vue.prototype.$chamaileon.createPlugins.createEmailPreview({
						...getters.getPreviewConfigObject,
						hooks: {
							close: () => {
								Vue.prototype.$chamaileon.emailPreview.hide();
							},
							onHeaderButtonClicked: ({ buttonId }) => {
								if (buttonId === "hideHeader") {
									Vue.prototype.$chamaileon.emailPreview.methods.updateSettings({ hideHeader: true });
									setTimeout(() => {
										Vue.prototype.$chamaileon.emailPreview.methods.updateSettings({ hideHeader: false });
									}, 5000);
								}
							},
							shareEmail: ({ document }) => console.log("share: " + document),
							sendTestEmail: ({ document }) => console.log("test: " + document),
							requestReview: ({ document }) => console.log("review: " + document),
						},
					});
					commit("setEmailPreviewInited", true);
				} catch (error) {
					console.error(error);
					Vue.prototype.$chamaileon.emailPreview = null;
					commit("setEmailPreviewInited", false);
				}
			}
		},
		async initGallery({ commit, state }) {
			if (!state.galleryInited) {
				commit("setGalleryInited", "pending");
				let count = 0;
				let loadedItems = [];
				let images = [];

				try {
					const db = new zango.Db("chamaileonSDKGalleryDataBase", { images: ["_id", "parentId", "name", "createdAt", "src"] });
					images = db.collection("images");
					images.findOne({ parentId: { $eq: "16322284940689326" } }).then((isExists) => {
						if (!isExists) {
							try {
								images.insert(favoriteImages);
								return;
							} catch (error) {
								console.error(error);
							}
						}
					});

					Vue.prototype.$chamaileon.gallery = await Vue.prototype.$chamaileon.createPlugins.createGallery({
						data: {
							editedImageUrl: null,
							dimensions: null,
						},
						settings: { ...state.megaGalleryConfig.settings },
						hooks: {
							close: () => {
								Vue.prototype.$chamaileon.gallery.hide();
							},
							onUploadImage: async ({ selectedFolderId, parents, image }) => {
								const _id = Date.now() + Math.random();
								const newImageData = {
									name: image.name,
									parentId: selectedFolderId,
									src: image.data || null,
									createdAt: new Date(),
									_id,
								};
								await images.insert([ newImageData ]);
								return newImageData;
							},
							onSaveUrl:	async ({ selectedFolderId, parents, image }) => {
								const _id = Date.now() + Math.random();
								const newImageData = {
									name: image.name,
									parentId: selectedFolderId,
									src: image.url || null,
									createdAt: new Date(),
									_id,
								};
								await images.insert([ newImageData ]);
								return newImageData;
							},
							onFolderSelected: async ({ selectedFolderId, parents, searchValue, orderValue, maxImagePerPage, pageNumber }) => {
								// reset when the first banch of items loaded
								if (pageNumber === 0) {
									loadedItems = [];
									count = 0;
									await images.find({ parentId: { $eq: selectedFolderId } }).forEach(() => count++);
								}

								const exclude = loadedItems.map(item => item._id);

								const query = searchValue
									? 							{
										parentId: { $eq: selectedFolderId },
										_id: { $nin: exclude.length > 0 ? exclude : "notavalidId" },
										name: {	$regex: searchValue, $options: "i" },
									}
									: 							{
										parentId: { $eq: selectedFolderId },
										_id: { $nin: exclude.length > 0 ? exclude : "notavalidId" },
									};

								const result = [];
								await images.find({
									...query,
								}).limit(maxImagePerPage).sort(orderValue)
									.forEach((
										(image) => {
											result.push(image);
											loadedItems = [...loadedItems, ...result];
										}));

								console.log(images);
								return { images: result, count };
							},
							onUpdateImage: async ({ imageId, parents, selectedFolderId, image }) => {
								await images.update({
									_id: { $eq: imageId },
								}, { name: image.name });
							},
							onDeleteImage: async ({ imageId, parents, selectedFolderId }) => {
								await images.remove({ _id: { $eq: imageId } });
							},
						},
					});
					commit("setGalleryInited", true);
				} catch (error) {
					console.error(error);
					Vue.prototype.$chamaileon.gallery = null;
					commit("setGalleryInited", false);
				}
			}
		},
		updateSDK({ dispatch }) {
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
		getHtmlImportConfigObject: (state) => {
			const x = JSON.parse(JSON.stringify(state.htmlImportConfig));
			return x;
		},
		getConfigObject: (state) => {
			// Deep copy
			const config = JSON.parse(JSON.stringify(state.editorConfig));
			delete config.BlockLibData;

			const currentElems = config.settings.elements;
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

			config.settings.elements = keepElementsTab ? currentElems : false;

			// Addons processing
			const addons = config.settings.addons;
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
			config.settings.addons = addons;

			// User processing
			if (!config.settings.user.enabled) config.user = false;

			config.data = { document: state.document };
			// TODO: Variable Editor icon has to be mdi-*iconTitle*

			config.hooks = state.editorConfig.hooks;

			// TOOD: figure out static asset base url on the playground because for now it's not
			// passed to the editor
			// x.settings.staticAssetsBaseUrl = state.editorConfig.staticAssetsBaseUrl;

			config.settings.videoElementBaseUrl = state.editorConfig.videoElementBaseUrl;

			return config;
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
