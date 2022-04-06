export default function (megaGalleryConfig) {
	return `
const galleryInterface = await chamaileonPlugins.createFullscreenPlugin({
    data: {
        editImgSrc: editImgSrc,
        dimensions: dimensions,
    },
    settings: ${JSON.stringify(megaGalleryConfig.settings, null, 4)},
    hooks: galleryHooks, //see "hooks" tab
});`;
}
