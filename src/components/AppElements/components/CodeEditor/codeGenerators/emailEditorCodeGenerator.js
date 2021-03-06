const calculatePreviewDDItems = (arr, indent) => {
	if (arr.length === 0) return "[],";

	let literal = "";

	literal += "[\n";

	arr.forEach((item) => {
		literal += `${"\t".repeat(indent)}{\n`;
		literal += `${"\t".repeat(indent + 1)}id: "${item.id}",\n`;
		literal += `${"\t".repeat(indent + 1)}label: "${item.label}",\n`;
		literal += `${"\t".repeat(indent + 1)}icon: "${item.icon}",\n`;
		literal += `${"\t".repeat(indent)}},`;
	});

	literal += `\n${"\t".repeat(indent - 1)}],`;
	return literal;
};

const calculateHeader = (previewConfig, indent) => {
	let literal = "";
	const arr = previewConfig.settings.buttons.header;

	if (arr.length === 0) return "[],";

	literal += "[\n";
	arr.forEach((item) => {
		literal += `${"\t".repeat(indent)}{\n`;
		literal += item.type === "button" ? `${"\t".repeat(indent + 1)}id: "${item.id}",\n` : "";
		literal += `${"\t".repeat(indent + 1)}icon: "${item.icon}",\n`;
		literal += `${"\t".repeat(indent + 1)}label: "${item.label}",\n`;
		literal += `${"\t".repeat(indent + 1)}color: "${item.color}",\n`;
		literal += `${"\t".repeat(indent + 1)}style: "${item.style}"`;
		literal += item.items
			? `,\n${"\t".repeat(indent + 1)}items: ${calculatePreviewDDItems(item.items, indent + 2)}\n`
			: ",\n";
		literal += `${"\t".repeat(indent)}},\n`;
	});
	literal += `${"\t".repeat(indent - 1)}],`;

	return literal;
};

const calculateConfig = (editorConfig, indent) => {
	if (!editorConfig.settings.elements.content) return "false,";

	return `{
${"\t".repeat(indent)}text: ${editorConfig.settings.elements.content.text},
${"\t".repeat(indent)}image: ${editorConfig.settings.elements.content.image},
${"\t".repeat(indent)}button: ${editorConfig.settings.elements.content.button},
${"\t".repeat(indent)}divider: ${editorConfig.settings.elements.content.divider},
${"\t".repeat(indent)}social: ${editorConfig.settings.elements.content.social},
${"\t".repeat(indent)}video:  ${editorConfig.settings.elements.content.video},
${"\t".repeat(indent - 1)}},`;
};

const calculateStructure = (editorConfig, indent) => {
	if (!editorConfig.settings.elements.structure) return "false,";

	return `{
${"\t".repeat(indent)}fullWidth: ${editorConfig.settings.elements.structure.fullWidth},
${"\t".repeat(indent)}box: ${editorConfig.settings.elements.structure.box},
${"\t".repeat(indent)}multiColumn: ${editorConfig.settings.elements.structure.multiColumn},
${"\t".repeat(indent - 1)}},`;
};

const calculateAdvanced = (editorConfig, indent) => {
	if (!editorConfig.settings.elements.advanced) return "false,";

	return `{
${"\t".repeat(indent)}code:  ${editorConfig.settings.elements.advanced.code},
${"\t".repeat(indent)}loop: ${editorConfig.settings.elements.advanced.loop},
${"\t".repeat(indent)}conditional: ${editorConfig.settings.elements.advanced.conditional},
${"\t".repeat(indent)}dynamicImage: ${editorConfig.settings.elements.advanced.dynamicImage},
${"\t".repeat(indent - 1)}},`;
};

const calculateElements = (editorConfig, indent) => {
	if (!editorConfig.settings.elements) return "false,";

	return `{
${"\t".repeat(indent)}content: ${calculateConfig(editorConfig, indent + 1)}
${"\t".repeat(indent)}structure: ${calculateStructure(editorConfig, indent + 1)}
${"\t".repeat(indent)}advanced: ${calculateAdvanced(editorConfig, indent + 1)}
${"\t".repeat(indent - 1)}},`;
};

