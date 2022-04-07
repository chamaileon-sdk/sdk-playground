export default function (config) {
	return `const editorInstance = await chamaileonPlugins.createFullscreenPlugin({
    plugin: "editor",
	data: { document }, // see "document" tab
	settings: ${JSON.stringify(config.settings, null, 4)},
	hooks: emailEditorHooks, //see "hooks" tab
});`;
}
