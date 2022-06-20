import Vue from "vue";

const getDefaultState = () => {
	return {
		settings: {
			folderTree: {
				_id: "root",
				name: "root",
				children: [
					{
						_id: "16322284940689326",
						name: "Favorite Images",
					},
				],
			},
			selectedFolderId: "root",
			maxImagePerPage: 12,
			maxFileSize: 6,
		},
	};
};

export default {
	state: getDefaultState(),
	getters: {
		fullPathsToFoldersById(state) {
			const fullPathsToFoldersById = new Map();
			const parentsArray = [];

			const findParents = (node, array) => {
				const parents = [ ...array ];
				parents.push(node);
				fullPathsToFoldersById.set(
					node._id,
					[ ...parents ],
				);
				if (node.children && node.children.length > 0) {
					node.children.forEach((child) => {
						findParents(child, [ ...parents ]);
					});
				}
			};

			[ state.settings.folderTree ].forEach((node) => {
				findParents(node, parentsArray);
			});

			return fullPathsToFoldersById;
		},
	},
	mutations: {
		resetGalleryState(state) {
			Object.assign(state, getDefaultState());
		},
		setGallery(state, payload) {
			Object.entries(payload).forEach(([key, value]) => {
				state[key] = value;
			});
		},
		setSelectedFolderId(state, payload) {
			state.settings.selectedFolderId = payload;
		},
		setMaxFileSize(state, payload) {
			state.settings.maxFileSize = payload;
		},
		setMaxImagePerPage(state, payload) {
			state.settings.maxImagePerPage = payload;
		},
		setFolderTree(state, payload) {
			state.settings.folderTree = payload;
		},
	},
	actions: {
		async updateGallerySettings({ getters, rootState }) {
			const settings = getters.getGalleryConfigObject.settings;
			while (rootState.galleryInited === "pending") {
				await new Promise(resolve => setTimeout(resolve, 100));
			}
			if (rootState.galleryInited === true) {
				Vue.prototype.$chamaileon.gallery.methods.updateSettings(settings);
			}
		},
	},
};