const calculateBL = (editorConfig, indent) => {
	if (!editorConfig.settings.addons.blockLock) return "false,";

	return `{
${"\t".repeat(indent)}enabled: ${editorConfig.settings.addons.blockLock.enabled},
${"\t".repeat(indent - 1)}}`;
};

const calculateVE = (editorConfig, indent) => {
	if (!editorConfig.settings.addons.variableSystem) return "false,";

	return `{
${"\t".repeat(indent)}enabled: ${editorConfig.settings.addons.variableSystem.enabled},
${"\t".repeat(indent - 1)}},`;
};

const calculateBlockLibs = (editorConfig, indent) => {
	let literal = "";
	const arr = editorConfig.settings.blockLibraries;

	if (arr.length === 0) return "[],";

	literal += "[\n";
	arr.forEach((c) => {
		literal += `${"\t".repeat(indent)}{
${"\t".repeat(indent + 1)}id: "${c.id}",
${"\t".repeat(indent + 1)}label: "${c.label}",
${"\t".repeat(indent + 1)}canDeleteBlock: ${c.canDeleteBlock},
${"\t".repeat(indent + 1)}canRenameBlock: ${c.canRenameBlock},
${"\t".repeat(indent + 1)}canSaveBlock: ${c.canSaveBlock},
${"\t".repeat(indent)}},`;
	});
	literal += `\n${"\t".repeat(indent - 1)}],`;
	return literal;
};

const calculateTextInsert = (editorConfig, indent) => {
	let literal = "";
	const arr = editorConfig.settings.buttons.textInsert;

	if (arr.length === 0) return "[],";

	literal += "[\n";

	arr.forEach((c) => {
		literal += `${"\t".repeat(indent)}{\n`;
		literal += `${"\t".repeat(indent + 1)}id: "${c.id}",\n`;
		literal += `${"\t".repeat(indent + 1)}label: "${c.label}",\n`;
		literal += `${"\t".repeat(indent + 1)}ticon: "${c.icon}",\n`;
		literal += `${"\t".repeat(indent)}},`;
	});

	literal += `\n${"\t".repeat(indent - 1)}],`;

	return literal;
};

const calculateFontFiles = (editorConfig, indent) => {
	if (Object.keys(editorConfig.settings.fontFiles).length === 0) return "{},";

	const objKeysAndValues = Object.entries(editorConfig.settings.fontFiles).map(([key, value]) => {
		return `${"\t".repeat(indent + 1)}"${key}": "${value}"`;
	}).join(",\n");
	return `{
${objKeysAndValues},
${"\t".repeat(indent)}},`;
};

const calculateFontStacks = (editorConfig, indent) => {
	if (editorConfig.settings.fontStacks.length === 0) return "[],";

	const innerArrays = editorConfig.settings.fontStacks.map((stack) => {
		return `
${"\t".repeat(indent)}[
${stack.map(item => `${"\t".repeat(indent + 1)}"${item}"`).join(",\n")}
${"\t".repeat(indent)}]`;
	});

	return `[${innerArrays}\n${"\t".repeat(indent - 1)}],`;
};

const calculateActionMenu = (editorConfig, indent) => {
	return `{
${"\t".repeat(indent)}block: {
${"\t".repeat(indent + 1)}drag: ${editorConfig.settings.actionMenu.block.drag},
${"\t".repeat(indent + 1)}save: ${editorConfig.settings.actionMenu.block.save},
${"\t".repeat(indent + 1)}duplicate: ${editorConfig.settings.actionMenu.block.duplicate},
${"\t".repeat(indent + 1)}delete: ${editorConfig.settings.actionMenu.block.delete},
${"\t".repeat(indent)}},
${"\t".repeat(indent - 1)}},`;
};

