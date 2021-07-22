<template>
	<v-app>
		<MenuReworked />

		<v-navigation-drawer permanent app right width="30%">
			<CodeEditor :code="'console.log(app)'" />
		</v-navigation-drawer>

		<v-main>
			<router-view />
		</v-main>
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
</style>
