export default function (thumbnailConfig) {
	return `const thumbnailInstance = await chamaileonPlugins.createInlinePlugin({
    document: { document }, //see "Document" tab
	settings: { 
		width: ${thumbnailConfig.width},
		height: ${thumbnailConfig.height},
		scale: ${thumbnailConfig.scale},
		scroll: ${thumbnailConfig.scroll}

	},
	{
		container: "#thumbnail", //your container query selector or HTML element
	}
});`;
}