const calculateToolboxes = (editorConfig, indent) => {
	return `{
${"\t".repeat(indent)}body: ${editorConfig.settings.toolboxes.body},
${"\t".repeat(indent)}fullWidth: ${editorConfig.settings.toolboxes.fullWidth},
${"\t".repeat(indent)}text: ${editorConfig.settings.toolboxes.text},
${"\t".repeat(indent)}button: ${editorConfig.settings.toolboxes.button},
${"\t".repeat(indent)}box: ${editorConfig.settings.toolboxes.box},
${"\t".repeat(indent)}multiColumn: ${editorConfig.settings.toolboxes.multiColumn},
${"\t".repeat(indent)}image: ${editorConfig.settings.toolboxes.image},
${"\t".repeat(indent)}divider: ${editorConfig.settings.toolboxes.divider},
${"\t".repeat(indent)}code: ${editorConfig.settings.toolboxes.code},
${"\t".repeat(indent)}social: ${editorConfig.settings.toolboxes.social},
${"\t".repeat(indent)}column: ${editorConfig.settings.toolboxes.column},
${"\t".repeat(indent)}loop: ${editorConfig.settings.toolboxes.loop},
${"\t".repeat(indent)}conditional: ${editorConfig.settings.toolboxes.conditional},
${"\t".repeat(indent)}dynamicImage: ${editorConfig.settings.toolboxes.dynamicImage},
${"\t".repeat(indent)}video: ${editorConfig.settings.toolboxes.video},
${"\t".repeat(indent)}blockLevelConditional: ${editorConfig.settings.toolboxes.blockLevelConditional},
${"\t".repeat(indent)}blockLevelLoop: ${editorConfig.settings.toolboxes.blockLevelLoop},
${"\t".repeat(indent - 1)}}`;
};

const calculateDropZones = (editorConfig, indent) => {
	return `{
${"\t".repeat(indent)}block: ${editorConfig.settings.dropzones.block},
${"\t".repeat(indent - 1)}},`;
};

const settingsGenerator = (editorConfig, indent = 2) => {
	let string = "{\n";

	if (editorConfig.settings.user && editorConfig.settings.user.enabled) {
		string += `${"\t".repeat(indent)}user: {
${"\t".repeat(indent + 1)}name: "${editorConfig.settings.user.name}",
${"\t".repeat(indent + 1)}avatar: "${editorConfig.settings.user.avatar}"
${"\t".repeat(indent)}},\n`;
	} else {
		string += `${"\t".repeat(indent)}user: false,\n`;
	}

	string += `${"\t".repeat(indent)}buttons: {
${"\t".repeat(indent + 1)}header: ${calculateHeader(editorConfig, indent + 2)}
${"\t".repeat(indent + 1)}textInsert: ${calculateTextInsert(editorConfig, indent + 2)}
${"\t".repeat(indent)}},
${"\t".repeat(indent)}elements: ${calculateElements(editorConfig, indent + 1)}
${"\t".repeat(indent)}blockLibraries: ${calculateBlockLibs(editorConfig, indent + 1)}
${"\t".repeat(indent)}fontFiles: ${calculateFontFiles(editorConfig, indent)}
${"\t".repeat(indent)}fontStacks: ${calculateFontStacks(editorConfig, indent + 1)}
${"\t".repeat(indent)}hideDefaultFonts: ${editorConfig.settings.hideDefaultFonts},
${"\t".repeat(indent)}addons: {
${"\t".repeat(indent + 1)}blockLock: ${calculateBL(editorConfig, indent + 2)}
${"\t".repeat(indent + 1)}variableSystem: ${calculateVE(editorConfig, indent + 2)}
${"\t".repeat(indent)}},
${"\t".repeat(indent)}actionMenu: ${calculateActionMenu(editorConfig, indent + 1)}
${"\t".repeat(indent)}toolboxes: ${calculateToolboxes(editorConfig, indent + 1)}
${"\t".repeat(indent)}dropzones: ${calculateDropZones(editorConfig, indent + 1)}
${"\t".repeat(indent)}staticAssetsBaseUrl: "${editorConfig.settings.staticAssetsBaseUrl}",
${"\t".repeat(indent)}videoElementBaseUrl: "${editorConfig.settings.videoElementBaseUrl}",
${"\t".repeat(indent)}autoSaveInterval: ${editorConfig.settings.autoSaveInterval},
${"\t".repeat(indent - 1)}},`;

	return string;
};

export default function (editorConfig) {
	return `const editorInstance = await chamaileonPlugins.createFullscreenPlugin({
	plugin: "editor",
	data: { document }, // see "document" tab
	settings: ${settingsGenerator(editorConfig, 2)}
	hooks: emailEditorHooks, //see "hooks" tab
});`;
}

export {
	settingsGenerator,
};
