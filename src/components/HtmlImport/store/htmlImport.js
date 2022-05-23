export default {
	state: () => ({
		fetchingJSON: false,
	}),
	mutations: {
		toggleFetching(state) {
			state.fetchingJSON = !state.fetchingJSON;
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
		getJSONFetchStatus(state) {
			return state.fetchingJSON;
		},
	},
};
