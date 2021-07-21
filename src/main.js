import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueScrollactive from "vue-scrollactive";
import VueHighlightJS from "vue-highlight.js";

import "vue-highlight.js/lib/allLanguages";

import "highlight.js/styles/monokai-sublime.css";

Vue.use(VueHighlightJS);

Vue.use(VueScrollactive);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
