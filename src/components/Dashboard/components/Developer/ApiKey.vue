<template>
	<v-card flat class="pa-4">
		<v-text-field
			hide-details="true"
			v-model="apikey"
			outlined
			label="Key"
		></v-text-field>
	</v-card>
</template>

<script>
export default {
	computed: {
		apikey: {
			get() {
				return this.$store.state.sdkConfig.apiKey;
			},
			set(value) {
				this.$store.commit("updateSDKConfig", { apiKey: value });
			},
		},
	},
};
</script>

<style></style>
