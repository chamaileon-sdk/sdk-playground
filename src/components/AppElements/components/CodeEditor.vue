<template>
	<v-card class="rounded-0 pa-0 ma-0" width="100%" dark fixed flat>
		<v-tabs v-model="tab" :show-arrows="true" dark>
			<v-tabs-slider color="yellow"></v-tabs-slider>
			<v-tab> Settings </v-tab>
			<v-tab> Document </v-tab>
			<v-tab v-if="route !== '/sdk' && route !== '/emailthumbnail'">
				Hooks
			</v-tab>
			<v-tab v-if="route === '/emaileditor'">Block Libraries</v-tab>
		</v-tabs>

		<v-card
			v-show="tab === 0"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code :code="code" class="pa-0" lang="javascript" />
		</v-card>

		<v-card
			v-show="tab === 1"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code :code="doc" class="pa-0" lang="javascript" />
		</v-card>

		<v-card
			v-if="route !== '/sdk' && route !== '/emailthumbnail' && tab === 2"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="javascript" :code="hooks" />
		</v-card>

		<v-card
			v-if="route === '/emaileditor' && tab === 3"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="javascript" :code="blockLibs" />
		</v-card>

		<v-card dark class="copyCard rounded-pill" elevation="0" v-show="snackbar"
			><v-card-text class="pa-1 px-4 success--text text-button"
				>Copied to Clipboard</v-card-text
			></v-card
		>
		<v-tab>
			<v-btn
				dark
				icon
				class="copyToClipboard grey--text text--darken-1"
				@click="copyToClipboard"
				><v-icon>mdi-clipboard-file-outline</v-icon></v-btn
			>
		</v-tab>
	</v-card>
</template>

<script>
import sdkCodeGenerator from "./CodeEditor/sdkCodeGenerator";
import thumbnailCodeGenerator from "./CodeEditor/thumbnailCodeGenerator";
import previewCodeGenerator from "./CodeEditor/previewCodeGenerator";

