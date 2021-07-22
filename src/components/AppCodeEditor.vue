<template>
	<v-card class="rounded-0 pa-0 ma-0" width="100%" dark fixed flat>
		<v-tabs v-model="tab" :show-arrows="true" dark>
			<v-tabs-slider color="yellow"></v-tabs-slider>
			<v-tab> JavaScript </v-tab>
			<v-tab> Document </v-tab>
			<v-tab>Hooks</v-tab>
		</v-tabs>

		<v-card
			v-if="tab === 0"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="javascript" :code="code" />
		</v-card>

		<v-lazy>
			<v-card
				v-show="tab === 1"
				class="rounded-0 pa-0 ma-0"
				width="100%"
				dark
				fixed
				flat
			>
				<highlight-code class="pa-0" lang="javascript" :code="doc" />
			</v-card>
		</v-lazy>

		<v-card
			v-if="tab === 2"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="javascript" :code="hooks" />
		</v-card>

		<v-card dark class="copyCard rounded-pill" elevation="0" v-show="snackbar"
			><v-card-text class="pa-2 px-4 success--text"
				>Code Copied to Clipboard</v-card-text
			></v-card
		>
		<v-btn
			dark
			icon
			large
			class="copyToClipboard"
			@click="copyToClipboard(code)"
			><v-icon>mdi-clipboard-file-outline</v-icon></v-btn
		>
	</v-card>
</template>

<script>
export default {
	data: () => ({
		snackbar: false,
		tab: 0,
	}),

	computed: {
		doc() {
			return JSON.stringify(this.$store.state.document, null, "  ");
		},

		//Sdk
		sdkConfig() {
			return this.$store.state.sdkConfig;
		},
		sdkCode() {
			return `const chamaileonPlugins = await window.chamaileonSdk.init({
    mode: "serverless",
    accessToken: accessToken,
    whitelabel: {
		urls: {
            createLogoJS: "${this.sdkConfig.urls.createLogoJS}"
			splashScreen: "${this.sdkConfig.urls.splashScreen}",
        },
        colors: {
			primary: "${this.sdkConfig.colors.primary}",
            secondary: "${this.sdkConfig.colors.secondary}",
        }
		locale: '${this.sdkConfig.locale}',
    }
});`;
		},

		//Thumbnail
		thumbnailConfig() {
			return this.$store.getters.getThumbnailSettings;
		},
		thumbnailCode() {
			return `const thumbnailInstance = await chamaileonPlugins.createThumbnail({
    document: {}, 
    container: "${this.thumbnailConfig.container}", //Can change it in your code
    width: ${this.thumbnailConfig.width},
    height: ${this.thumbnailConfig.height},
    scale: ${this.thumbnailConfig.scale}
    scroll: ${this.thumbnailConfig.scroll},
});`;
		},

		//Preview
		previewConfig() {
			return this.$store.getters.getPreviewConfigObject;
		},

		calculatePreviewHeader() {
			let literal = "";
			let arr = this.previewConfig.settings.buttons.header;

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
	c.items
		? `,\n\t\t\t\t\titems: ${this.calculatePreviewDDItems(c.items)}`
		: ""
}
				},`;
			});
			literal += `
			]`;
			return literal;
		},

		previewCode() {
			return `const previewConfig = {
    document: {}, 
    settings: {
      buttons: {
        header: ${this.calculatePreviewHeader}
      }
    },
    hooks: {} 
};

const previewInstance = await chamaileonPlugins.previewEmail(previewConfig);`;
		},

		//Email Editor
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
					accessLevel: '${c.accessLevel}'
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
	// a JSON object that represents the email document
    document: {},
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
    hooks: hooks
});`;
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
    document: {},
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
    hooks: {}
};

const variableEditorInstance = await chamaileonPlugins.editVariables(variableEditorConfig)`;
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
	},

	props: {
		hooks: String,
	},

	methods: {
		copyToClipboard(str) {
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

		//Preview
		calculatePreviewDDItems(arr) {
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
	},
};
</script>

<style>
.copyToClipboard {
	position: fixed !important;
	margin: 40px;
	right: 0;
	top: 0;
	z-index: 2;
	opacity: 0.15;
}

.copyCard {
	position: fixed !important;
	top: 0;
	right: 0;
	z-index: 2;
	margin-right: 90px;
	margin-top: 40px;
}

.hljs {
	padding: 40px !important;
	display: block;
	height: calc(100vh - 48px);
	background: transparent;
	overflow-y: auto;
}

code {
	background-color: transparent !important;
	white-space: pre-wrap;
	overflow: auto;
}
</style>
