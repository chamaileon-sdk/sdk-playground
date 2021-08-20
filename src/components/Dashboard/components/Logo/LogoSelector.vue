<template>
	<v-card color="transparent" elevation="0">
		<v-tabs
			height="auto"
			color="primary"
			background-color="transparent"
			hide-slider
			show-arrows="always"
		>
			<v-tab
				class="pa-0 mr-3"
				@click="
					changeLogo(
						'https://plugins.chamaileon.io/mega-spa/3.2.2/createLogoWithText.js'
					)
				"
			>
				<v-card
					elevation="0"
					class="pa-5 d-flex"
					height="100px"
					width="220px"
					:style="`fill: ${
						this.$vuetify.presets.framework.theme.themes.light.primary
					}; ${calculateOpacity(
						'https://plugins.chamaileon.io/mega-spa/3.2.2/createLogoWithText.js'
					)}`"
					v-chamaileonLogo
				></v-card>
			</v-tab>
			<v-tab
				v-for="(l, i) in logos"
				:key="i"
				class="pa-0 mx-3"
				@click="changeLogo(l.url)"
			>
				<v-card
					class="pa-5"
					height="100px"
					width="220px"
					elevation="0"
					:style="calculateOpacity(l.url)"
				>
					<div style="position: relative; height: 100%">
						<div
							style="
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								z-index: 2;
							"
						></div>
						<iframe
							width="100%"
							height="100%"
							style="z-index: 1; top: 0; left: 0; position: relative"
							:srcdoc="processScript(l.url)"
							frameborder="0"
						></iframe>
					</div>
				</v-card>
			</v-tab>
			<v-tab
				class="pa-0 mx-3"
				href="https://github.com/chamaileon-sdk/splashscreen-and-logo-examples"
				target="_blank"
			>
				<v-card
					class="pa-5 d-flex align-center justify-center flex-column createNew"
					height="100px"
					width="220px"
					elevation="0"
					color="grey--text"
				>
					<v-icon class="pa-0 ma-0" x-large>mdi-plus</v-icon>
					<v-card-text class="pa-0 ma-0">Create your own</v-card-text>
				</v-card>
			</v-tab>
		</v-tabs>
	</v-card>
</template>

<script>
const chamaileonLogo = require("chamaileon-logo");

export default {
	data() {
		return {
			logos: [
				{
					url: "https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js",
				},
			],
		};
	},
	directives: {
		chamaileonLogo: {
			inserted: function (el) {
				el.appendChild(chamaileonLogo({ withText: true }));
			},
		},
	},
	computed: {
		border() {
			return `box-sizing: border-box; border: 4px solid ${this.$vuetify.presets.framework.theme.themes.light.primary}; border-radius: 12px;`;
		},
		storedUrl() {
			return this.$store.state.sdkConfig.urls.createLogoJS;
		},
	},
	methods: {
		changeLogo(value) {
			this.$store.commit("updateSDKConfig", {
				urls: { ...this.$store.state.sdkConfig.urls, createLogoJS: value },
			});
		},
		processScript: function (url) {
			const importScript = document.createElement("script");
			importScript.src = url;
			importScript.type = "text/javascript";
			importScript.async = false;

			const runScript = document.createElement("script");
			runScript.innerText =
				"document.getElementById(\"container\").appendChild(createLogo());";

			const html = `<html><head></head><body style="margin: 0"><div id="container" style="display: flex; height: 100vh; align-items: center; margin: 0; padding: 0; justify-content: center;">
      ${importScript.outerHTML}${runScript.outerHTML}
      </div></body></html>`;
			return html;
		},
		calculateOpacity(url) {
			if (url === this.storedUrl) return "opacity: 1; transition: 200ms;";

			return "opacity: 0.5; transition: 200ms;";
		},
	},
};
</script>

<style scoped>
.v-card:hover {
	opacity: 1 !important;
	transition: 200ms;
}

.createNew {
	border: 1px solid;
	opacity: 0.3;
}
</style>
