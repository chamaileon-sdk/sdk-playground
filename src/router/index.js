import Vue from "vue";
import VueRouter from "vue-router";

// Dashboard
const Dashboard = () => import("../components/Dashboard/view/Dashboard");

// Email editor
const EmailEditor = () => import("../components/EmailEditor/view/EmailEditor.vue");

// Gallery
const MegaGallery = () => import("../components/MegaGallery/view/MegaGallery");

// Thumbnail
const Thumbnail = () => import("../components/Thumbnail/view/Thumbnail");

// Preview
const Preview = () => import("../components/Preview/view/Preview");

// Variable Editor
const VariableEditor = () => import("../components/VariableEditor/view/VariableEditor");

// Html Import
const HtmlImportPlugin = () => import("../components/HtmlImportPlugin/view/HtmlImportPlugin");

// Html Generator
const HtmlGenerator = () => import("../components/HtmlGenerator/view/HtmlGenerator");

// Html Import
const HtmlImport = () => import("../components/HtmlImport/view/HtmlImport");

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
