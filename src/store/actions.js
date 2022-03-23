/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable require-await */
import Vue from "vue";
import createChamaileonSdk from "@chamaileon-sdk/plugins";
import zango from "zangodb";
import favoriteImages from "./favoriteImages";

export default {
	async initSDK({ commit, dispatch, state }) {
		commit("setSdkInited", "pending");

		// RESET ALL PLUGINS STATE
		commit("setEmailEditorInited", false);
		commit("setEmailPreviewInited", false);
		commit("setHtmlImportInited", false);
		commit("setGalleryInited", false);
		commit("setVariableEditorInited", false);
		commit("setThumbnailInited", false);

		if (Vue.prototype?.$chamaileon?.sdk?.destroy && typeof Vue.prototype?.$chamaileon?.sdk?.destroy === "function") {
			Vue.prototype.$chamaileon.sdk.destroy();
		}
		// TODO
		// const apiBackend = "https://sdk-demo-api.chamaileon.io/getAuthToken";

		// async function fetchAccessToken() {
		// 	if (apiBackend === "https://sdk-demo-api.chamaileon.io/getAuthToken") {
		// 		const accessTokenRequest = await fetch(
		// 			"https://sdk-demo-api.chamaileon.io/getAuthToken",
		// 		);
		// 		const accessTokenResponse = await accessTokenRequest.json();
		// 		return accessTokenResponse.result;
		//	 } else {
		//	 	const apiKey = state.sdkConfig.apiKey;		

		const apiBackend = "http://localhost:12101/api/v1/tokens/generate";
		async function fetchAccessToken() {
			// if (apiBackend === "http://localhost:12101/api/v1/tokens/generate") {
			// 	const accessTokenRequest = await fetch(
			// 		"http://localhost:12101/api/v1/tokens/generate",
			// 	);
			// 	const accessTokenResponse = await accessTokenRequest.json();
			// 	return accessTokenResponse.result;
			// } else {
				const apiKey = "qtme1WMFYwzULdmMVW4u";
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
			getAccessToken,
		});

		commit("setSdkInited", true);
		commit("changeLogoFunction", window.createLogo);

		// Start the most used plugin after the SDK is initialized
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
							while (state.galleryInited === "pending") {
								// eslint-disable-next-line no-await-in-loop
								await new Promise(resolve => setTimeout(resolve, 450));
							}
							if (state.galleryInited === false) {
								await dispatch("initGallery");
							}

							if (state.galleryInited === true) {
								Vue.prototype.$chamaileon.gallery.methods.updateData({ editedImageUrl: originalImage, dimensions: lockDimensions });
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
							while (state.galleryInited === "pending") {
								// eslint-disable-next-line no-await-in-loop
								await new Promise(resolve => setTimeout(resolve, 450));
							}
							if (state.galleryInited === false) {
								await dispatch("initGallery");
							}

							if (state.galleryInited === true) {
								Vue.prototype.$chamaileon.gallery.methods.updateData({ editedImageUrl: originalImage, dimensions: lockDimensions });
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
								while (state.emailEditorInited === "pending") {
									// eslint-disable-next-line no-await-in-loop
									await new Promise(resolve => setTimeout(resolve, 450));
								}
								if (state.emailPreviewInited === false) {
									await dispatch("initEmailPreview");
								}

								if (state.emailPreviewInited === true) {
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
	async initHtmlImport({ getters, commit, state }) {
		if (!state.htmlImportInited) {
			commit("setHtmlImportInited", "pending");
			try {
				Vue.prototype.$chamaileon.htmlImport = await Vue.prototype.$chamaileon.createPlugins.createHtmlImport({
					...getters.getHtmlImportConfigObject,
					id: "htmlImport",
					hooks: {
						cancel: () => {
							console.log("TODO CANCEL");
							Vue.prototype.$chamaileon.htmlImport.hide();
						},
						close: () => {
							console.log("TODO CLOSE");
							Vue.prototype.$chamaileon.htmlImport.hide();
						},
						importReady: async (message) => {
							console.log("TODO onButtonClicked");
							const template = {
								content: message.document,
							};
							console.log(message.document);
							Vue.prototype.$chamaileon.htmlImport.hide();

						},
						onButtonClicked: async ({ buttonId, data }) => {
							console.log("TODO onButtonClicked", buttonId, data);
						},
					},
				});
				commit("setHtmlImportInited", true);
			} catch (error) {
				console.error(error);
				Vue.prototype.$chamaileon.emailPreview = null;
				commit("setHtmlImportInited", false);
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
	async initVariableEditor({ commit, getters, state }) {
		if (!state.variableEditorInited) {
			commit("setVariableEditorInited", "pending");
			try {
				Vue.prototype.$chamaileon.variableEditor = await Vue.prototype.$chamaileon.createPlugins.createVariableEditor({
					...getters.getVariableEditorConfigObject,
					hooks: {
						onButtonClicked: async ({ buttonId }) => {
							if (buttonId === "close") {
								const newJson = await Vue.prototype.$chamaileon.variableEditor.methods.getDocument();
								commit("updateDocument", newJson);
								//  exampleJsonTextArea.value = JSON.stringify(newJson);
								Vue.prototype.$chamaileon.variableEditor.hide();
							}
						},
					},
				});
				commit("setVariableEditorInited", true);
			} catch (e) {
				console.error(e);
				Vue.prototype.$chamaileon.variableEditor = null;
				commit("setVariableEditorInited", false);
			}
		}
	},
	async initThumbnail({ commit, getters, state }, container) {
		if (!container) return;
		if (!state.thumbnailUnited) {
			commit("setThumbnailInited", "pending");
			try {
				const document = JSON.parse(JSON.stringify(state.document));
				Vue.prototype.$chamaileon.thumbnail = await Vue.prototype.$chamaileon.createPlugins.createThumbnail(
					{
						data: { document },
						settings: { ...getters.getThumbnailSettings },
						hooks: {
							sendDOMHeight(message) {
								console.log("received DOMheight: " + message.height);
							},
						},
					},
					{
						container,
					},
				);
				commit("setThumbnailInited", true);
			} catch (e) {
				console.error(e);
				Vue.prototype.$chamaileon.thumbnail = null;
				commit("setThumbnailInited", false);
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
};
