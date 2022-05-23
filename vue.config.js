const path = require("path");

const projectRoot = path.resolve(__dirname);

process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
	runtimeCompiler: true,
	productionSourceMap: true,
	publicPath: "./",
	lintOnSave: false,
	configureWebpack: {
		resolve: {
			alias: {
				"@": `${projectRoot}/src`,
			},
		},
		devtool: "source-map",
	},
};
