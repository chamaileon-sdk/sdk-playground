export default function (config) {
	return `const editorInstance = await chamaileonPlugins.createEmailEditor({
	data: { document }, // see "document" tab
	settings: ${JSON.stringify(config.settings, null, 4)},
	hooks: emailEditorHooks, //see "hooks" tab
});`;
}