export default {
	data: () => ({
		snackbar: false,
		tab: 0,
	}),

	computed: {
		route() {
			return this.$route.path;
		},

		doc() {
			return (
				"let emailDocument = JSON.parse(\"" +
				JSON.stringify(this.$store.state.document)
					.replaceAll("\\", "\\\\")
					.replaceAll(/"/g, "\\\"") +
				"\")"
			);
		},

		sdkCode() {
			return sdkCodeGenerator(this.$store.state.sdkConfig);
		},

		//Thumbnail
		thumbnailCode() {
			return thumbnailCodeGenerator(this.$store.getters.getThumbnailSettings);
		},

		//Preview
		previewCode() {
			return previewCodeGenerator(this.$store.getters.getPreviewConfigObject);
		},

		previewHooks() {
			let str = `const emailPreviewHooks = {
	onHeaderButtonClicked: ({ buttonId }) => {
		return new Promise(resolve => {
			resolve();
		});
	}
}`;

			return str;
		},

		//Email Editor
		blockLibs() {
			let str = "";
			let map = this.$store.state.editorConfig.BlockLibData.blockLibsData;
			let bls = this.$store.getters.getBlockLibs;

			for (let bl of bls) {
				str += `blockLibraryData.set("${bl.id}", JSON.parse("${JSON.stringify(
					map[bl.id]
				)
					.replaceAll("\\", "\\\\")
					.replaceAll(/"/g, "\\\"")}"));\n`;
			}

			return str;
		},

		config() {
			return this.$store.getters.getConfigObject;
		},

		calcualteConfig() {
			if (!this.config.settings.elements.content) return "false";

			return `{
				text: ${this.config.settings.elements.content.text},
				image: ${this.config.settings.elements.content.image},
				button: ${this.config.settings.elements.content.button},
				divider: ${this.config.settings.elements.content.divider},
				social: ${this.config.settings.elements.content.social},
				code:  ${this.config.settings.elements.content.code}
			}`;
		},

		calcualteStructure() {
			if (!this.config.settings.elements.structure) return "false";

			return `{
				fullWidth: ${this.config.settings.elements.structure.fullWidth},
				box: ${this.config.settings.elements.structure.box},
				multiColumn: ${this.config.settings.elements.structure.multiColumn}
			}`;
		},

		calcualteAdvanced() {
			if (!this.config.settings.elements.advanced) return "false";

			return `{
				loop: ${this.config.settings.elements.advanced.loop},
				conditional: ${this.config.settings.elements.advanced.conditional},
				dynamicImage: ${this.config.settings.elements.advanced.dynamicImage}
			}`;
		},

		calculateElements() {
			if (!this.config.settings.elements) return "false";

			return `{
			content: ${this.calcualteConfig},
			structure: ${this.calcualteStructure},
			advanced: ${this.calcualteAdvanced}
		}`;
		},

		calculateBL() {
			if (!this.config.addons.blockLock) return "false";

			return `{
                enabled: ${this.config.addons.blockLock.enabled}
            }`;
		},

		calculateVE() {
			if (!this.config.addons.variableSystem) return "false";

			return `{
                enabled: ${this.config.addons.variableSystem.enabled}
            }`;
		},

		calculateHeader() {
			let literal = "";
			let arr = this.config.settings.buttons.header;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
				{
					${c.type === "button" ? `id: '${c.id}',\n\t\t\t\t\t` : ""}type: '${c.type}',
					icon: '${c.icon}',
					label: '${c.label}',
					color: '${c.color}',
					style: '${c.style}'${
	c.items ? `,\n\t\t\t\t\titems: ${this.calculateDDItems(c.items)}` : ""
}
				},`;
			});
			literal += `
			]`;
			return literal;
		},

		calculateBlockLibs() {
			let literal = "";
			let arr = this.config.blockLibraries;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
				{
					id: '${c.id}',
					label: '${c.label}',
					canDeleteBlock: ${c.canDeleteBlock},
					canRenameBlock: ${c.canRenameBlock},
					canSaveBlock: ${c.canSaveBlock}
				},`;
			});
			literal += `
			]`;
			return literal;
		},

		calculateTextInsert() {
			let literal = "";
			let arr = this.config.settings.buttons.textInsert;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
				{
					id: '${c.id}',
					label: '${c.label}',
					icon: '${c.icon}'
				},`;
			});
			literal += `
			]`;
			return literal;
		},

		emailCode() {
			return `const editorInstance = await chamaileonPlugins.editEmail({
    document: emailDocument, // see 'document' tab
    user: ${
	this.config.user
		? `{
        name: "${this.config.user.name}",
        avatar: "${this.config.user.avatar}"
    }`
		: "false"
},
    settings: {
        staticAssetsBaseUrl: "https://yourdomain.com/path/to/static/assets/",
        buttons: {
            header: ${this.calculateHeader},
            textInsert: ${this.calculateTextInsert}
        },
        elements: ${this.calculateElements},
        blockLibraries: ${this.calculateBlockLibs},
        addons: {
            blockLock: ${this.calculateBL},
            variableSystem: ${this.calculateVE}
        }
    },
	autoSaveInterval: ${this.config.autoSaveInterval},
    hooks: emailEditorHooks //see 'hooks' tab
});`;
		},

		editorHooks() {
			let str = `//Key: libraryID, Value: Array of stored blocks
const blockLibraryData = new Map();

