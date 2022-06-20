const generateFolderTreeItem = (item, indent) => {
	let string = `{
${"\t".repeat(indent + 1)}_id: "${item._id}"
${"\t".repeat(indent + 1)}name: "${item.name}"
`;
	if (item?.children) {
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
