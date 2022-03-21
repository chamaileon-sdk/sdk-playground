export default function (variableEditorConfig) {
	return `const variableEditorInstance = await chamaileonPlugins.createVariableEditor({
    document: { document }, // see 'document' tab
    settings: ${JSON.stringify(variableEditorConfig.settings, null, 4)},
    hooks: variableEditorHooks, //see 'hooks' tab
});`;
}
