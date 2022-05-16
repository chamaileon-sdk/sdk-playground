import { settingsGenerator } from "../codeGenerators/megaGalleryCodeGenerator";

export default function (galleryConfig) {
	const str = `galleryInstance.methods.updateData({
	currentImgSrc,
	dimensions,
});

galleryInstance.methods.updateSettings(${settingsGenerator(galleryConfig, 1)});

const { src } = await galleryInstance.methods.pickImage();
`;
	return str;
}
