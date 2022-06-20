import Vue from "vue";
import App from "./App.vue";
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

Vue.use(VueHighlightJS);

Vue.use(VueScrollActive);
Vue.use(VueMeta);

// eslint-disable-next-line vue/match-component-file-name
Vue.component("InlineSvg", InlineSvg);

Vue.use(VueObserveVisibility);

Vue.config.productionTip = false;

Vue.prototype.$chamaileon = {};

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
}).$mount("#app");
