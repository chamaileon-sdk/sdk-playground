import { settingsGenerator } from "../codeGenerators/htmlImportCodeGenerator";

export default function (htmlImportConfig) {
	const str = `htmlImportInstance.methods.updateSettings(${settingsGenerator(htmlImportConfig, 1)});`;
	return str;
}