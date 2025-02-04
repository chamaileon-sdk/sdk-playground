const calculatePanels = (galleryConfig, indent) => {
	return `{
${"\t".repeat(indent)}stockPhotos: ${galleryConfig.settings.panels.stockPhotos},
${"\t".repeat(indent - 1)}}`;
};

const calculateUploadOptions = (galleryConfig, indent) => {
	return `{
${"\t".repeat(indent)}url: ${galleryConfig.settings.uploadOptions.url},
${"\t".repeat(indent)}file: ${galleryConfig.settings.uploadOptions.file},
${"\t".repeat(indent - 1)}}`;
};

const generateFolderTreeItem = (item, indent) => {
	let string = `{
${"\t".repeat(indent + 1)}_id: "${item._id}",
${"\t".repeat(indent + 1)}name: "${item.name}",`;
	if (Object.prototype.hasOwnProperty.call(item, "canCreateSubfolder")) {
		string += `
${"\t".repeat(indent + 1)}canCreateSubfolder: ${item.canCreateSubfolder},`;
	}
	if (Object.prototype.hasOwnProperty.call(item, "canRename")) {
		string += `
${"\t".repeat(indent + 1)}canRename: ${item.canRename},`;
	}
	if (Object.prototype.hasOwnProperty.call(item, "canDelete")) {
		string += `
${"\t".repeat(indent + 1)}canDelete: ${item.canDelete},`;
	}
	if (Object.prototype.hasOwnProperty.call(item, "canDeleteImages")) {
		string += `
${"\t".repeat(indent + 1)}canDeleteImages: ${item.canDeleteImages},`;
	}
	if (Object.prototype.hasOwnProperty.call(item, "canEditImages")) {
		string += `
${"\t".repeat(indent + 1)}canEditImages: ${item.canEditImages},`;
	}
	if (Object.prototype.hasOwnProperty.call(item, "canCropImages")) {
		string += `
${"\t".repeat(indent + 1)}canCropImages: ${item.canCropImages},`;
	}
	if (Object.prototype.hasOwnProperty.call(item, "canRenameImages")) {
		string += `
${"\t".repeat(indent + 1)}canRenameImages: ${item.canRenameImages},`;
	}
	string += `
`;
	if (item && item.children) {
		string += `${"\t".repeat(indent + 1)}children: [`;
		item.children.forEach((subItem) => {
			string += `\n${"\t".repeat(indent + 2)}${generateFolderTreeItem(subItem, indent + 2)}`;
		});
		string += `\n${"\t".repeat(indent + 1)}],\n`;
	}

	string += `${"\t".repeat(indent)}},`;

	return string;
};

const settingsGenerator = (galleryConfig, indent = 2) => {
	return `{
${"\t".repeat(indent)}folderTree: ${generateFolderTreeItem(galleryConfig.settings.folderTree, indent)}
${"\t".repeat(indent)}selectedFolderId: "${galleryConfig.settings.selectedFolderId}",
${"\t".repeat(indent)}maxImagePerPage: ${galleryConfig.settings.maxImagePerPage},
${"\t".repeat(indent)}maxFileSize: ${galleryConfig.settings.maxFileSize},
${"\t".repeat(indent)}panels: ${calculatePanels(galleryConfig, indent + 1)},
${"\t".repeat(indent)}uploadOptions: ${calculateUploadOptions(galleryConfig, indent + 1)},
${"\t".repeat(indent - 1)}}`;
};

export default function (galleryConfig) {
	return `
const galleryInstance = await chamaileonPlugins.createFullscreenPlugin({
	plugin: "gallery",
	data: {
		currentImgSrc,
		dimensions,
	},
	settings: ${settingsGenerator(galleryConfig, 2)},
	hooks: galleryHooks, //see "hooks" tab
});`;
}

export {
	settingsGenerator,
};