const emailEditorHooks = {

    onSave: ({ document }) => {
		emailDocument = document;

		return new Promise(resolve => {
			resolve();
		});
	},

    onAutoSave: ({ document }) => {
		emailDocument = document;

		return new Promise(resolve => {
			resolve();
		});
	},

    onChange: () => {
		return new Promise(resolve => {
			resolve();
		});
	},

    onBeforeClose: () => {
		return new Promise(resolve => {
			resolve();
		});
	},

    onAfterClose: () => {
		return new Promise(resolve => {
			resolve();
		});
	},

    onEditTitle: ({ title }) => {
		return new Promise(resolve => {
			resolve();
		});
	},

    onEditImage: ({ originalImage, lockDimensions: { width, height } }) => {
		return new Promise(resolve => {
			resolve({ src });
		});
	},

    onEditBackgroundImage: () => {
		return new Promise(resolve => {
			resolve({ src });
		});
	},

    onLoadBlocks: ({ libId }) => {
		let blocks = [];

      	if (!blockLibraryData.has(libId)) {
			blocks = [];
		} else {
			blocks = blockLibraryData.get(libId);
		}

		return new Promise(resolve => {
			resolve({ blocks });
		});
	},

    onBlockSave: ({ libId, block }) => {
		if (!blockLibraryData.has(libId)) {
			blockLibraryData.set(libId, []);
		}

    	blockLibraryData.get(libId).push(block);

		return new Promise(resolve => {
			resolve({ block });
		});
	},

    onBlockRename: ({ libId, block: { _id, title } }) => {
		let array = blockLibraryData.get(libId);

		array.forEach(c => {
			if (c._id == _id) {
				c.title = title;
			}
		});

		blockLibraryData.set(libId, array);

		return new Promise(resolve => {
			resolve();
		});
	},

    onBlockDelete: ({ libId, block: { _id } }) => {
		let array = blockLibraryData.get(libId);

		array = array.filter(c => c._id !== _id);

		blockLibraryData.set(libId, array);

		return new Promise(resolve => {
			resolve();
		});
	},

    onHeaderButtonClicked: ({ buttonId }) => {
		return new Promise(resolve => {
			resolve();
		});
	},

    onTextInsertPluginButtonClicked: ({ buttonId }) => {
		return new Promise(resolve => {
			resolve({ value: "Your inserted text." });
		});
	},

    onExpressionEditClicked: ({ expression }) => {
		return new Promise(resolve => {
			resolve({ expression: "<Your inserted expression>" });
		});
	}
};`;

			return str;
		},

		//Variable Editor
		variableEditorConfig() {
			return this.$store.getters.getVariableEditorConfigObject;
		},

		calculateVariables() {
			let out = "";

			this.variableEditorConfig.settings.variablesToEdit.forEach((c) => {
				out += `"${c}",`;
			});

			out = out.slice(0, -1);
			return out;
		},

		calculateHeaderLeft() {
			let literal = "";
			let arr = this.variableEditorConfig.settings.buttons.header.left;

			if (arr.length === 0) return "[]";

			literal += `[
				/*It's not necessary to have a close button,
				but otherwise there is no way to exit the app*/`;
			arr.forEach((c) => {
				literal += `
					{
						id: '${c.id}',
						${c.icon ? `icon: '${c.icon}'` : `label: '${c.label}'`}
					},`;
			});
			literal += `
				]`;
			return literal;
		},

		calculateHeaderRight() {
			let literal = "";
			let arr = this.variableEditorConfig.settings.buttons.header.right;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
					{
						id: '${c.id}',
						${c.icon ? `icon: '${c.icon}'` : `label: '${c.label}'`}
					},`;
			});
			literal += `
				]`;
			return literal;
		},

		calculateFooterRight() {
			let literal = "";
			let arr = this.variableEditorConfig.settings.buttons.footer.right;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
					{
						id: '${c.id}',
						${c.icon ? `icon: '${c.icon}'` : `label: '${c.label}'`}
					},`;
			});
			literal += `
				]`;
			return literal;
		},

		calculateFooterLeft() {
			let literal = "";
			let arr = this.variableEditorConfig.settings.buttons.footer.left;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
					{
						id: '${c.id}',
						${c.icon ? `icon: '${c.icon}'` : `label: '${c.label}'`}
					},`;
			});
			literal += `
				]`;
			return literal;
		},

		calculateVariableEditorTextInsert() {
			let literal = "";
			let arr = this.variableEditorConfig.settings.buttons.textInsertPlugin;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
				{
					id: '${c.id}',
					label: '${c.label}',
					icon: '${c.icon}'
				},`;
			});
			literal += `
			]`;
			return literal;
		},

		variableEditorCode() {
			return `const variableEditorConfig = {
    document: emailDocument, // see 'document' tab
    settings: {
        variablesToEdit: [${this.calculateVariables}],
        buttons: {
            header: {
                left: ${this.calculateHeaderLeft},
                right: ${this.calculateHeaderRight},
            },
            footer: {
                left: ${this.calculateFooterLeft},
                right: ${this.calculateFooterRight},
            },
            textInsertPlugin: ${this.calculateVariableEditorTextInsert}
		},
	},
    hooks: variableEditorHooks //see 'hooks' tab
};

