export default function (importConfig) {
	const printConfig = (config) => {
		let str = "";
		for (const key in config) {
			str += "\t" + key + ": ";
			if (typeof config[key] === typeof "string") {
				str += "\"" + config[key].value + "\",\n";
			} else {
				str += config[key].value + ",\n";
			}
		}

		return str.slice(0, -1);
	};

	return `const importInstance = await chamaileonPlugins.createFullscreenPlugin({
  plugin: "import",
  data: {},
  settings: {
  ${printConfig(importConfig)}
  },
  hooks: htmlImportHooks, // see 'hooks' tab
};`;
}
