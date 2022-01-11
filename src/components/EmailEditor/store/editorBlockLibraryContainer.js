const getDefaultState = () => {
	return {
		blockLibsData: {},
	}
}

export default {
	state: getDefaultState(),
	mutations: {
		resetEditorBlockLibraryContainerState (state) {
			Object.assign(state, getDefaultState());
		},

		createBlockLibData(state, libId) {
			let obj = {};
			obj[libId] = new Array();

			state.blockLibsData = { ...state.blockLibsData, ...obj };
		},

		moveBlockLibData(state, { oldLibId, newLibId }) {
			let obj = {};
			obj[newLibId] = state.blockLibsData[oldLibId];

			delete state.blockLibsData[oldLibId];

			state.blockLibsData = { ...state.blockLibsData, ...obj };
		},

		deleteBlockLibData(state, libId) {
			delete state.blockLibsData[libId];
		},

		addBlockToLib(state, { libId, block }) {
			state.blockLibsData[libId].push(block);
		},

		renameBlock(state, { libId, block }) {
			state.blockLibsData[libId] = state.blockLibsData[libId].map((c) => {
				if (c._id === block._id) return { ...c, title: block.title };

				return c;
			});
		},

		deleteBlock(state, { libId, blockId }) {
			state.blockLibsData[libId] = state.blockLibsData[libId].filter(
				(c) => c._id !== blockId
			);
		},
	},
	actions: {},
	getters: {
		getBlocksById: (state) => (id) => {
			return state.blockLibsData[id];
		},
	},
};
