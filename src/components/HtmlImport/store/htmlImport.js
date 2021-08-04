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

			const genRequest = await fetch(
				"https://sdk-api.chamaileon.io/api/v1/emails/import",
				{
					method: "POST",
					headers: {
						Authorization: "Bearer Y8mbu7S5Qh4cyCqJCVBn",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						html: html,
					}),
				}
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
