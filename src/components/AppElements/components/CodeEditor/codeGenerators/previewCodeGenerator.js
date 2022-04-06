/* eslint-disable no-use-before-define */
export default function (previewConfig) {
	return `const previewInstance = await chamaileonPlugins.createFullscreenPlugin({
    plugin: "preview",
    document: { document }, // see 'document' tab
    settings: ${JSON.stringify(previewConfig.settings, null, 4)},
    hooks: emailPreviewHooks //see 'hooks' tab
});`;
}
