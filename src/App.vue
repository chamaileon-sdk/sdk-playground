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

		<v-navigation-drawer width="30.873%" app right permanent>
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
	},
};
</script>

<style>
html {
	font-family: Roboto, sans-serif;
}

html::-webkit-scrollbar {
	width: 0;
	height: 0;
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