const variableEditorInstance = await chamaileonPlugins.editVariables(variableEditorConfig)`;
		},

		variableEditorHooks() {
			let str = `const variableEditorHooks = {
	onEditImage: ({ originalImg }) => {
		return new Promise(resolve => {
			resolve({ src });
		});
	},

	onTextInsertPluginButtonClicked: ({ buttonId }) => {
		return new Promise(resolve => {
			resolve({ value: "Your inserted text." });
		});
	},

	onButtonClicked: ({ buttonId }) => {

		if (buttonId === "close") variableEditorInstance.close();

		return new Promise(resolve => {
			resolve();
		});
	}
}`;

			return str;
		},

		//Final
		code() {
			if (this.$route.path === "/emaileditor") return this.emailCode;
			else if (this.$route.path === "/sdk") return this.sdkCode;
			else if (this.$route.path === "/emailpreview") return this.previewCode;
			else if (this.$route.path === "/emailthumbnail")
				return this.thumbnailCode;
			else if (this.$route.path === "/variableeditor")
				return this.variableEditorCode;
			else return `console.log("${this.$route.path}");`;
		},

		hooks() {
			if (this.$route.path === "/emaileditor") return this.editorHooks;
			else if (this.$route.path === "/emailpreview") return this.previewHooks;
			else if (this.$route.path === "/variableeditor")
				return this.variableEditorHooks;
			else return "//There are no hooks available";
		},
	},

	methods: {
		copyToClipboard() {
			let str;

			switch (this.tab) {
			case 0:
				str = this.code;
				break;
			case 1:
				str = this.doc;
				break;
			case 2:
				str = this.hooks;
				break;
			case 3:
				str = this.blockLibs;
				break;
			default:
				str = "";
				break;
			}

			const el = document.createElement("textarea");
			el.value = str;
			el.setAttribute("readonly", "");
			el.style.position = "absolute";
			el.style.left = "-9999px";
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);

			this.snackbar = true;

			setTimeout(() => {
				this.snackbar = false;
			}, 800);
		},

		//Editor
		calculateDDItems(arr) {
			if (arr.length === 0) return "[]";

			let literal = "";

			literal += "[";

			arr.forEach((c) => {
				literal += `\n\t\t\t\t\t\t{
							id: "${c.id}",
                			label: "${c.label}",
                			icon: "${c.icon}",
				\t\t},`;
			});

			literal += "\n\t\t\t\t\t]";

			return literal;
		},

		//Document
		//JSON.stringify = ~595ms
		//traverse = ~497ms with array keys shown
		//traverse = ~514ms without replaces
		//traverse = ~630ms now
		traverse(obj, depth = 0) {
			//Array is considered as object by js
			if (typeof obj !== "object")
				return `"${obj.toString().replace(/\n/g, "\\n").replace(/"/g, "\\\"")}"`;

			let isArray = Array.isArray(obj);

			let str = isArray ? "[\n" : "{\n";
			for (const property in obj) {
				for (let i = 0; i < depth; i++) str += " ";

				if (!isArray) str += `"${property}": `;
				str += `${this.traverse(obj[property], depth + 1)}`;

				let keys = Object.keys(obj);
				if (property !== keys[keys.length - 1]) str += ",";

				str += "\n";
			}
			str += isArray ? "]" : "}";
			return str;
		},

		//~595ms without formatting
		/*traverse(obj, depth = 0) {
			//Array is considered as object by js
			if (typeof obj !== "object")
				return `"${obj.toString().replace(/\n/g, "\\n").replace(/"/g, "\\\"")}"`;

			let isArray = Array.isArray(obj);

			let str = isArray ? "[" : "{";
			for (const property in obj) {
				if (!isArray) str += `"${property}": `;
				str += `${this.traverse(obj[property], depth + 1)}`;

				let keys = Object.keys(obj);
				if (property !== keys[keys.length - 1]) str += ",";
			}
			str += isArray ? "]" : "}";
			return str;
		},*/
	},
};
</script>

<style>
.copyToClipboard {
	position: fixed !important;
	margin: 8px;
	right: 0;
	top: 0;
	z-index: 2;
}

.copyCard {
	position: fixed !important;
	top: 0;
	right: 0;
	width: 100%;
	text-align: right;
	z-index: 2;
	margin-right: 58px;
	margin-top: 4px;
}

.hljs {
	padding: 40px !important;
	display: block;
	height: calc(100vh - 48px);
	background: transparent;
	overflow-y: auto;
}

.hljs::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.hljs::-webkit-scrollbar-thumb {
	background: #757575;
	border-radius: 99999px;
}
.hljs::-webkit-scrollbar-thumb:hover {
	background: white;
}
.hljs::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 99999px;
}

code {
	background-color: transparent !important;
	white-space: pre-wrap;
	overflow: auto;
}
</style>
