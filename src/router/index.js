import Vue from "vue";
import VueRouter from "vue-router";

//Dashboard
import Dashboard from "../views/Dashboard";

//Email editor
import EmailEditor from "../views/EmailEditor.vue";

//Thumbnail
import Thumbnail from "../views/Thumbnail.vue";

//Preview
import Preview from "../views/Preview.vue";

//Variable Editor
import VariableEditor from "../views/VariableEditor";

//Html Generator
import HtmlGenerator from "../components/HtmlGenerator/view/HtmlGenerator";

//Html Import
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
	scrollBehavior: function (to, from, savedPosition) {
		if (to.path != from.path) return { x: 0, y: 0 };

		if (savedPosition) return savedPosition;

		return null;
	},
});

export default router;
