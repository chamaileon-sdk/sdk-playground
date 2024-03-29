const getDefaultState = () => {
	return {
		settings: {
			scroll: false,
			proxyImages: true,
		},
		dimensions: {
			width: 300,
			height: 520,
			scale: 1,
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
			const settings = {};
			const dimensions = {};
			if (payload.scroll && typeof payload.scroll !== "boolean") {
				throw new Error("scroll must be a boolean");
			}
			if (Object.prototype.hasOwnProperty.call(payload, "scroll")) {
				settings.scroll = payload.scroll;
			}
			if (Object.prototype.hasOwnProperty.call(payload, "proxyImages")) {
				settings.proxyImages = payload.proxyImages;
			}
			if (Object.prototype.hasOwnProperty.call(payload, "scale")) {
				dimensions.scale = parseFloat(payload.scale);
			}
			if (Object.prototype.hasOwnProperty.call(payload, "width")) {
				dimensions.width = parseInt(payload.width);
			}
			if (Object.prototype.hasOwnProperty.call(payload, "height")) {
				dimensions.height = parseInt(payload.height);
			}

			state.settings = { ...state.settings, ...settings };
			state.dimensions = { ...state.dimensions, ...dimensions };
		},
	},
	actions: {},
	getters: {
		getThumbnailSettings: state => state.settings,
		getThumbnailDimensions: state => state.dimensions,
	},
};
