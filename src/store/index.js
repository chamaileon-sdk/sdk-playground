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
import importPluginConfig from "../components/HtmlImportPlugin/store/htmlImportPlugin";
import generatorConfig from "../components/HtmlGenerator/store/htmlGenerator";
import importConfig from "../components/HtmlImport/store/htmlImport";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import getDefaultState from "./getDefaultState";

Vue.use(Vuex);

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
		importPluginConfig,
		importConfig,
	},
	state: getDefaultState(),
	mutations,
	actions,
	getters,
});
