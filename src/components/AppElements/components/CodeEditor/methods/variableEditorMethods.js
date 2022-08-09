import { settingsGenerator } from "../codeGenerators/variableEditorCodeGenerator";

export default function (variableEditorConfig) {
	const str = `variableEditorInstance.methods.updateData({ document }); // see 'document' tab

variableEditorInstance.methods.updateSettings(${settingsGenerator(variableEditorConfig, 1)});

variableEditorInstance.methods.updateHooks({ hooks: variableEditorHooks, resetHooks: false }); // see 'hooks' tab

document = await variableEditorInstance.methods.getDocument();
`;
	return str;
}
