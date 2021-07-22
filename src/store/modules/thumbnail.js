export default {
	state: () => ({
		settings: {
			width: 320,
			height: 240,
			scale: 1,
			scroll: false,
			container: "#email-thumbnail",
		},
	}),
	mutations: {
		updateThumbnail(state, payload) {
			state.settings = { ...state.settings, ...payload };
		},
	},
	actions: {},
	getters: {
		getThumbnailSettings: (state) => state.settings,
	},
};
