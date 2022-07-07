const getDefaultState = () => {
	return {
		settings: {
			scroll: false,
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
			if (Object.prototype.hasOwnProperty.call(payload, "scale")) {
				dimensions.scale = parseFloat(payload.scale);
				settings.scale = parseFloat(payload.scale); // fallback for now
			}
			if (Object.prototype.hasOwnProperty.call(payload, "width")) {
				dimensions.width = parseInt(payload.width);
				settings.width = parseFloat(payload.width); // fallback for now
			}
			if (Object.prototype.hasOwnProperty.call(payload, "height")) {
				dimensions.height = parseInt(payload.height);
				settings.height = parseFloat(payload.height); // fallback for now
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
