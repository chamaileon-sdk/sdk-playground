import { settingsGenerator } from "../codeGenerators/thumbnailCodeGenerator";

export default function (thumbnailConfig) {
	const str = `thumbnailInstance.methods.updateData({ document }); // see 'document' tab

thumbnailInstance.methods.updateSettings(${settingsGenerator(thumbnailConfig, 1)});

thumbnailInstance.methods.updateHooks({ hooks: thumbnailHooks, resetHooks: false }); // see 'hooks' tab

thumbnailInstance.methods.getDocumentHeight();
`;
	return str;
}
