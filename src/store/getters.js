export default {
	getEmail: (state) => {
		return state.document;
	},
	getGalleryConfigObject: (state) => {
		const x = JSON.parse(JSON.stringify(state.megaGalleryConfig));
		return x;
	},
	getConfigObject: (state) => {
		// Deep copy
		const config = JSON.parse(JSON.stringify(state.editorConfig));
		delete config.BlockLibData;

		const currentElems = config.settings.elements;
		let keepElementsTab = false;

		for (const key in currentElems) {
			let keep = false;
			const obj = currentElems[key];
			for (const elem in obj) {
				keep = keep || obj[elem];
			}

			if (!keep) currentElems[key] = false;
			keepElementsTab = keepElementsTab || keep;
		}

		config.settings.elements = keepElementsTab ? currentElems : false;

		// Addons processing
		const addons = config.settings.addons;
		for (const key in addons) {
			switch (addons[key].state) {
				case "enabled":
					addons[key] = { enabled: true };
					break;
				case "disabled":
					addons[key] = { enabled: false };
					break;
				case "hidden":
					addons[key] = false;
					break;
				default:
					break;
			}
		}
		config.settings.addons = addons;

		// User processing
		if (!config.settings.user.enabled) config.user = false;

		// config.data = { document: state.document };
		// TODO: Variable Editor icon has to be mdi-*iconTitle*

		config.hooks = state.editorConfig.hooks;

		// TOOD: figure out static asset base url on the playground because for now it's not
		// passed to the editor
		// x.settings.staticAssetsBaseUrl = state.editorConfig.staticAssetsBaseUrl;

		config.settings.videoElementBaseUrl = state.editorConfig.videoElementBaseUrl;

		return config;
	},
	getVariableEditorConfigObject: (state) => {
		const config = {};

		const document = JSON.parse(JSON.stringify(state.document));

		config.data = { document }; // !important change we set data from now, not document

		config.settings = JSON.parse(
			JSON.stringify(state.variableEditorConfig.settings),
		);

		config.settings.buttons.header.left = [
			{ id: "close", label: "close", icon: "mdi-arrow-left" },
			...config.settings.buttons.header.left,
		];

		const tmpArr = [];

		config.settings.variablesToEdit.forEach((variable) => {
			if (variable.edit) tmpArr.push(variable.name);
		});

		config.settings.variablesToEdit = tmpArr;

		const editorConfig = JSON.parse(JSON.stringify(state.editorConfig));

		config.settings.fontStacks = editorConfig.settings.fontStacks;
		config.settings.hideDefaultFonts = editorConfig.settings.hideDefaultFonts;

		console.log(config);

		return config;
	},
	getPreviewConfigObject: (state) => {
		const config = {};
		const document = JSON.parse(JSON.stringify(state.document));

		config.data = { document }; // !important change we set data from now, not document
		config.settings = state.previewConfig.settings;

		return config;
	},
};
