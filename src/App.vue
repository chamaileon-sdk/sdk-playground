<template>
	<v-app v-if="isAvailable">
		<v-navigation-drawer
			class="leftSection"
			width="19.127%"
			app
			permanent
		>
			<Menu />
		</v-navigation-drawer>

		<v-main>
			<div class="px-16 pa-0">
				<div class="px-lg-8 px-xl-16">
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

	<v-app v-else>
		<NotAvailable />
	</v-app>
</template>

<script>
import CodeEditor from "./components/AppElements/components/CodeEditor.vue";
import Menu from "./components/AppElements/components/Menu.vue";
import NotAvailable from "./components/AppElements/components/NotAvailable.vue";

export default {
	components: {
		// eslint-disable-next-line vue/no-reserved-component-names
		Menu,
		CodeEditor,
		NotAvailable,
	},
	data() {
		return {
			localStorageVersion: "v8",
		};
	},
	computed: {
		isAvailable() {
			return this.$vuetify.breakpoint.width > 960;
		},
	},
	created() {
		this.$store.dispatch("updateSdkConfig", {
			colors: {
				...this.$store.state.sdkConfig.colors,
				primary: this.$vuetify.presets.framework.theme.themes.light.primary,
				secondary: this.$vuetify.presets.framework.theme.themes.light.secondary,
			},
		});
	},
	mounted() {
		window.onbeforeunload = function () {
			localStorage.setItem(
				`sdkConfig_${this.localStorageVersion}`,
				JSON.stringify(this.$store.state.sdkConfig),
			);
			localStorage.setItem(
				`emailEditorConfig_${this.localStorageVersion}`,
				JSON.stringify(this.$store.state.editorConfig),
			);
			localStorage.setItem(
				`previewConfig_${this.localStorageVersion}`,
				JSON.stringify(this.$store.state.previewConfig),
			);
			localStorage.setItem(
				`variableEditorConfig_${this.localStorageVersion}`,
				JSON.stringify(this.$store.state.variableEditorConfig),
			);
			localStorage.setItem(
				`thumbnailConfig_${this.localStorageVersion}`,
				JSON.stringify(this.$store.state.thumbnailConfig),
			);
			localStorage.setItem(
				`generatorConfig_${this.localStorageVersion}`,
				JSON.stringify(this.$store.state.generatorConfig),
			);
			localStorage.setItem(
				`emailDocument_${this.localStorageVersion}`,
				JSON.stringify(this.$store.state.document),
			);
			localStorage.setItem(
				`galleryConfig_${this.localStorageVersion}`,
				JSON.stringify(this.$store.state.megaGalleryConfig),
			);
		}.bind(this);

		this.$store.commit("setLocalStorageLoaded", "pending");
		for (const elem of [
			`sdkConfig_${this.localStorageVersion}`,
			`emailEditorConfig_${this.localStorageVersion}`,
			`previewConfig_${this.localStorageVersion}`,
			`galleryConfig_${this.localStorageVersion}`,
			`variableEditorConfig_${this.localStorageVersion}`,
			`thumbnailConfig_${this.localStorageVersion}`,
			`generatorConfig_${this.localStorageVersion}`,
			`emailDocument_${this.localStorageVersion}`,
		]) {
			if (localStorage.getItem(elem)) {
				this.$store.commit(
					`${elem.replace(`_${this.localStorageVersion}`, "")}Load`,
					JSON.parse(localStorage.getItem(elem)),
				);
			}
		}
		this.$store.commit("setLocalStorageLoaded", true);
		this.$store.dispatch("fetchDummyHtml");
	},
};
</script>

<style>
html {
	font-family: Roboto, sans-serif;
	scrollbar-width: none;
}

html::-webkit-scrollbar {
	width: 0 !important;
	height: 0 !important;
}

.list3 {
	overflow-y: scroll;
	scrollbar-width: thin;
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

.leftSection :first-child {
	scrollbar-width: thin;
}

.leftSection :first-child::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.leftSection :first-child::-webkit-scrollbar-thumb {
	background: #e0e0e0;
	border-radius: 99999px;
}
.leftSection :first-child::-webkit-scrollbar-thumb:hover {
	background: #bdbdbd;
}
.leftSection :first-child::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 99999px;
}

.section {
	/*padding: 96px 0;*/
	padding: 70px 0;
	min-height: 100vh;
	margin-bottom: 100px;
}

.section:last-child {
	margin-bottom: 0px;
}

.hideScrollY .v-navigation-drawer__content {
	overflow-y: hidden !important;
}

h1 {
	font-size: 40px;
}

h2 {
	font-size: 32px;
	margin-bottom: 11px;
}

h3 {
	margin-top: 10px;
	margin-bottom: 16px;
}

p {
	/*margin-top: 9px !important;*/
	margin-bottom: 25px !important;
}

/*.editorContainer {
	position: fixed;
	right: 0;
	width: calc((100% - 256px) * 0.3333) !important;
}*/
</style>
