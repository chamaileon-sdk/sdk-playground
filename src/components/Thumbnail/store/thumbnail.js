const getDefaultState = () => {
	return {
		settings: {
			width: 320,
			height: 240,
			scale: 1,
			scroll: false,
			container: "#email-thumbnail",
		},
	}
}

export default {
	state: getDefaultState(),
	mutations: {
		resetThumbnailState (state) {
			Object.assign(state, getDefaultState());
		},
		updateThumbnail(state, payload) {
			let key = Object.keys(payload)[0];
			let intVal = payload[key].length === 0 ? 0 : parseInt(payload[key]);

			if (!("scroll" in payload)) {
				if (intVal !== NaN) payload[key] = intVal;
				else return;
			}

			state.settings = { ...state.settings, ...payload };
		},
	},
	actions: {},
	getters: {
		getThumbnailSettings: (state) => state.settings,
	},
};
