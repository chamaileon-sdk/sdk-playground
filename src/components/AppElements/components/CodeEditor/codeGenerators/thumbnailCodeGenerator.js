const settingsGenerator = (thumbnailConfig, indent = 2) => {
	return `{
${"\t".repeat(indent)}scroll: ${thumbnailConfig.scroll}
${"\t".repeat(indent - 1)}}`;
};

export default function (thumbnailConfig, thumbnailDimensions) {
	return `const thumbnailInstance = await chamaileonPlugins.createInlinePlugin(
	{
		plugin: "thumbnail",
		data: { document }, //see "document" tab
		settings: ${settingsGenerator(thumbnailConfig, 3)},
		hooks: thumbnailHooks, //see 'hooks' tab
	},
	{
		container: "#thumbnail", //your container query selector or HTML element,
		dimensions: {
			width: ${thumbnailDimensions.width},
			height: ${thumbnailDimensions.height},
			scale: ${thumbnailDimensions.scale},
		}
	}
);`;
}

export {
	settingsGenerator,
};
