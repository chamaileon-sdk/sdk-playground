/* eslint-disable require-await */
/* eslint-disable no-shadow */
import BlockLibData from "./editorBlockLibraryContainer";
import Vue from "vue";

const getDefaultState = () => {
	return {
		key: 0,
		blKey: 0,
		ffKey: 0,
		tiID: 0,
		settings: {
			user: {
				enabled: true,
				name: "Your Username",
				avatar: "",
			},
			actionMenu: {
				block: {
					drag: true,
					save: true,
					duplicate: true,
					delete: true,
				},
			},
			toolboxes: {
				body: true,
				fullWidth: true,
				text: true,
				button: true,
				box: true,
				multiColumn: true,
				image: true,
				divider: true,
				code: true,
				social: true,
				column: true,
				loop: true,
				conditional: true,
				dynamicImage: true,
				video: true,
				blockLevelConditional: true,
				blockLevelLoop: true,
			},
			dropzones: {
				block: true,
			},
			fontFiles: {},
			fontStacks: [],
			hideDefaultFonts: false,
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
					video: false,
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
			staticAssetsBaseUrl: "https://yourdomain.com/path/to/static/assets/",
			videoElementBaseUrl: "https://video-demo.chamaileon.io/",
			autoSaveInterval: false,
		},
	};
};

export default {
	modules: {
		BlockLibData,
	},
	state: getDefaultState(),
	mutations: {
		resetEditorState(state) {
			Object.assign(state, getDefaultState());
		},

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
			const newObj = (({ index, ...payload }) => payload)(payload);
			const c = state.settings.buttons.header[payload.index];

			state.settings.buttons.header.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},

		// Dropdown
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
				1,
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
			const newObj = (({ index, ...payload }) => payload)(payload.obj);

			state.settings.buttons.header[payload.parentIndex].items.splice(
				payload.obj.index,
				1,
				{
					...state.settings.buttons.header[payload.parentIndex].items[
						payload.obj.index
					],
					...newObj,
				},
			);
		},

		updateEditorDropdownBtnOrder(state, payload) {
			state.settings.buttons.header[payload.parentIndex].items = payload.newArr;
		},

		// Elements
		toggleElement(state, payload) {
			state.settings.elements[payload.type][payload.element] =				!state.settings.elements[payload.type][payload.element];
		},

		// BlockLibs
		addBlockLibs(state) {
			state.settings.blockLibraries.push({
				id: `${state.blKey}`,
				label: `Block Library ${state.blKey}`,
				canDeleteBlock: false,
				canRenameBlock: false,
				canSaveBlock: true,
			});

			state.blKey++;
		},

		removeBlockLibs(state, index) {
			state.settings.blockLibraries.splice(index, 1);
		},

		updateBlockLibsOrder(state, payload) {
			state.settings.blockLibraries = payload;
		},

		updateBlockLibs(state, payload) {
			const newObj = (({ index, ...payload }) => payload)(payload);
			const c = state.settings.blockLibraries[payload.index];

			state.settings.blockLibraries.splice(payload.index, 1, {
				...c,
				...newObj,
			});
		},

		// Fontfiles
		addFontFile(state) {
			Vue.set(state.settings.fontFiles, `Font Family ${state.ffKey}`, ""); // eslint-disable-line
			state.ffKey++;
		},

		removeFontFile(state, fontName) {
			Vue.delete(state.settings.fontFiles, fontName);
		},

		updateFontFile(state, newFontFiles) {
			Vue.set(state.settings, "fontFiles", newFontFiles);
		},

		// FontStacks
		addFontStack(state) {
			state.settings.fontStacks.push([]);
		},

		removeFontStack(state, index) {
			state.settings.fontStacks.splice(index, 1);
		},

		async updateFontStack(state, { index, fontStackString }) {
			const fontStacks = state.settings.fontStacks;
			const newFontStack = fontStackString.split(",")
				.map(str => JSON.parse(JSON.stringify(str.trim())))
				.filter(x => !!x);
			fontStacks.splice(index, 1, newFontStack);
		},
		// HideDefaultFonts
		setHideDefaultFont(state, value) {
			Vue.set(state.settings, "hideDefaultFonts", value);
		},

		// Text insert
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
			const newObj = (({ index, ...payload }) => payload)(payload); // Separate other properties from index

			state.settings.buttons.textInsert = state.settings.buttons.textInsert.map(
				(c, i) => {
					if (i === payload.index) {
						return { ...c, ...newObj };
					}

					return c;
				},
			);
		},

		// Addons
		updateAddonState(state, payload) {
			const obj = state.settings.addons;
			for (const addon in obj) {
				if (obj[addon].id === payload.id) {
					// eslint-disable-next-line no-return-assign
					return (obj[addon].state = payload.state);
				}
			}
			return state;
		},

		// User
		updateUser(state, payload) {
			state.settings.user = { ...state.settings.user, ...payload };
		},

		// Autosave
		updateAutosave(state, payload) {
			const x = parseInt(payload);

			state.settings.autoSaveInterval = x >= 0 ? x : 0;
		},

		// Static Assets
		updateSaticAssets(state, url) {
			state.settings.staticAssetsBaseUrl = url;
		},

		// Toolboxes
		updateToolboxes(state, toolboxes) {
			state.settings.toolboxes = toolboxes;
		},

		// Block Action Menu
		updateBlockActionMenu(state, blockActionMenu) {
			state.settings.actionMenu.block = blockActionMenu;
		},

		// Block Dropzone
		updateBlockActionMenuDropzones(state, blockDropzone) {
			state.settings.actionMenu.dropzones.block = blockDropzone;
		},
		// Static Assets
		updateVideoElementBaseUrl(state, url) {
			state.videoElementBaseUrl = url;
		},
	},
	actions: {
		async updateEditorSettings({ getters, rootState }) {
			const settings = getters.getConfigObject.settings;
			while (rootState.emailEditorInited === "pending") {
				// eslint-disable-next-line no-await-in-loop
				await new Promise(resolve => setTimeout(resolve, 100));
			}
			if (rootState.emailEditorInited === true) {
				Vue.prototype.$chamaileon.emailEditor.methods.updateSettings(settings);
			}
		},
	},
	getters: {
		getHeaderBtns: (state) => {
			return state.settings.buttons.header;
		},
		getElements: (state) => {
			return state.settings.elements;
		},
		getBlockLibs: state => state.settings.blockLibraries,
		getFontFiles: state => state.settings.fontFiles,
		getFontStacks: state => state.settings.fontStacks,
		gethideDefaultFonts: state => state.settings.hideDefaultFonts,
		getAddonStateById: state => (id) => {
			const obj = state.settings.addons;
			for (const addon in obj) {
				if (obj[addon].id === id) return obj[addon].state;
			}

			return id;
		},
	},
};
