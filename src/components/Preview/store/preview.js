import Vue from "vue";

/* eslint-disable no-shadow */
const getDefaultState = () => {
	return {
		key: 0,
		settings: {
			buttons: {
				header: [],
			},
			defaultView: "mobile",
			proxyImages: true,
		},
	};
};

export default {
	state: getDefaultState(),
	mutations: {
		resetPreviewState(state) {
			Object.assign(state, getDefaultState());
		},
		addPreviewBtn(state) {
			state.settings.buttons.header.push({
				id: `yourBtn-${state.key}`,
				type: "button",
				icon: "at",
				label: "",
				color: "#000000",
				style: "text",
			});

			state.key++;
		},
		removePreviewBtn(state, index) {
			state.settings.buttons.header.splice(index, 1);
		},
		updatePreviewBtnOrder(state, payload) {
			state.settings.buttons.header = payload;
		},
		updatePreviewBtn(state, payload) {
			const newObj = (({ index, ...payload }) => payload)(payload);
			const c = state.settings.buttons.header[payload.index];

			state.settings.buttons.header.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},
		// Dropdown
		addPreviewDropdown(state) {
			state.settings.buttons.header.push({
				id: `yourBtn-${state.key}`,
				type: "dropdown",
				icon: "at",
				label: "",
				color: "#000000",
				style: "text",
				items: [],
			});

			state.key++;
		},
		removePreviewDropdownBtn(state, payload) {
			state.settings.buttons.header[payload.parentIndex].items.splice(
				payload.obj.index,
				1,
			);
		},
		addPreviewDropdownBtn(state, index) {
			state.settings.buttons.header[index].items.push({
				id: `yourBtn-${state.key}`,
				icon: "at",
				label: "",
			});

			state.key++;
		},
		updatePreviewDropdownBtn(state, payload) {
			const newObj = (({ index, ...payload }) => payload)(payload.obj);

			state.settings.buttons.header[payload.parentIndex].items.splice(
				payload.obj.index,
				1,
				{
					...state.settings.buttons.header[payload.parentIndex].items[
						payload.obj.index
					],
					...newObj,
				},
			);
		},
		updatePreviewDropdownBtnOrder(state, payload) {
			state.settings.buttons.header[payload.parentIndex].items = payload.newArr;
		},
		setDefaultView(state, payload) {
			state.settings.defaultView = payload;
		},
		setProxyImagesOnPreview(state, payload) {
			state.settings.proxyImages = payload;
		},

	},
	actions: {
		async updatePreviewSettings({ getters, rootState }) {
			const settings = getters.getPreviewConfigObject.settings;
			while (rootState.emailPreviewInited === "pending") {
				await new Promise(resolve => setTimeout(resolve, 100));
			}
			if (rootState.emailPreviewInited === true) {
				Vue.prototype.$chamaileon.emailPreview.methods.updateSettings(settings);
			}
		},
	},
	getters: {
		getPreviewBtns: (state) => {
			return state.settings.buttons.header;
		},
		getDefaultView: (state) => {
			return state.settings.defaultView;
		},
	},
};
