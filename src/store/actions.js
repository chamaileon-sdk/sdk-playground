/* eslint-disable no-shadow */
import Vue from "vue";
import createChamaileonSdk from "@chamaileon-sdk/plugins";
import zango from "zangodb";
import { favoriteImages } from "./favoriteImages";

export default {
	async waitForSdkToBeInited({ dispatch, state }) {
		if (state.sdkInited === false) {
			await dispatch("initSDK");
		}

		while (state.sdkInited === "pending") {
			await new Promise(resolve => setTimeout(resolve, 100));
		}
	},
	async initSDK({ commit, dispatch, state }) {
		commit("setSdkInited", "pending");
		while (state.localStorageLoaded === "pending" || state.localStorageLoaded === false) {
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		if (Vue.prototype.$chamaileon && Vue.prototype.$chamaileon.destroy && typeof Vue.prototype.$chamaileon.destroy === "function") {
			Vue.prototype.$chamaileon.destroy();
		}

		// RESET ALL PLUGINS STATE
		commit("setEmailEditorInited", false);
		commit("setEmailPreviewInited", false);
		commit("setHtmlImportInited", false);
		commit("setGalleryInited", false);
		commit("setVariableEditorInited", false);
		commit("setThumbnailInited", false);

		const apiKey = state.sdkConfig.apiKey;
		const apiBackend = state.sdkConfig.apiBackend;

		async function fetchAccessToken() {
			if (apiBackend === "https://sdk-demo-api.chamaileon.io/getAuthToken") {
				const accessTokenRequest = await fetch(apiBackend);
				const accessTokenResponse = await accessTokenRequest.json();
				return accessTokenResponse.result;
			} else {
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

		let chamaileonPlugins;

		try {
			chamaileonPlugins = await createChamaileonSdk(
				{
					...state.sdkConfig,
					accessToken,
					getAccessToken,
				},
			);
		} catch (error) {
			console.error("Failed to initialize SDK: ", error);
			commit("setSdkInited", false);
		}

		Vue.prototype.$chamaileon = {
			...Vue.prototype.$chamaileon,
			...chamaileonPlugins,
		};

		commit("setSdkInited", true);
		commit("changeLogoFunction", window.createLogo);

		dispatch("initEmailEditor");
		dispatch("initVariableEditor");
		dispatch("initEmailPreview");
		dispatch("initHtmlImport");
		dispatch("initGallery");
	},
	async initEmailEditor({ commit, dispatch, getters, state }) {
		if (state.emailEditorInited === true || state.emailEditorInited === "pending") return;
		commit("setEmailEditorInited", "pending");
		await dispatch("waitForSdkToBeInited");
		try {
			Vue.prototype.$chamaileon.emailEditor = await Vue.prototype.$chamaileon.createFullscreenPlugin({
				plugin: "editor",
				...getters.getEditorConfigObject,
				data: { document: {} },
				hooks: {
					close: () => {
						Vue.prototype.$chamaileon.emailEditor.hide();
					},
					onSave: async (obj) => {
						await dispatch("updateDocument", obj.document);
					},
					onAutoSave: (obj) => {
						console.log(obj.document);
						commit("updateDocument", obj.document);
					},
					onChange: () => {
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
						dispatch("initGallery");
						while (state.galleryInited === "pending") {
							await new Promise(resolve => setTimeout(resolve, 100));
						}

						if (state.galleryInited === true) {
							Vue.prototype.$chamaileon.gallery.methods.updateData({ currentImgSrc: originalImage, dimensions: lockDimensions });
							Vue.prototype.$chamaileon.gallery.show();

							const { src } = await Vue.prototype.$chamaileon.gallery.methods.pickImage();
							Vue.prototype.$chamaileon.gallery.hide();
							return { src };
						}
					},
					onEditBackgroundImage: async ({
						originalImage,
					}) => {
						dispatch("initGallery");
						while (state.galleryInited === "pending") {
							await new Promise(resolve => setTimeout(resolve, 100));
						}

						if (state.galleryInited === true) {
							Vue.prototype.$chamaileon.gallery.methods.updateData({ currentImgSrc: originalImage, dimensions: null });
							Vue.prototype.$chamaileon.gallery.show();

							const { src } = await Vue.prototype.$chamaileon.gallery.methods.pickImage();
							Vue.prototype.$chamaileon.gallery.hide();
							return { src };
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
							dispatch("initEmailPreview");
							while (state.emailPreviewInited === "pending") {
								await new Promise(resolve => setTimeout(resolve, 100));
							}

							const document = getters.getEmail;

							if (state.emailPreviewInited === true) {
								Vue.prototype.$chamaileon.emailPreview.methods.updateData({ document });
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
			console.error("Failed to initialize editor: ", error);
			Vue.prototype.$chamaileon.emailEditor = null;
			commit("setEmailEditorInited", false);
		}
	},
	async initEmailPreview({ getters, commit, state, dispatch }) {
		if (state.emailPreviewInited === true || state.emailPreviewInited === "pending") return;
		commit("setEmailPreviewInited", "pending");
		await dispatch("waitForSdkToBeInited");
		try {
			Vue.prototype.$chamaileon.emailPreview = await Vue.prototype.$chamaileon.createFullscreenPlugin({
				plugin: "preview",
				...getters.getPreviewConfigObject,
				hooks: {
					close: () => {
						Vue.prototype.$chamaileon.emailPreview.hide();
					},
					onHeaderButtonClicked: ({ buttonId }) => {
						console.info("Button clicked: " + buttonId);
					},
				},
			});
			commit("setEmailPreviewInited", true);
		} catch (error) {
			console.error("Failed to initialize preview: ", error);
			Vue.prototype.$chamaileon.emailPreview = null;
			commit("setEmailPreviewInited", false);
		}
	},
	async initHtmlImport({ getters, commit, state, dispatch }) {
		if (state.htmlImportInited === true || state.htmlImportInited === "pending") return;
		commit("setHtmlImportInited", "pending");
		await dispatch("waitForSdkToBeInited");
		try {
			Vue.prototype.$chamaileon.htmlImport = await Vue.prototype.$chamaileon.createFullscreenPlugin({
				...getters.getHtmlImportConfigObject,
				plugin: "import",
				settings: {
					replaceImages: true,
					showReplaceSwitch: true,
				},
				hooks: {
					cancel: () => {
						Vue.prototype.$chamaileon.htmlImport.hide();
					},
					close: () => {
						Vue.prototype.$chamaileon.htmlImport.hide();
					},
					onReplaceImage: src => src,
					onImport: async ({ html }) => {
						if (!html) throw new Error("HTML missing");
						const response = await fetch("https://sdk-api.chamaileon.io/api/v1/emails/import", {
							method: "POST",
							headers: {
								Authorization: `Bearer ${state.sdkConfig.apiKey}`,
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								title: "",
								emailHTML: html,
							}),
						});
						if (response.status !== 200) throw new Error("Request error");
						const answer = await response.json();
						if (answer.error) throw new Error(answer.error);
						return answer;
					},
					onImportReady: async (result) => {
						let document = { ...result.document, title: 'Imported email' }
						Vue.prototype.$chamaileon.htmlImport.hide();
						await Vue.prototype.$chamaileon.emailEditor.methods.updateData({ document });
						Vue.prototype.$chamaileon.emailEditor.show();
					},
				},
			});
			commit("setHtmlImportInited", true);
		} catch (error) {
			console.error("Failed to initialize html import: ", error);
			Vue.prototype.$chamaileon.htmlImport = null;
			commit("setHtmlImportInited", false);
		}
	},
	async initGallery({ commit, state, dispatch }) {
		if (state.galleryInited === true || state.galleryInited === "pending") return;
		commit("setGalleryInited", "pending");
		await dispatch("waitForSdkToBeInited");
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

			Vue.prototype.$chamaileon.gallery = await Vue.prototype.$chamaileon.createFullscreenPlugin({
				plugin: "gallery",
				data: {
					editedImageUrl: null,
					dimensions: null,
				},
				settings: { ...state.megaGalleryConfig.settings },
				hooks: {
					close: () => {
						Vue.prototype.$chamaileon.gallery.hide();
					},
					onUploadImage: async ({ selectedFolderId, image }) => {
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
					onSaveUrl: async ({ selectedFolderId, image }) => {
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
					onFolderSelected: async ({ selectedFolderId, searchValue, orderValue, maxImagePerPage, pageNumber }) => {
						// reset when the first batch of items loaded
						if (pageNumber === 0) {
							loadedItems = [];
							count = 0;
							await images.find({ parentId: { $eq: selectedFolderId } }).forEach(() => count++);
						}

						const exclude = loadedItems.map(item => item._id);

						const query = searchValue
							? {
								parentId: { $eq: selectedFolderId },
								_id: { $nin: exclude.length > 0 ? exclude : "notavalidId" },
								name: { $regex: searchValue, $options: "i" },
							}
							: {
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
					onUpdateImage: async ({ imageId, image }) => {
						await images.update({
							_id: { $eq: imageId },
						}, { name: image.name });
					},
					onDeleteImage: async ({ imageId }) => {
						await images.remove({ _id: { $eq: imageId } });
					},
				},
			});
			commit("setGalleryInited", true);
		} catch (error) {
			console.error("Failed to initialize gallery: ", error);
			Vue.prototype.$chamaileon.gallery = null;
			commit("setGalleryInited", false);
		}
	},
	async initVariableEditor({ commit, getters, state, dispatch }) {
		if (state.variableEditorInited === true || state.variableEditorInited === "pending") return;
		commit("setVariableEditorInited", "pending");
		await dispatch("waitForSdkToBeInited");
		try {
			Vue.prototype.$chamaileon.variableEditor = await Vue.prototype.$chamaileon.createFullscreenPlugin({
				plugin: "variable-editor",
				...getters.getVariableEditorConfigObject,
				hooks: {
					onButtonClicked: async ({ buttonId }) => {
						if (buttonId === "close") {
							const newJson = await Vue.prototype.$chamaileon.variableEditor.methods.getDocument();
							commit("updateDocument", newJson);
							Vue.prototype.$chamaileon.variableEditor.hide();
						}
					},
					onEditImage: async () => {
						dispatch("initGallery");
						while (state.galleryInited === "pending") {
							await new Promise(resolve => setTimeout(resolve, 100));
						}

						if (state.galleryInited === true) {
							Vue.prototype.$chamaileon.gallery.methods.updateData({ currentImgSrc: "", dimensions: null });
							Vue.prototype.$chamaileon.gallery.show();

							const { src } = await Vue.prototype.$chamaileon.gallery.methods.pickImage();
							Vue.prototype.$chamaileon.gallery.hide();
							return { src };
						}
					},
					onTextInsertPluginButtonClicked: ({ buttonId }) => {
						return new Promise((resolve) => {
							resolve({ value: buttonId });
						});
					},
				},
			});
			commit("setVariableEditorInited", true);
		} catch (error) {
			console.error("Failed to initialize variable editor: ", error);
			Vue.prototype.$chamaileon.variableEditor = null;
			commit("setVariableEditorInited", false);
		}
	},
	async initThumbnail({ commit, getters, state, dispatch }, container) {
		if (!container) return;
		if (state.thumbnailInited === true || state.thumbnailInited === "pending") return;
		commit("setThumbnailInited", "pending");
		await dispatch("waitForSdkToBeInited");
		try {
			const document = JSON.parse(JSON.stringify(state.document));
			Vue.prototype.$chamaileon.thumbnail = await Vue.prototype.$chamaileon.createInlinePlugin(
				{
					plugin: "thumbnail",
					data: { document },
					settings: { ...getters.getThumbnailSettings },
					hooks: {
						sendDOMHeight(message) {
							console.log("received DOMheight from thumbnail: " + message.height);
						},
					},
				},
				{
					container,
				},
			);
			commit("setThumbnailInited", true);
		} catch (error) {
			console.error("Failed to initialize thumbnail: ", error);
			Vue.prototype.$chamaileon.thumbnail = null;
			commit("setThumbnailInited", false);
		}
	},
	updateSDK({ dispatch }) {
		dispatch("initSDK");
	},
	resetPlayGround({ commit, dispatch }) {
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
		localStorage.clear(); // Remove everything from the localStorage as well
		commit("setLocalStorageLoaded", true);
		dispatch("fetchDummyHtml");
		dispatch("initSDK");
	},
};
