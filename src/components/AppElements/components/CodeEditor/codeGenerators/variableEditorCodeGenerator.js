export default function (variableEditorConfig) {
	return `const variableEditorInstance = await chamaileonPlugins.createFullscreenPlugin({
    plugin: "variable-editor",
    document: { document }, // see 'document' tab
    settings: ${JSON.stringify(variableEditorConfig.settings, null, 4)},
    hooks: variableEditorHooks, //see 'hooks' tab
});`;
}
