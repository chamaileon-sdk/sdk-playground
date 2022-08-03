import { settingsGenerator } from "../codeGenerators/previewCodeGenerator";

export default function (previewConfig) {
	const str = `previewInstance.methods.updateData({ document }); // see 'document' tab

previewInstance.methods.updateSettings(${settingsGenerator(previewConfig, 1)});

previewInstance.methods.updateHooks({ hooks: emailPreviewHooks, resetHooks: false }); // see 'hooks' tab
`;
	return str;
}
