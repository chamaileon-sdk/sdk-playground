import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

import vue2 from "@vitejs/plugin-vue2";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
	appType: "mpa", // needed for correct routing after reload
	server: {
		port: 8080,
		strictPort: true,
		host: true,
	},
	preview: {
		port: 8080,
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
		extensions: [".vue", ".js"],
	},
	build: {
		sourcemap: true,
	},
	plugins: [
		vue2(),
		nodePolyfills(),
	],
});
