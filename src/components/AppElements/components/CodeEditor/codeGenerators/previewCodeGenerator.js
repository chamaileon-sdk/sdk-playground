/* eslint-disable no-use-before-define */
export default function (previewConfig) {
	return `const previewInstance = await chamaileonPlugins.previewEmail({
    document: { document }, // see 'document' tab
    settings: ${JSON.stringify(previewConfig.settings, null, 4)},
    hooks: emailPreviewHooks //see 'hooks' tab
});`;
}

// const calculatePreviewHeader = (previewConfig) => {
// 	let literal = "";
// 	const arr = previewConfig.settings.buttons.header;

// 	if (arr.length === 0) return "[],";

// 	literal += "[\n";
// 	arr.forEach((c, i) => {
// 		literal += "\t\t\t\t{\n";
// 		literal += c.type === "button" ? `\t\t\t\t\tid: "${c.id}",\n` : "";
// 		literal += `\t\t\t\t\ticon: "${c.icon}",\n`;
// 		literal += `\t\t\t\t\tlabel: "${c.label}",\n`;
// 		literal += `\t\t\t\t\tcolor: "${c.color}",\n`;
// 		literal += `\t\t\t\t\tstyle: "${c.style}"`;
// 		literal += c.items
// 			? `,\n\t\t\t\t\titems: ${calculatePreviewDDItems(c.items)}\n`
// 			: ",\n";
// 		literal += "\t\t\t\t}";
// 		literal += i === arr.length - 1 ? "," : ",\n";
// 	});
// 	literal += "\n\t\t\t],";

// 	return literal;
// };

// const calculatePreviewDDItems = (arr) => {
// 	if (arr.length === 0) return "[],";

// 	let literal = "";

// 	literal += "[\n";

// 	arr.forEach((c, i) => {
// 		literal += "\t\t\t\t\t\t{\n";
// 		literal += `\t\t\t\t\t\t\tid: "${c.id}",\n`;
// 		literal += `\t\t\t\t\t\t\tlabel: "${c.label}",\n`;
// 		literal += `\t\t\t\t\t\t\ticon: "${c.icon}",\n`;
// 		literal += "\t\t\t\t\t\t}";
// 		literal += i === arr.length - 1 ? "," : ",\n";
// 	});

// 	literal += "\n\t\t\t\t\t],";
// 	return literal;
// };
