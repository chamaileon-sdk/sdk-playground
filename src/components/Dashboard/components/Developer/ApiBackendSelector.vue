<template>
	<v-card flat class="pa-4">
		<v-select
			hide-details="true"
			v-model="apiBackend"
			:items="apiBackends"
			outlined
			label="API-Backend"
		></v-select>
	</v-card>
</template>

<script>
export default {
	data () {
		return {
			apiBackends: ["https://sdk-demo-api.chamaileon.io/getAuthToken", "https://sdk-api.chamaileon.io/api/v1/tokens/generate", "https://sdk-api-staging.chamaileon.io/api/v1/tokens/generate"],
		}
	},
	computed: {
		apiBackend: {
			get() {
				return this.$store.state.sdkConfig.apiBackend;
			},
			set(value) {
				this.$store.commit("updateSDKConfig", { apiBackend: value });
			},
		},
	},
};
</script>

<style></style>
