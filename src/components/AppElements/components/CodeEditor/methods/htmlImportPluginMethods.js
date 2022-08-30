import { settingsGenerator } from "../codeGenerators/htmlImportPluginCodeGenerator";

export default function (htmlImportConfig) {
	const str = `htmlImportPluginInstance.methods.updateSettings(${settingsGenerator(htmlImportConfig, 1)});

htmlImportPluginInstance.methods.updateHooks({ hooks: htmlImportPluginHooks, resetHooks: false }); // see 'hooks' tab
`;
	return str;
}
