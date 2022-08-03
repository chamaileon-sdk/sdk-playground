import { settingsGenerator } from "../codeGenerators/emailEditorCodeGenerator";

export default function (editorConfig) {
	const str = `editorInstance.methods.updateData({ document }); // see 'document' tab

editorInstance.methods.updateSettings(${settingsGenerator(editorConfig, 1)});

editorInstance.methods.updateHooks({ hooks: emailEditorHooks, resetHooks: false }); // see 'hooks' tab
`;
	return str;
}
