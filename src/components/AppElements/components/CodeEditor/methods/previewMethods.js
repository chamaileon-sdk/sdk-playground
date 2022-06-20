import { settingsGenerator } from "../codeGenerators/previewCodeGenerator";

export default function (previewConfig) {
	const str = `previewInstance.methods.updateData({ document }); // see 'document' tab

previewInstance.methods.updateSettings(${settingsGenerator(previewConfig, 1)});
`;
	return str;
}
