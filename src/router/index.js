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
];

const router = new VueRouter({
	mode: "history",
	routes,
	scrollBehavior: function(to, from, savedPosition) {
		if (to.hash) {
			// return { selector: to.hash };
			return null;
		} else if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	},
});

export default router;
