const calculatePreviewDDItems = (arr, indent) => {
	if (arr.length === 0) return "[],";

	let literal = "";

	literal += "[\n";

	arr.forEach((item) => {
		literal += `${"  ".repeat(indent)}{\n`;
		literal += `${"  ".repeat(indent + 1)}id: "${item.id}",\n`;
		literal += `${"  ".repeat(indent + 1)}label: "${item.label}",\n`;
		literal += `${"  ".repeat(indent + 1)}icon: "${item.icon}",\n`;
		literal += `${"  ".repeat(indent)}},`;
	});

	literal += `\n${"  ".repeat(indent - 1)}],`;
	return literal;
};

const calculatePreviewHeader = (importConfig, indent) => {
	let literal = "";
	const arr = importConfig.buttons.header;

	if (arr.length === 0) return "[],";

	literal += "[\n";
	arr.forEach((item) => {
		literal += `${"  ".repeat(indent)}{\n`;
		literal += item.type === "button" ? `${"  ".repeat(indent + 1)}id: "${item.id}",\n` : "";
		literal += `${"  ".repeat(indent + 1)}icon: "${item.icon}",\n`;
		literal += `${"  ".repeat(indent + 1)}label: "${item.label}",\n`;
		literal += `${"  ".repeat(indent + 1)}color: "${item.color}",\n`;
		literal += `${"  ".repeat(indent + 1)}style: "${item.style}"`;
		literal += item.items
			? `,\n${"  ".repeat(indent + 1)}items: ${calculatePreviewDDItems(item.items, indent + 2)}\n`
			: ",\n";
		literal += `${"  ".repeat(indent)}},\n`;
	});
	literal += `${"  ".repeat(indent - 1)}],`;

	return literal;
};

const settingsGenerator = (importConfig, indent = 2) => {
	return `{
${"\t".repeat(indent)}buttons: {
${"\t".repeat(indent + 1)}header: ${calculatePreviewHeader(importConfig, 2 + indent)}
${"\t".repeat(indent)}},
${"\t".repeat(indent - 1)}}`;
};

export default function (importConfig) {
	return `const importInstance = await chamaileonPlugins.createFullscreenPlugin({
		plugin: "import",
		settings: ${settingsGenerator(importConfig)},
		hooks: htmlImportHooks, // see 'hooks' tab
	};`;
}

export {
	settingsGenerator,
};
