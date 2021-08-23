export default function (config) {
	console.log(config)
	return `const editorInstance = await chamaileonPlugins.editEmail({
	document: emailDocument, // see "document" tab
	settings: {
		buttons: {
			header: ${calculateHeader(config)}
			textInsert: ${calculateTextInsert(config)}
		},
		elements: ${calculateElements(config)},
		blockLibraries: ${calculateBlockLibs(config)},
		fontFiles: ${JSON.stringify(config.settings.fontFiles, null, "\t\t\t")},
		fontStacks: ${JSON.stringify(config.settings.fontStacks)},
		hideDefaultFonts: ${JSON.stringify(config.settings.hideDefaultFonts)},
		addons: {
			blockLock: ${calculateBL(config)},
			variableSystem: ${calculateVE(config)}
		},
		staticAssetsBaseUrl: "${config.staticAssetsBaseUrl}",
	},
	autoSaveInterval: ${config.autoSaveInterval},
	user: ${
	config.user
		? `{
		name: "${config.user.name}",
		avatar: "${config.user.avatar}"
	}`
		: "false"
},
	hooks: emailEditorHooks, //see "hooks" tab
});`;
}

const calculateHeader = (config) => {
	let literal = "";
	let arr = config.settings.buttons.header;

	if (arr.length === 0) return "[]";

	literal += "[\n";
	arr.forEach((c, i) => {
		literal += "\t\t\t\t{\n";
		literal += c.type === "button" ? `\t\t\t\t\tid: "${c.id}",\n` : "";
		literal += `\t\t\t\t\ticon: "${c.icon}",\n`;
		literal += `\t\t\t\t\tlabel: "${c.label}",\n`;
		literal += `\t\t\t\t\tcolor: "${c.color}",\n`;
		literal += `\t\t\t\t\tstyle: "${c.style}"`;
		literal += c.items
			? `,\n\t\t\t\t\titems: ${calculateDDItems(c.items)}\n`
			: ",\n";
		literal += "\t\t\t\t}";
		literal += i === arr.length - 1 ? "," : ",\n";
	});
	literal += "\n\t\t\t],";

	return literal;
};

const calculateDDItems = (arr) => {
	if (arr.length === 0) return "[]";

	let literal = "";

	literal += "[\n";

	arr.forEach((c, i) => {
		literal += "\t\t\t\t\t\t{\n";
		literal += `\t\t\t\t\t\t\tid: "${c.id}",\n`;
		literal += `\t\t\t\t\t\t\tlabel: "${c.label}",\n`;
		literal += `\t\t\t\t\t\t\ticon: "${c.icon}",\n`;
		literal += "\t\t\t\t\t\t}";
		literal += i === arr.length - 1 ? "," : ",\n";
	});

	literal += "\n\t\t\t\t\t],";

	return literal;
};

const calcualteConfig = (config) => {
	if (!config.settings.elements.content) return "false";

	return `{
				text: ${config.settings.elements.content.text},
				image: ${config.settings.elements.content.image},
				button: ${config.settings.elements.content.button},
				divider: ${config.settings.elements.content.divider},
				social: ${config.settings.elements.content.social},
				code:  ${config.settings.elements.content.code},
			},`;
};

const calcualteStructure = (config) => {
	if (!config.settings.elements.structure) return "false";

	return `{
				fullWidth: ${config.settings.elements.structure.fullWidth},
				box: ${config.settings.elements.structure.box},
				multiColumn: ${config.settings.elements.structure.multiColumn},
			},`;
};

const calcualteAdvanced = (config) => {
	if (!config.settings.elements.advanced) return "false";

	return `{
				loop: ${config.settings.elements.advanced.loop},
				conditional: ${config.settings.elements.advanced.conditional},
				dynamicImage: ${config.settings.elements.advanced.dynamicImage},
			},`;
};

const calculateElements = (config) => {
	if (!config.settings.elements) return "false";

	return `{
			content: ${calcualteConfig(config)}
			structure: ${calcualteStructure(config)}
			advanced: ${calcualteAdvanced(config)}
		}`;
};

const calculateBL = (config) => {
	if (!config.addons.blockLock) return "false";

	return `{
				enabled: ${config.addons.blockLock.enabled},
			}`;
};

const calculateVE = (config) => {
	if (!config.addons.variableSystem) return "false,";

	return `{
				enabled: ${config.addons.variableSystem.enabled},
			},`;
};

const calculateBlockLibs = (config) => {
	let literal = "";
	let arr = config.blockLibraries;

	if (arr.length === 0) return "[]";

	literal += "[";
	arr.forEach((c) => {
		literal += `
			{
				id: "${c.id}",
				label: "${c.label}",
				canDeleteBlock: ${c.canDeleteBlock},
				canRenameBlock: ${c.canRenameBlock},
				canSaveBlock: ${c.canSaveBlock},
			},`;
	});
	literal += "\n\t\t]";
	return literal;
};

const calculateTextInsert = (config) => {
	let literal = "";
	let arr = config.settings.buttons.textInsert;

	if (arr.length === 0) return "[]";

	literal += "[\n";

	arr.forEach((c, i) => {
		literal += "\t\t\t\t{\n";
		literal += `\t\t\t\t\tid: "${c.id}",\n`;
		literal += `\t\t\t\t\tlabel: "${c.label}",\n`;
		literal += `\t\t\t\t\ticon: "${c.icon}",\n`;
		literal += "\t\t\t\t}";
		literal += i === arr.length - 1 ? "," : ",\n";
	});

	literal += "\n\t\t\t],";

	return literal;
};
