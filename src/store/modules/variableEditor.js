export default {
	state: () => ({
		id: 0,
		idArr: [],
		fid: 0,
		fidArr: [],
		tid: 0,
		tidArr: [],
		settings: {
			variablesToEdit: [],
			buttons: {
				header: {
					left: [],
					right: [],
				},
				footer: {
					left: [],
					right: [],
				},
				textInsertPlugin: [],
			},
		},
	}),
	mutations: {
		resetVariablesToEditArray(state, array) {
			state.settings.variablesToEdit = [];
			array.forEach((c) => {
				state.settings.variablesToEdit.push({
					name: c.name,
					edit: true,
				});
			});
		},

		addVariableToEdit(state, variable) {
			state.settings.variablesToEdit.push({
				name: variable,
				edit: true,
			});
		},

		toggleVariableToEdit(state, index) {
			state.settings.variablesToEdit[index].edit =
				!state.settings.variablesToEdit[index].edit;
		},

		//Left
		updateVariableEditorHeaderLeftOrder(state, payload) {
			state.settings.buttons.header.left = payload;
		},

		deleteVariableEditorHeaderLeftButton(state, payload) {
			state.settings.buttons.header.left =
				state.settings.buttons.header.left.filter((c) => c.id !== payload);

			state.idArr = state.idArr.filter((c) => c != payload);
		},

		addVariableEditorHeaderLeftButton(state) {
			state.settings.buttons.header.left.push({
				id: `ve-btn-${state.id}`,
				label: `Left ${state.id}`,
				icon: "",
			});
			state.idArr.push(`ve-btn-${state.id}`);
			state.id++;
		},

		updateVariableEditorHeaderLeftButton(state, payload) {
			state.settings.buttons.header.left =
				state.settings.buttons.header.left.map((c) => {
					if (c.id === payload.id) {
						if (payload.newID) {
							state.idArr = state.idArr.filter((c) => c !== payload.id);
							state.idArr.push(payload.newID);
							return { ...c, id: payload.newID };
						}

						return { ...c, ...payload };
					}

					return c;
				});
		},

		//Right
		updateVariableEditorHeaderRightOrder(state, payload) {
			state.settings.buttons.header.right = payload;
		},

		deleteVariableEditorHeaderRightButton(state, payload) {
			state.settings.buttons.header.right =
				state.settings.buttons.header.right.filter((c) => c.id !== payload);

			state.idArr = state.idArr.filter((c) => c != payload);
		},

		addVariableEditorHeaderRightButton(state) {
			state.settings.buttons.header.right.push({
				id: `ve-btn-${state.id}`,
				label: `Right ${state.id}`,
				icon: "",
			});
			state.idArr.push(`ve-btn-${state.id}`);
			state.id++;
		},

		updateVariableEditorHeaderRightButton(state, payload) {
			state.settings.buttons.header.right =
				state.settings.buttons.header.right.map((c) => {
					if (c.id === payload.id) {
						if (payload.newID) {
							state.idArr = state.idArr.filter((c) => c !== payload.id);
							state.idArr.push(payload.newID);
							return { ...c, id: payload.newID };
						}

						return { ...c, ...payload };
					}

					return c;
				});
		},

		//Footer left
		updateVariableEditorFooterLeftOrder(state, payload) {
			state.settings.buttons.footer.left = payload;
		},

		deleteVariableEditorFooterLeftButton(state, payload) {
			state.settings.buttons.footer.left =
				state.settings.buttons.footer.left.filter((c) => c.id !== payload);

			state.fidArr = state.fidArr.filter((c) => c != payload);
		},

		addVariableEditorFooterLeftButton(state) {
			state.settings.buttons.footer.left.push({
				id: `vf-btn-${state.fid}`,
				label: `Left ${state.fid}`,
				icon: "",
			});
			state.fidArr.push(`vf-btn-${state.fid}`);
			state.fid++;
		},

		updateVariableEditorFooterLeftButton(state, payload) {
			state.settings.buttons.footer.left =
				state.settings.buttons.footer.left.map((c) => {
					if (c.id === payload.id) {
						if (payload.newID) {
							state.fidArr = state.fidArr.filter((c) => c !== payload.id);
							state.fidArr.push(payload.newID);
							return { ...c, id: payload.newID };
						}

						return { ...c, ...payload };
					}

					return c;
				});
		},

		updateVariableEditorFooterRightOrder(state, payload) {
			state.settings.buttons.footer.right = payload;
		},

		deleteVariableEditorFooterRightButton(state, payload) {
			state.settings.buttons.footer.right =
				state.settings.buttons.footer.right.filter((c) => c.id !== payload);

			state.fidArr = state.fidArr.filter((c) => c != payload);
		},

		addVariableEditorFooterRightButton(state) {
			state.settings.buttons.footer.right.push({
				id: `vf-btn-${state.fid}`,
				label: `Right ${state.fid}`,
				icon: "",
			});
			state.fidArr.push(`vf-btn-${state.fid}`);
			state.fid++;
		},

		updateVariableEditorFooterRightButton(state, payload) {
			state.settings.buttons.footer.right =
				state.settings.buttons.footer.right.map((c) => {
					if (c.id === payload.id) {
						if (payload.newID) {
							state.fidArr = state.fidArr.filter((c) => c !== payload.id);
							state.fidArr.push(payload.newID);
							return { ...c, id: payload.newID };
						}

						return { ...c, ...payload };
					}

					return c;
				});
		},

		//Text Insert
		updateVETextInsertOrder(state, payload) {
			state.settings.buttons.textInsertPlugin = payload;
		},

		deleteVETextInsertButton(state, index) {
			state.settings.buttons.textInsertPlugin.splice(index, 1);
		},

		addVETextInsertButton(state) {
			state.settings.buttons.textInsertPlugin.push({
				id: `ti-btn-${state.tid}`,
				label: "Button",
				icon: "",
			});
			state.tid++;
		},

		updateVETextInsertButton(state, payload) {
			let newObj = (({ index, ...payload }) => payload)(payload);
			let c = state.settings.buttons.textInsertPlugin[payload.index];

			state.settings.buttons.textInsertPlugin.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},
	},
	actions: {},
	getters: {
		headerButtons: (state) => state.settings.buttons.header,
		footerButtons: (state) => state.settings.buttons.footer,
	},
};
