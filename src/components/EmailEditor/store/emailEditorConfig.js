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
				typedText: true,
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
				header: [
					{
						id: "preview",
						type: "button",
						icon: "eye",
						label: "Preview",
						color: "#D0021B",
						style: "outlined",
					},
				],
				textInsert: [],
				inlineHeader: {
					undo: {
						title: "",
						visible: true,
					},
					redo: {
						title: "",
						visible: true,
					},
					save: {
						title: "",
						visible: true,
					},
					zoom: {
						title: "",
						visible: true,
					},
				},
				inlineTextInsert: {
					videoAlt: {
						id: "video-alt",
						title: "",
						icon: "code-braces",
						visible: true,
					},
					imageAlt: {
						id: "image-alt",
						title: "",
						icon: "code-braces",
						visible: true,
					},
					imageLink: {
						id: "image-link",
						title: "",
						icon: "code-braces",
						visible: true,
					},
					imageLinkTitle: {
						id: "image-link-title",
						title: "",
						icon: "code-braces",
						visible: true,
					},
					dynamicImageAlt: {
						id: "dynamic-image-alt",
						title: "",
						icon: "code-braces",
						visible: true,
					},
					dynamicImageSrc: {
						id: "dynamic-image-src",
						title: "",
						icon: "code-braces",
						visible: true,
					},
					dynamicImageLink: {
						id: "dynamic-image-link",
						title: "",
						icon: "code-braces",
						visible: true,
					},
					dynamicImageLinkTitle: {
						id: "dynamic-image-link-title",
						title: "",
						icon: "code-braces",
						visible: true,
					},
					buttonLink: {
						id: "button-link",
						title: "",
						icon: "code-braces",
						visible: true,
					},
					buttonLinkTitle: {
						id: "button-link-title",
						title: "",
						icon: "code-braces",
						visible: true,
					},
				},
				cKEditorTextInsert: {
					textLink: {
						id: "text-link",
						title: "",
						label: "{}",
						visible: true,
					},
					textVariableLink: {
						id: "text-variable-link",
						title: "",
						label: "{}",
						visible: true,
					},
				},
			},
			elements: {
				content: {
					title: true,
					paragraph: true,
					list: true,
					text: false,
					image: true,
					button: true,
					divider: true,
					social: false,
					video: false,
				},
				structure: {
					fullWidth: false,
					box: true,
					multiColumn: true,
				},
				advanced: {
					code: false,
					loop: true,
					conditional: true,
					dynamicImage: true,
					blockLevelConditional: true,
					blockLevelLoop: true,
				},
			},
			variables: {
				text: {
					canAdd: true,
					canEdit: true,
					canDelete: true,
					canReplaceAll: true,
					canRemoveAll: true,
				},
				image: {
					canAdd: true,
					canEdit: true,
					canDelete: true,
					canReplaceAll: true,
					canRemoveAll: true,
				},
				color: {
					canAdd: true,
					canEdit: true,
					canDelete: true,
					canReplaceAll: true,
					canRemoveAll: true,
				},
				fontStack: {
					canAdd: true,
					canEdit: true,
					canDelete: true,
					canReplaceAll: true,
					canRemoveAll: true,
				},
				link: {
					canAdd: true,
					canEdit: true,
					canDelete: true,
					canReplaceAll: true,
					canRemoveAll: true,
				},
			},
			components: {
				image: {
					canAdd: true,
					canDelete: true,
					canSave: true,
					canEdit: true,
					canReset: true,
					canDetach: true,
					canDetachAll: true,
					canReplaceAll: true,
					canRestore: true,
				},
				typedText: {
					canAdd: true,
					canDelete: true,
					canSave: true,
					canEdit: true,
					canReset: true,
					canDetach: true,
					canDetachAll: true,
					canReplaceAll: true,
					canRestore: true,
				},
				video: {
					canAdd: true,
					canDelete: true,
					canSave: true,
					canEdit: true,
					canReset: true,
					canDetach: true,
					canDetachAll: true,
					canReplaceAll: true,
					canRestore: true,
				},
				button: {
					canAdd: true,
					canDelete: true,
					canSave: true,
					canEdit: true,
					canReset: true,
					canDetach: true,
					canDetachAll: true,
					canReplaceAll: true,
					canRestore: true,
				},
				divider: {
					canAdd: true,
					canDelete: true,
					canSave: true,
					canEdit: true,
					canReset: true,
					canDetach: true,
					canDetachAll: true,
					canReplaceAll: true,
					canRestore: true,
				},
			},
			elementDefaults: {
				attrs: {
					text: {
						text: "<p>Double click to edit text!</p>",
					},
					typedText: {
						text: "Double click to edit typed text!",
					},
					button: {
						text: "<p>Click here to edit me</p>",
					},
				},
			},
			panels: {
				details: null,
			},
			blockLibraries: [],
			addons: {
				componentSystem: {
					id: "Component System",
					state: "disabled",
					disabledReason: "This addon is disabled",
					behaviorDescription: "description of the current behavior",
					behavior: "nested",
				},
				blockLock: {
					icon: "table-lock",
					id: "Block Lock",
					state: "disabled",
					disabledReason: "This addon is disabled",
				},
				variableSystem: {
					icon: "iframe-variable-outline",
					id: "Variable System",
					state: "disabled",
					disabledReason: "This addon is disabled",
				},
			},
			title: {
				canEdit: true,
			},
			staticAssetsBaseUrl: "https://cdn.chamaileon.io/assets/",
			videoElementBaseUrl: "https://video-demo.chamaileon.io/",
			autoSaveInterval: 15000,
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
					...state.settings.buttons.header[payload.parentIndex].items[payload.obj.index],
					...newObj,
				},
			);
		},

		updateEditorDropdownBtnOrder(state, payload) {
			state.settings.buttons.header[payload.parentIndex].items = payload.newArr;
		},

		// Elements
		toggleElement(state, payload) {
			state.settings.elements[payload.type][payload.element] = !state.settings.elements[payload.type][payload.element];
		},
		// BlockLibs
		addBlockLibs(state) {
			state.settings.blockLibraries.push({
				id: `${state.blKey}`,
				label: `Block Library ${state.blKey}`,
				canDeleteBlock: false,
				canRenameBlock: false,
				canSaveBlock: true,
				useBlockTitleAsMarker: true,
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

		// FontFiles
		addFontFileToEditorConfig(state) {
			Vue.set(state.settings.fontFiles, `Font Family ${state.ffKey}`, "");
			state.ffKey++;
		},

		removeFontFileFromEditorConfig(state, fontName) {
			Vue.delete(state.settings.fontFiles, fontName);
		},

		updateFontFileInEditorConfig(state, newFontFiles) {
			Vue.set(state.settings, "fontFiles", newFontFiles);
		},

		// FontStacks
		addFontStackToEditorConfig(state) {
			state.settings.fontStacks.push([]);
		},

		removeFontStackFromEditorConfig(state, index) {
			state.settings.fontStacks.splice(index, 1);
		},

		updateFontStackInEditorConfig(state, { index, fontStackString }) {
			const fontStacks = state.settings.fontStacks;
			const newFontStack = fontStackString.split(",")
				.map(str => JSON.parse(JSON.stringify(str.trim())))
				.filter(x => !!x);
			fontStacks.splice(index, 1, newFontStack);
		},
		// HideDefaultFonts
		setHideDefaultFontInEditorConfig(state, value) {
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

		updateInlineTextInsertButton(state, payload) {
			Vue.set(state.settings.buttons.inlineTextInsert[payload.key], payload.target, payload.content);
		},

		updateInlineHeaderButton(state, payload) {
			Vue.set(state.settings.buttons.inlineHeader[payload.key], payload.target, payload.content);
		},

		updateCKEditorTextInsertButton(state, payload) {
			Vue.set(state.settings.buttons.cKEditorTextInsert[payload.key], payload.target, payload.content);
		},

		// Addons
		updateAddonState(state, payload) {
			const obj = state.settings.addons;
			for (const addon in obj) {
				if (obj[addon].id === payload.id) {
					obj[addon][payload.key] = payload.value;
				}
			}
			if (payload.id === "Component System"
				&& payload.key === "state"
				&& (payload.value === "enabled" || payload.value === "disabled")
				&& state.settings.elements.content?.text) {
				Vue.set(state.settings.elements.content, "text", false);
			}
			return state;
		},

		updateAddonDisabledState(state, payload) {
			Vue.set(state.settings.addons[payload.name], "disabledReason", payload.value);
		},

		// User
		updateUser(state, payload) {
			Vue.set(state.settings, "user", { ...state.settings.user, ...payload });
		},

		// Autosave
		updateAutoSave(state, payload) {
			const x = parseInt(payload);

			state.settings.autoSaveInterval = x >= 0 ? x : 0;
		},

		// Static Assets
		updateStaticAssets(state, url) {
			state.settings.staticAssetsBaseUrl = url;
		},

		// Toolboxes
		updateToolboxes(state, toolbox) {
			Vue.set(
				state.settings,
				"toolboxes",
				{ ...state.settings.toolboxes, ...toolbox },
			);
		},

		// Block Action Menu
		updateBlockActionMenu(state, blockActionMenu) {
			Vue.set(
				state.settings.actionMenu,
				"block",
				{ ...state.settings.actionMenu.block, ...blockActionMenu },
			);
		},

		// Block Dropzone
		updateDropZones(state, dropZone) {
			Vue.set(
				state.settings,
				"dropzones",
				{ ...state.settings.dropZone, ...dropZone },
			);
		},

		// Panels
		updatePanels(state, panel) {
			Vue.set(
				state.settings,
				"panels",
				{ ...state.settings.panels, ...panel },
			);
		},

		// Title
		updateTitle(state, payload) {
			Vue.set(
				state.settings,
				"title",
				{ ...state.settings.title, ...payload },
			);
		},

		// Video element url
		updateVideoElementBaseUrl(state, url) {
			Vue.set(state.settings, "videoElementBaseUrl", url);
		},

		// Variables
		updateVariablePermissions(state, payload) {
			Vue.set(state.settings.variables[payload.variableTypeName], payload.name, payload.value);
		},

		// Components
		updateComponentPermissions(state, payload) {
			const { componentTypeName, name, value } = payload;
			Vue.set(state.settings.components[componentTypeName], name, value);
		},

		// text element default text
		updateTextElementDefaultText(state, payload) {
			Vue.set(state.settings.elementDefaults.attrs.text, "text", payload);
		},

		// typed text element default text
		updateTypedTextElementDefaultText(state, payload) {
			Vue.set(state.settings.elementDefaults.attrs.typedText, "text", payload);
		},

		// button element default text
		updateButtonElementDefaultText(state, payload) {
			Vue.set(state.settings.elementDefaults.attrs.button, "text", payload);
		},
	},
	actions: {
		async updateEditorSettings({ getters, rootState }) {
			const settings = JSON.parse(JSON.stringify(getters.getEditorConfigObject.settings));
			while (rootState.emailEditorInited === "pending") {
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
		getHideDefaultFonts: state => state.settings.hideDefaultFonts,
		getAddonStateById: state => (id) => {
			const obj = state.settings.addons;
			for (const addon in obj) {
				if (obj[addon].id === id) return obj[addon].state;
			}

			return id;
		},
	},
};
