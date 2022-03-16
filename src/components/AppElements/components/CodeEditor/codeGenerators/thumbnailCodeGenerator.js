export default function (thumbnailConfig) {
	return `const thumbnailInstance = await chamaileonPlugins.createThumbnail({
    document: { document }, //see "Document" tab
    container: "${thumbnailConfig.container}", //your container selector
    width: ${thumbnailConfig.width},
    height: ${thumbnailConfig.height},
    scale: ${thumbnailConfig.scale},
    scroll: ${thumbnailConfig.scroll}
});`;
}
