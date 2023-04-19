import Vue from "vue";
import App from "./App.vue";
import vueGtm from "@gtm-support/vue2-gtm";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueScrollActive from "vue-scrollactive";
import VueHighlightJS from "vue-highlight.js";
import VueMeta from "vue-meta";

import "vue-highlight.js/lib/allLanguages";
import "highlight.js/styles/monokai-sublime.css";

import InlineSvg from "vue-inline-svg";
import VueObserveVisibility from "vue-observe-visibility";

export default function addScript(src) {
	return new Promise((resolve, reject) => {
		const createScript = document.createElement("script");
		createScript.src = src;
		createScript.type = "text/javascript";
		createScript.onload = resolve;
		createScript.onerror = reject;
		document.head.appendChild(createScript);
	});
}

(async () => {
	Vue.use(VueHighlightJS);

	Vue.use(VueScrollActive);
	Vue.use(VueMeta);

	// eslint-disable-next-line vue/match-component-file-name
	Vue.component("InlineSvg", InlineSvg);

	Vue.use(VueObserveVisibility);

	Vue.use(vueGtm, {
		id: "GTM-THZSD53",
		vueRouter: router,
		enabled: process.env.NODE_ENV !== "development",
	});

	Vue.config.productionTip = false;

	Vue.prototype.$chamaileon = {};

	await addScript("https://cdn.chamaileon.io/assets/createLogo.js");

	new Vue({
		router,
		store,
		vuetify,
		render: h => h(App),
	}).$mount("#app");
})();
