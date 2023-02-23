export default {
	getEmail: (state) => {
		return state.document;
	},
	getGalleryConfigObject: (state) => {
		const x = JSON.parse(JSON.stringify(state.megaGalleryConfig));
		return x;
	},
	getEditorConfigObject: (state) => {
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
					addons[key] = { enabled: true, disabledReason: "" };
					break;
				case "disabled":
					if (addons[key].disabledReason) {
						addons[key] = { enabled: false, disabledReason: addons[key].disabledReason };
					} else {
						addons[key] = { enabled: false, disabledReason: "" };
					}
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
		if (!config.settings.user.enabled) config.settings.user = false;

		const document = JSON.parse(JSON.stringify(state.document));

		config.data = { document };

		config.hooks = state.editorConfig.hooks;

		return config;
	},
	getVariableEditorConfigObject: (state) => {
		const config = {};

		const document = JSON.parse(JSON.stringify(state.document));

		config.data = { document };

		config.settings = JSON.parse(
			JSON.stringify(state.variableEditorConfig.settings),
		);

		config.settings.buttons.header.left = [
			{ id: "close", icon: "arrow-left", color: "#000", label: "", style: "text" },
			...config.settings.buttons.header.left,
		];

		const tmpArr = [];

		config.settings.variablesToEdit.forEach((variable) => {
			if (variable.edit) tmpArr.push(variable.name);
		});

		config.settings.variablesToEdit = tmpArr;

		return config;
	},
	getPreviewConfigObject: (state) => {
		const config = {};
		const document = JSON.parse(JSON.stringify(state.document));

		config.data = { document };
		config.settings = state.previewConfig.settings;

		return config;
	},
	getImportPluginConfigObject: (state) => {
		return JSON.parse(JSON.stringify(state.importPluginConfig));
	},
};
