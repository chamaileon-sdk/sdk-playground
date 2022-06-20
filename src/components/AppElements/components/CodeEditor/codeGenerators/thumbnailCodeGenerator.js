const settingsGenerator = (thumbnailConfig, indent = 2) => {
	return `{
${"\t".repeat(indent)}width: ${thumbnailConfig.width},
${"\t".repeat(indent)}height: ${thumbnailConfig.height},
${"\t".repeat(indent)}scale: ${thumbnailConfig.scale},
${"\t".repeat(indent)}scroll: ${thumbnailConfig.scroll}
${"\t".repeat(indent - 1)}}`;
};

export default function (thumbnailConfig) {
	return `const thumbnailInstance = await chamaileonPlugins.createInlinePlugin(
	{
		plugin: "thumbnail",
		data: { document }, //see "document" tab
		settings: ${settingsGenerator(thumbnailConfig, 3)},
		hooks: thumbnailHooks, //see 'hooks' tab
	},
	{
		container: "#thumbnail", //your container query selector or HTML element
	}
);`;
}

export {
	settingsGenerator,
};
