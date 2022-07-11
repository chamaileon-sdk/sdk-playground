const getDefaultState = () => {
	return {
		fetchingJSON: false,
		settings: {
			replaceImages: {
				displayText: "Replace image URLs",
				value: true,
			},
			showReplaceSwitch: {
				displayText: "Show a toggle button to replace images",
				value: true,
			},
		},
	};
};

export default {
	state: getDefaultState(),
	mutations: {
		resetHtmlImportState(state) {
			Object.assign(state, getDefaultState());
		},

		toggleFetching(state) {
			state.fetchingJSON = !state.fetchingJSON;
		},

		updateHtmlImportSettings(state, payload) {
			state.settings[payload.key].value = payload.value;
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
	},
	getters: {
		getHtmlImportSettings(state) {
			return state.settings;
		},

		getJSONFetchStatus(state) {
			return state.fetchingJSON;
		},
	},
};
