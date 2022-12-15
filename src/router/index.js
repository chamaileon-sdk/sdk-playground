import Vue from "vue";
import VueRouter from "vue-router";

// Dashboard
import Dashboard from "../components/Dashboard/view/Dashboard";

// Email editor
import EmailEditor from "../components/EmailEditor/view/EmailEditor.vue";

// Gallery
import MegaGallery from "../components/MegaGallery/view/MegaGallery";

// Thumbnail
import Thumbnail from "../components/Thumbnail/view/Thumbnail";

// Preview
import Preview from "../components/Preview/view/Preview";

// Variable Editor
import VariableEditor from "../components/VariableEditor/view/VariableEditor";

// Html Import
import HtmlImportPlugin from "../components/HtmlImportPlugin/view/HtmlImportPlugin";

// Html Generator
import HtmlGenerator from "../components/HtmlGenerator/view/HtmlGenerator";

// Html Import
import HtmlImport from "../components/HtmlImport/view/HtmlImport";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "sdk",
	},
	{
		path: "/sdk",
		component: Dashboard,
	},
	{
		path: "/emaileditor",
		component: EmailEditor,
	},
	{
		path: "/gallery",
		component: MegaGallery,
	},
	{
		path: "/emailthumbnail",
		component: Thumbnail,
	},
	{
		path: "/emailpreview",
		component: Preview,
	},
	{
		path: "/variableeditor",
		component: VariableEditor,
	},
	{
		path: "/htmlimportplugin",
		component: HtmlImportPlugin,
	},
	{
		path: "/htmlgenerator",
		component: HtmlGenerator,
	},
	{
		path: "/htmlimport",
		component: HtmlImport,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.path !== from.path) return { x: 0, y: 0 };

		if (savedPosition) return savedPosition;

		return null;
	},
});

export default router;
