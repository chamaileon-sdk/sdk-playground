export default function (megaGalleryConfig) {
	return `
const galleryInstance = await chamaileonPlugins.openGallery({ editImgSrc, dimensions, resolve }) {
    editImgSrc: editImgSrc,
    dimensions: dimensions,
    settings: {
        folderTree: ${JSON.stringify(megaGalleryConfig.settings.folderTree, null, 4 )},
        selectedFolderId: ${ megaGalleryConfig.settings.selectedFolderId },
        maxImagePerPage: ${ megaGalleryConfig.settings.maxImagePerPage },
        maxFileSize: ${ megaGalleryConfig.settings.maxFileSize },
    },
    hooks: galleryHooks, //see "hooks" tab
});`;
}
