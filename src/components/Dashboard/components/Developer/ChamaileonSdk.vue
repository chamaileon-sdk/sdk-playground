<template>
	<v-card flat class="pa-4">
		<v-select
			hide-details="true"
			v-model="chamaileonSdk"
			:items="chamaileonSdks"
			outlined
			label="Chamaileon Sdk"
		></v-select>
	</v-card>
</template>

<script>
export default {
	data () {
		return {
			chamaileonSdks: [ 
				"https://plugins.chamaileon.io/static/chamaileonSdk.js",
				"http://localhost:50004/static/chamaileonSdk.js",
				"http://localhost:50004/static/newChamaileonSdk.js",
				"https://plugins.chamaileon.io/static/chamaileonSdk-serverlessGallery.js",
				"http://localhost:50004/static/chamaileonSdk-serverlessGallery.js"
			],
		}
	},
	computed: {
		chamaileonSdk: {
			get() {
				return this.$store.state.sdkConfig.chamaileonSdk;
			},
			set(value) {
				this.$store.commit("updateSDKConfig", { chamaileonSdk: value });
			},
		},
	},
};
</script>

<style></style>
