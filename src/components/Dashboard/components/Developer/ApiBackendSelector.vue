<template>
	<v-card flat class="pa-4">
		<v-select
			v-model="apiBackend"
			hide-details="true"
			:items="apiBackends"
			outlined
			label="API-Backend"
		/>
	</v-card>
</template>

<script>
export default {
	data() {
		return {
			apiBackends: [
				"http://localhost:12101/api/v2/tokens/generate",
				"https://sdk-demo-api.chamaileon.io/getAuthToken",
			],
		};
	},
	computed: {
		apiBackend: {
			get() {
				return this.$store.state.sdkConfig.apiBackend;
			},
			set(value) {
				localStorage.removeItem("chamaileonSdkAccessTokenCache");
				this.$store.dispatch("updateSdkConfig", { apiBackend: value });
			},
		},
	},
};
</script>

<style></style>
