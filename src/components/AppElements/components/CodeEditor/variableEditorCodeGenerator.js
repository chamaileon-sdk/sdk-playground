export default function (variableEditorConfig) {
	return `const variableEditorConfig = {
    document: emailDocument, // see 'document' tab
    settings: {
        variablesToEdit: [${calculateVariables(variableEditorConfig)}],
        buttons: {
            header: {
                left: ${calculateHeaderLeft(variableEditorConfig)},
                right: ${calculateHeaderRight(variableEditorConfig)},
            },
            footer: {
                left: ${calculateFooterLeft(variableEditorConfig)},
                right: ${calculateFooterRight(variableEditorConfig)},
            },
            textInsertPlugin: ${calculateVariableEditorTextInsert(
		variableEditorConfig
	)}
        },
    },
    hooks: variableEditorHooks, //see 'hooks' tab
};
        
const variableEditorInstance = await chamaileonPlugins.editVariables(variableEditorConfig)`;
}

const calculateVariables = (variableEditorConfig) => {
	let out = "";

	variableEditorConfig.settings.variablesToEdit.forEach((c) => {
		out += `"${c}",`;
	});

	out = out.slice(0, -1);
	return out;
};

const calculateHeaderLeft = (variableEditorConfig) => {
	let literal = "";
	let arr = variableEditorConfig.settings.buttons.header.left;

	if (arr.length === 0) return "[]";

	literal = "[\n";

	arr.forEach((c) => {
		literal += "\t\t\t\t\t{\n";
		literal += `\t\t\t\t\t\tid: '${c.id}',\n`;
		literal += c.icon
			? `\t\t\t\t\t\ticon: '${c.icon}',\n`
			: `\t\t\t\t\t\tlabel: '${c.label}',\n`;
		literal += "\t\t\t\t\t},\n";
	});

	literal += "\t\t\t\t]";
	return literal;
};

const calculateHeaderRight = (variableEditorConfig) => {
	let literal = "";
	let arr = variableEditorConfig.settings.buttons.header.right;

	if (arr.length === 0) return "[]";

	literal = "[\n";

	arr.forEach((c) => {
		literal += "\t\t\t\t\t{\n";
		literal += `\t\t\t\t\t\tid: '${c.id}',\n`;
		literal += c.icon
			? `\t\t\t\t\t\ticon: '${c.icon}',\n`
			: `\t\t\t\t\t\tlabel: '${c.label}',\n`;
		literal += "\t\t\t\t\t},\n";
	});

	literal += "\t\t\t\t]";

	return literal;
};

const calculateFooterRight = (variableEditorConfig) => {
	let literal = "";
	let arr = variableEditorConfig.settings.buttons.footer.right;

	literal = "[\n";

	arr.forEach((c) => {
		literal += "\t\t\t\t\t{\n";
		literal += `\t\t\t\t\t\tid: '${c.id}',\n`;
		literal += c.icon
			? `\t\t\t\t\t\ticon: '${c.icon}',\n`
			: `\t\t\t\t\t\tlabel: '${c.label}',\n`;
		literal += "\t\t\t\t\t},\n";
	});

	literal += "\t\t\t\t]";

	return literal;
};

const calculateFooterLeft = (variableEditorConfig) => {
	let literal = "";
	let arr = variableEditorConfig.settings.buttons.footer.left;

	if (arr.length === 0) return "[]";

	literal = "[\n";

	arr.forEach((c) => {
		literal += "\t\t\t\t\t{\n";
		literal += `\t\t\t\t\t\tid: '${c.id}',\n`;
		literal += c.icon
			? `\t\t\t\t\t\ticon: '${c.icon}',\n`
			: `\t\t\t\t\t\tlabel: '${c.label}',\n`;
		literal += "\t\t\t\t\t},\n";
	});

	literal += "\t\t\t\t]";

	return literal;
};

const calculateVariableEditorTextInsert = (variableEditorConfig) => {
	let literal = "";
	let arr = variableEditorConfig.settings.buttons.textInsertPlugin;

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
