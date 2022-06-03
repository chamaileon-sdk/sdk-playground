const calculateVariables = (variableEditorConfig) => {
	let out = "";

	variableEditorConfig.settings.variablesToEdit.forEach((c) => {
		out += `"${c}",`;
	});

	out = out.slice(0, -1);
	return out;
};

const calculateButtons = (arr, indent) => {
	let literal = "";

	if (arr.length === 0) return "[]";

	literal = "[\n";

	arr.forEach((c) => {
		literal += `${"\t".repeat(indent)}{\n`;
		literal += `${"\t".repeat(indent + 1)}id: '${c.id}',\n`;
		literal += `${"\t".repeat(indent + 1)}icon: '${c.icon}',\n`;
		literal += `${"\t".repeat(indent + 1)}label: '${c.label}',\n`;
		literal += `${"\t".repeat(indent + 1)}color: "${c.color}",\n`;
		literal += `${"\t".repeat(indent + 1)}style: "${c.style}"\n`;
		literal += `${"\t".repeat(indent)}},\n`;
	});

	literal += `${"\t".repeat(indent - 1)}],`;
	return literal;
};

const calculateFontStacks = (variableEditorConfig, indent) => {
	if (variableEditorConfig.settings.fontStacks.length === 0) return "[],";

	const innerArrays = variableEditorConfig.settings.fontStacks.map((stack) => {
		return `
${"\t".repeat(indent)}[
${stack.map(item => `${"\t".repeat(indent + 1)}"${item}"`).join(",\n")}
${"\t".repeat(indent)}]`;
	});

	return `[${innerArrays}\n${"\t".repeat(indent - 1)}],`;
};

const settingsGenerator = (variableEditorConfig, indent = 2) => {
	return `{
${"\t".repeat(indent)}variablesToEdit: [${calculateVariables(variableEditorConfig)}],
${"\t".repeat(indent)}buttons: {
${"\t".repeat(indent + 1)}header: {
${"\t".repeat(indent + 2)}left: ${calculateButtons(
	variableEditorConfig.settings.buttons.header.left,
	indent + 3,
)},
${"\t".repeat(indent + 2)}right: ${calculateButtons(
	variableEditorConfig.settings.buttons.header.right,
	indent + 3,
)},
${"\t".repeat(indent + 1)}},
${"\t".repeat(indent + 1)}footer: {
${"\t".repeat(indent + 2)}left: ${calculateButtons(
	variableEditorConfig.settings.buttons.footer.left,
	indent + 3,
)},
${"\t".repeat(indent + 2)}right: ${calculateButtons(
	variableEditorConfig.settings.buttons.footer.right,
	indent + 3,
)},
${"\t".repeat(indent + 1)}},
${"\t".repeat(indent + 1)}textInsert: ${calculateButtons(
	variableEditorConfig.settings.buttons.textInsert,
	indent + 2,
)}
${"\t".repeat(indent)}},
${"\t".repeat(indent)}fontStacks: ${calculateFontStacks(variableEditorConfig, indent + 1)}
${"\t".repeat(indent)}hideDefaultFonts: ${variableEditorConfig.settings.hideDefaultFonts},
${"\t".repeat(indent - 1)}}`;
};

export default function (variableEditorConfig) {
	return `const variableEditorInstance = await chamaileonPlugins.createFullscreenPlugin({
	plugin: "variable-editor",
	data: { document }, // see 'document' tab
	settings: ${settingsGenerator(variableEditorConfig, 2)},
	hooks: variableEditorHooks, //see 'hooks' tab
};`;
}

export {
	settingsGenerator,
};
