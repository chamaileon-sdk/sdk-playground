export default {
	state: () => ({
		key: 0,
		settings: {
			buttons: {
				header: [],
			},
		},
	}),
	mutations: {
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
			let newObj = (({ index, ...payload }) => payload)(payload);
			let c = state.settings.buttons.header[payload.index];

			state.settings.buttons.header.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},

		//Dropdown
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
				1
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
			let newObj = (({ index, ...payload }) => payload)(payload.obj);

			state.settings.buttons.header[payload.parentIndex].items.splice(
				payload.obj.index,
				1,
				{
					...state.settings.buttons.header[payload.parentIndex].items[
						payload.obj.index
					],
					...newObj,
				}
			);
		},

		updatePreviewDropdownBtnOrder(state, payload) {
			state.settings.buttons.header[payload.parentIndex].items = payload.newArr;
		},
	},
	actions: {},
	getters: {
		getPreviewBtns: (state) => {
			return state.settings.buttons.header;
		},
	},
};
