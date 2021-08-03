import BlockLibData from "./editorBlockLibraryContainer";

export default {
	modules: {
		BlockLibData,
	},
	state: () => ({
		key: 0,
		blKey: 0,
		tiID: 0,
		user: {
			enabled: true,
			name: "Your Username",
			avatar: "",
		},
		settings: {
			buttons: {
				header: [],
				textInsert: [],
			},
			elements: {
				content: {
					text: true,
					image: true,
					button: true,
					divider: true,
					social: false,
					code: false,
				},
				structure: {
					fullWidth: false,
					box: true,
					multiColumn: true,
				},
				advanced: {
					loop: true,
					conditional: true,
					dynamicImage: true,
				},
			},
		},
		blockLibraries: [],
		addons: {
			blockLock: {
				icon: "table-lock",
				id: "Block Lock",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sint exercitationem blanditiis vel facere consequuntur nisi mollitia magnam amet quibusdam tempore ullam quasi.",
				state: "disabled",
			},
			variableSystem: {
				icon: "iframe-variable-outline",
				id: "Variable System",
				description:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sint exercitationem blanditiis vel facere consequuntur nisi mollitia magnam amet quibusdam tempore ullam quasi.",
				state: "disabled",
			},
		},
		autoSaveInterval: 15000,
	}),
	mutations: {
		addEditorBtn(state) {
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
		removeEditorBtn(state, index) {
			state.settings.buttons.header.splice(index, 1);
		},
		updateEditorBtnOrder(state, payload) {
			state.settings.buttons.header = payload;
		},
		updateEditorBtn(state, payload) {
			let newObj = (({ index, ...payload }) => payload)(payload);
			let c = state.settings.buttons.header[payload.index];

			state.settings.buttons.header.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},

		//Dropdown
		addEditorDropdown(state) {
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

		removeEditorDropdownBtn(state, payload) {
			state.settings.buttons.header[payload.parentIndex].items.splice(
				payload.obj.index,
				1
			);
		},

		addEditorDropdownBtn(state, index) {
			state.settings.buttons.header[index].items.push({
				id: `yourBtn-${state.key}`,
				icon: "at",
				label: "",
			});

			state.key++;
		},

		updateEditorDropdownBtn(state, payload) {
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

		updateEditorDropdownBtnOrder(state, payload) {
			state.settings.buttons.header[payload.parentIndex].items = payload.newArr;
		},

		//Elements
		toggleElement(state, payload) {
			state.settings.elements[payload.type][payload.element] =
				!state.settings.elements[payload.type][payload.element];
		},

		//BlockLibs
		addBlockLibs(state) {
			state.blockLibraries.push({
				id: `${state.blKey}`,
				label: `Block Library ${state.blKey}`,
				canDeleteBlock: false,
				canRenameBlock: false,
				canSaveBlock: true,
			});

			state.blKey++;
		},

		removeBlockLibs(state, index) {
			state.blockLibraries.splice(index, 1);
		},

		updateBlockLibsOrder(state, payload) {
			state.blockLibraries = payload;
		},
		updateBlockLibs(state, payload) {
			let newObj = (({ index, ...payload }) => payload)(payload);
			let c = state.blockLibraries[payload.index];

			state.blockLibraries.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},

		//Text insert
		updateTextInsertOrder(state, payload) {
			state.settings.buttons.textInsert = payload;
		},

		deleteTextInsertButton(state, index) {
			state.settings.buttons.textInsert.splice(index, 1);
		},

		addTextInsertButton(state) {
			state.settings.buttons.textInsert.push({
				id: `ti-btn-${state.tiID}`,
				label: "Button",
				icon: "",
			});
			state.tiID++;
		},

		updateTextInsertButton(state, payload) {
			let newObj = (({ index, ...payload }) => payload)(payload); //Separate other properties from index

			state.settings.buttons.textInsert = state.settings.buttons.textInsert.map(
				(c, i) => {
					if (i === payload.index) {
						return { ...c, ...newObj };
					}

					return c;
				}
			);
		},

		//Addons
		updateAddonState(state, payload) {
			const obj = state.addons;
			for (const addon in obj) {
				if (obj[addon].id === payload.id)
					return (obj[addon].state = payload.state);
			}

			return state;
		},

		//User
		updateUser(state, payload) {
			state.user = { ...state.user, ...payload };
		},

		//Autosave
		updateAutosave(state, payload) {
			let x = parseInt(payload);

			state.autoSaveInterval = x >= 0 ? x : 0;
		},
	},
	actions: {},
	getters: {
		getHeaderBtns: (state) => {
			return state.settings.buttons.header;
		},
		getElements: (state) => {
			return state.settings.elements;
		},
		getBlockLibs: (state) => state.blockLibraries,
		getAddonStateById: (state) => (id) => {
			const obj = state.addons;
			for (const addon in obj) {
				if (obj[addon].id === id) return obj[addon].state;
			}

			return id;
		},
	},
};
