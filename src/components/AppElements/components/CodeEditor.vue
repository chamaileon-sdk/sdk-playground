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
			v-show="route !== '/sdk' && route !== '/emailthumbnail' && tab === 2"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="javascript" :code="hooks" />
		</v-card>

		<v-card
			v-show="route === '/emaileditor' && tab === 3"
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
import sdkCodeGenerator from "./CodeEditor/codeGenerators/sdkCodeGenerator";
import thumbnailCodeGenerator from "./CodeEditor/codeGenerators/thumbnailCodeGenerator";
import previewCodeGenerator from "./CodeEditor/codeGenerators/previewCodeGenerator";
import emailEditorCodeGenerator from "./CodeEditor/codeGenerators/emailEditorCodeGenerator";
import variableEditorCodeGenerator from "./CodeEditor/codeGenerators/variableEditorCodeGenerator";
import blockLibrariesCodeGenerator from "./CodeEditor/codeGenerators/blockLibrariesCodeGenerator";
import documentCodeGenerator from "./CodeEditor/codeGenerators/documentCodeGenerator";

import previewHooksGenerator from "./CodeEditor/hooks/previewHooks";
import variableEditorHooksGenerator from "./CodeEditor/hooks/variableEditorHooks";
import emailEditorHooksGenerator from "./CodeEditor/hooks/emailEditorHooks";

import { mapGetters } from "vuex";

export default {
	data: () => ({
		ignore: 0,
		snackbar: false,
		tab: 0,
	}),

	mounted() {
		let to = this.$route;
		let pageIndex = this.menus.findIndex((el) => el.to === to.path.slice(1));
		let routes = this.menus[pageIndex].children;
		let toInd = routes.findIndex((el) => el.to === to.hash) + 1;

		setTimeout(() => {
			this.scrollToProp(routes[toInd - 1].codePropToMatch);
			this.ignore = 0;
		}, 1000);
	},

	watch: {
		$route(to, from) {
			let pageIndex = this.menus.findIndex((el) => el.to === to.path.slice(1));

			let routes = this.menus[pageIndex].children;

			let toHash = to.hash;
			let fromHash = from.hash;

			let toInd = routes.findIndex((el) => el.to === toHash) + 1;
			let fromInd = routes.findIndex((el) => el.to === fromHash) + 1;

			if (to.hash === "#home") toInd = 0;
			if (from.hash === "#home") fromInd = 0;

			if (toInd === -1 || fromInd === -1) throw "CodeEditor: Menu not found";

			let dist = Math.abs(toInd - fromInd);

			if (this.ignore > 0) {
				this.ignore--;
				return;
			}

			if (toInd === 0)
				document.querySelector("code.hljs").scroll({
					top: 0,
					behavior: "smooth",
				});
			else {
				this.scrollToProp(routes[toInd - 1].codePropToMatch);
			}

			if (dist !== 1) this.ignore = dist;
		},
	},

	computed: {
		...mapGetters({ menus: "getMenu" }),

		route() {
			return this.$route.path;
		},

		doc() {
			return documentCodeGenerator(this.$store.state.document);
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
			return previewHooksGenerator();
		},

		//Email Editor
		blockLibs() {
			return blockLibrariesCodeGenerator(
				this.$store.state.editorConfig.BlockLibData.blockLibsData,
				this.$store.getters.getBlockLibs
			);
		},

		emailCode() {
			return emailEditorCodeGenerator(this.$store.getters.getConfigObject);
		},

		editorHooks() {
			return emailEditorHooksGenerator();
		},

		//Variable Editor
		variableEditorCode() {
			return variableEditorCodeGenerator(
				this.$store.getters.getVariableEditorConfigObject
			);
		},

		variableEditorHooks() {
			return variableEditorHooksGenerator();
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
		scrollToProp(prop) {
			document.querySelectorAll(".hljs-attr").forEach((c) => {
				if (c.innerHTML === prop) {
					let parent = c.parentElement;
					parent.scroll({
						top: c.offsetTop,
						behavior: "smooth",
					});
				}
			});
		},
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
	scrollbar-width: thin;

	font-family: "Source Code Pro", monospace;
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
