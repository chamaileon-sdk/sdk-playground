import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		icons: {
			iconfont: "mdi",
		},
		options: { customProperties: true },
		themes: {
			light: {
				primary: "#2D3291",
			},
		},
	},
});
