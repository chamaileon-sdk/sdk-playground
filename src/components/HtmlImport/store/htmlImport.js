const getDefaultState = () => {
	return {
		key: 0,
		settings: {
			buttons: {
				header: [],
			},
			replaceImages: true,
			replaceImagesMessage: "Import images from your HTML into your gallery",
			showReplaceSwitch: true,
		},
	};
};

import Vue from "vue";

export default {
	state: getDefaultState(),
	mutations: {
		resetImportState(state) {
			Object.assign(state, getDefaultState());
		},
		toggleFetching(state) {
			state.fetchingJSON = !state.fetchingJSON;
		},
		updateImportSettings(state, payload) {
			state.settings[payload.key] = payload.value;
		},
		addImportBtn(state) {
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
		removeImportBtn(state, index) {
			state.settings.buttons.header.splice(index, 1);
		},
		updatePreviewBtnOrder(state, payload) {
			state.settings.buttons.header = payload;
		},
		updateImportBtn(state, payload) {
			const newObj = (({ index, ...obj }) => obj)(payload);
			const c = state.settings.buttons.header[payload.index];

			state.settings.buttons.header.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},
		// Dropdown
		addImportDropdown(state) {
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
		removeImportDropdownBtn(state, payload) {
			state.settings.buttons.header[payload.parentIndex].items.splice(
				payload.obj.index,
				1,
			);
		},
		addImportDropdownBtn(state, index) {
			state.settings.buttons.header[index].items.push({
				id: `yourBtn-${state.key}`,
				icon: "at",
				label: "",
			});

			state.key++;
		},
		updateImportDropdownBtn(state, payload) {
			const newObj = (({ index, ...obj }) => obj)(payload.obj);

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
		updateImportDropdownBtnOrder(state, payload) {
			state.settings.buttons.header[payload.parentIndex].items = payload.newArr;
		},
	},
	actions: {
		async fetchJSON({ commit }, html) {
			commit("toggleFetching");

			const { accessToken = "" } = JSON.parse(localStorage.getItem("chamaileonSdkAccessTokenCache"));

			const genRequest = await fetch(
				"https://sdk-api.chamaileon.io/api/v1/emails/import",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						html,
					}),
				},
			);

			if (!genRequest.ok) {
				throw new Error("Auth error");
			}

			const response = await genRequest.json();

			const json = response.result.document;

			if (json) {
				json.title = "Imported Document";
				json.variables = [];
				commit("updateDocument", json);
			}

			commit("toggleFetching");
		},
		async updateImportPluginSettings({ getters, rootState }) {
			const settings = getters.getImportConfigObject.settings;
			while (rootState.htmlImportInited === "pending") {
				await new Promise(resolve => setTimeout(resolve, 100));
			}
			if (rootState.htmlImportInited === true) {
				Vue.prototype.$chamaileon.htmlImport.methods.updateSettings(settings);
			}
		},
	},
	getters: {
		getImportBtns: (state) => {
			return state.settings.buttons.header;
		},
		getDefaultImportView: (state) => {
			return state.settings.defaultView;
		},
	},
};
