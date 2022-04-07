/* eslint-disable no-shadow */
import Vue from "vue";

const getDefaultState = () => {
	return {
		id: 0,
		idArr: [],
		fid: 0,
		fidArr: [],
		tid: 0,
		settings: {
			hideHeader: false,
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
	};
};

export default {
	state: getDefaultState(),
	mutations: {
		resetVariableEditorState(state) {
			Object.assign(state, getDefaultState());
		},
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
			state.settings.variablesToEdit[index].edit =				!state.settings.variablesToEdit[index].edit;
		},

		// Left
		updateVariableEditorHeaderLeftOrder(state, payload) {
			state.settings.buttons.header.left = payload;
		},

		deleteVariableEditorHeaderLeftButton(state, index) {
			state.settings.buttons.header.left.splice(index, 1);
		},

		addVariableEditorHeaderLeftButton(state) {
			state.settings.buttons.header.left.push({
				id: `ve-btn-${state.id}`,
				label: `Left ${state.id}`,
				icon: "",
			});
			state.id++;
		},

		updateVariableEditorHeaderLeftButton(state, payload) {
			const newObj = (({ index, ...payload }) => payload)(payload);
			const c = state.settings.buttons.header.left[payload.index];

			state.settings.buttons.header.left.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},

		// Right
		updateVariableEditorHeaderRightOrder(state, payload) {
			state.settings.buttons.header.right = payload;
		},

		deleteVariableEditorHeaderRightButton(state, index) {
			state.settings.buttons.header.right.splice(index, 1);
		},

		addVariableEditorHeaderRightButton(state) {
			state.settings.buttons.header.right.push({
				id: `ve-btn-${state.id}`,
				label: `Right ${state.id}`,
				icon: "",
			});
			state.id++;
		},

		updateVariableEditorHeaderRightButton(state, payload) {
			const newObj = (({ index, ...payload }) => payload)(payload);
			const c = state.settings.buttons.header.right[payload.index];

			state.settings.buttons.header.right.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},

		// Footer left
		updateVariableEditorFooterLeftOrder(state, payload) {
			state.settings.buttons.footer.left = payload;
		},

		deleteVariableEditorFooterLeftButton(state, index) {
			state.settings.buttons.footer.left.splice(index, 1);
		},

		addVariableEditorFooterLeftButton(state) {
			state.settings.buttons.footer.left.push({
				id: `vf-btn-${state.fid}`,
				label: `Left ${state.fid}`,
				icon: "",
			});
			state.fid++;
		},

		updateVariableEditorFooterLeftButton(state, payload) {
			const newObj = (({ index, ...payload }) => payload)(payload);
			const c = state.settings.buttons.footer.left[payload.index];

			state.settings.buttons.footer.left.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},

		updateVariableEditorFooterRightOrder(state, payload) {
			state.settings.buttons.footer.right = payload;
		},

		deleteVariableEditorFooterRightButton(state, index) {
			state.settings.buttons.footer.right.splice(index, 1);
		},

		addVariableEditorFooterRightButton(state) {
			state.settings.buttons.footer.right.push({
				id: `vf-btn-${state.fid}`,
				label: `Right ${state.fid}`,
				icon: "",
			});
			state.fid++;
		},

		updateVariableEditorFooterRightButton(state, payload) {
			const newObj = (({ index, ...payload }) => payload)(payload);
			const c = state.settings.buttons.footer.right[payload.index];

			state.settings.buttons.footer.right.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},

		// Text Insert
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
			const newObj = (({ index, ...payload }) => payload)(payload);
			const c = state.settings.buttons.textInsertPlugin[payload.index];

			state.settings.buttons.textInsertPlugin.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},
	},
	getters: {
		headerButtons: state => state.settings.buttons.header,
		footerButtons: state => state.settings.buttons.footer,
	},
	actions: {
		async updateVariableEditorSettings({ getters, rootState }) {
			const settings = getters.getVariableEditorConfigObject.settings;
			while (rootState.variableEditorInited === "pending") {
				// eslint-disable-next-line no-await-in-loop
				await new Promise(resolve => setTimeout(resolve, 100));
			}
			if (rootState.variableEditorInited === true) {
				Vue.prototype.$chamaileon.variableEditor.methods.updateSettings(settings);
			}
		},
	},
};
