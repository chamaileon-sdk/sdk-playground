import getDefaultState from "./getDefaultState";

export default {
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
	setVariableEditorInited(state, payload) {
		state.variableEditorInited = payload;
	},
};
