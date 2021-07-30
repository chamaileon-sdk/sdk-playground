export default function (thumbnailConfig) {
	return `const thumbnailInstance = await chamaileonPlugins.createThumbnail({
    document: emailDocument, // see 'document' tab
    container: "${thumbnailConfig.container}", //Can change it in your code
    width: ${thumbnailConfig.width},
    height: ${thumbnailConfig.height},
    scale: ${thumbnailConfig.scale},
    scroll: ${thumbnailConfig.scroll}
});`;
}
