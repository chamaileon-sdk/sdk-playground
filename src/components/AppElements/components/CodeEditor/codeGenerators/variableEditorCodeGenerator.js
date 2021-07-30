export default function (variableEditorConfig) {
	return `const variableEditorConfig = {
    document: emailDocument, // see 'document' tab
    settings: {
        variablesToEdit: [${calculateVariables(variableEditorConfig)}],
        buttons: {
            header: {
                left: ${calculateButtons(
		variableEditorConfig.settings.buttons.header.left
	)},
                right: ${calculateButtons(
		variableEditorConfig.settings.buttons.header.right
	)},
            },
            footer: {
                left: ${calculateButtons(
		variableEditorConfig.settings.buttons.footer.left
	)},
                right: ${calculateButtons(
		variableEditorConfig.settings.buttons.footer.right
	)},
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

const calculateButtons = (arr) => {
	let literal = "";

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
