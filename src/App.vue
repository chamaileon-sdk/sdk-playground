<template>
	<v-app>
		<v-navigation-drawer width="19.127%" app permanent>
			<MenuReworked />
		</v-navigation-drawer>

		<v-main>
			<div class="px-16 pa-0">
				<div class="px-16">
					<router-view />
				</div>
			</div>
		</v-main>

		<v-navigation-drawer
			class="hideScrollY"
			width="30.873%"
			app
			right
			permanent
		>
			<CodeEditor />
		</v-navigation-drawer>
	</v-app>
</template>

<script>
import CodeEditor from "./components/AppCodeEditor.vue";
import MenuReworked from "./components/MenuReworked.vue";

export default {
	components: {
		MenuReworked,
		CodeEditor,
	},
	created() {
		this.$store.commit("updateSDKConfig", {
			colors: {
				...this.$store.state.sdkConfig.colors,
				primary: this.$vuetify.presets.framework.theme.themes.light.primary,
				secondary: this.$vuetify.presets.framework.theme.themes.light.secondary,
			},
		});
	},
	mounted() {
		this.$store.dispatch("initSDK", {
			apiKey: "Y8mbu7S5Qh4cyCqJCVBn",
		});

		window.onbeforeunload = function () {
			localStorage.setItem(
				"sdkConfig",
				JSON.stringify(this.$store.state.sdkConfig)
			);
			localStorage.setItem(
				"editorConfig",
				JSON.stringify(this.$store.state.editorConfig)
			);
			localStorage.setItem(
				"previewConfig",
				JSON.stringify(this.$store.state.previewConfig)
			);
			localStorage.setItem(
				"variableEditorConfig",
				JSON.stringify(this.$store.state.variableEditorConfig)
			);
			localStorage.setItem(
				"thumbnailConfig",
				JSON.stringify(this.$store.state.thumbnailConfig)
			);
		}.bind(this);

		for (let elem of [
			"sdkConfig",
			"editorConfig",
			"previewConfig",
			"variableEditorConfig",
			"thumbnailConfig",
		])
			if (localStorage.getItem(elem))
				this.$store.commit(
					`${elem}Load`,
					JSON.parse(localStorage.getItem(elem))
				);
	},
};
</script>

<style>
html {
	font-family: Roboto, sans-serif;
}

html::-webkit-scrollbar {
	width: 0 !important;
	height: 0 !important;
}

.list3 {
	overflow: overlay;
}

.list3::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.list3::-webkit-scrollbar-thumb {
	background: #e0e0e0;
	border-radius: 99999px;
}
.list3::-webkit-scrollbar-thumb:hover {
	background: #bdbdbd;
}
.list3::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 99999px;
}

.rightSection {
	width: 30.873%;
	height: 100vh;
	right: 0;
}

.midSection {
	width: 50%;
}

.leftSection {
	width: 19.127%;
	height: 100vh;
	left: 0;
}

.section {
	/*padding: 96px 0;*/
	padding: 70px 0;
	min-height: 100vh;
}

.hideScrollY .v-navigation-drawer__content {
	overflow-y: hidden !important;
}

h1 {
	margin-bottom: 16px;
}

h3 {
	margin-top: 32px;
	margin-bottom: 8px;
}

/*.editorContainer {
	position: fixed;
	right: 0;
	width: calc((100% - 256px) * 0.3333) !important;
}*/
</style>
