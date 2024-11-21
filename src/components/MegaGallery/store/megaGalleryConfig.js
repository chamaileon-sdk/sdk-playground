import Vue from "vue";

const getDefaultState = () => {
	return {
		settings: {
			folderTree: {
				_id: "root",
				name: "root",
				canCreateSubfolder: true,
				children: [
					{
						_id: "16322284940689326",
						name: "Favorite Images",
						canCreateSubfolder: true,
						canRename: true,
						canDeleteImages: true,
						canEditImages: true,
						canCropImages: true,
						canRenameImages: true,
					},
				],
			},
			selectedFolderId: "root",
			maxImagePerPage: 12,
			maxFileSize: 6,
			panels: {
				stockPhotos: true,
			},
			uploadOptions: {
				url: true,
				file: true,
			},
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
		updateGalleryPanel(state, payload) {
			Vue.set(
				state.settings,
				"panels",
				{ ...state.settings.panels, ...payload },
			);
		},
		updateGalleryUploadOption(state, payload) {
			Vue.set(
				state.settings,
				"uploadOptions",
				{ ...state.settings.uploadOptions, ...payload },
			);
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
