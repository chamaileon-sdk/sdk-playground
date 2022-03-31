const getDefaultState = () => {
	return {
		settings: {
			width: 300,
			height: 520,
			scale: 1,
			scroll: false,
		},
	};
};

export default {
	state: getDefaultState(),
	mutations: {
		resetThumbnailState(state) {
			Object.assign(state, getDefaultState());
		},
		updateThumbnail(state, payload) {
			if (payload.scroll && typeof payload.scroll !== "boolean") {
				throw new Error("scroll must be a boolean");
			}
			if (payload.scale) {
				parseFloat(payload.scale);
			}
			if (payload.width) {
				parseInt(payload.width);
			}

			if (payload.length) {
				parseInt(payload.length);
			}

			state.settings = { ...state.settings, ...payload };
		},
	},
	actions: {},
	getters: {
		getThumbnailSettings: state => state.settings,
	},
};
