<template>
	<v-card flat class="pa-4">
		<v-text-field
			hide-details="true"
			v-model="environmentName"
			outlined
			label="environmentName"
		></v-text-field>
	</v-card>
</template>

<script>
export default {
	computed: {
		environmentName: {
			get() {
				return this.$store.state.sdkConfig.environmentName;
			},
			set(value) {
				this.$store.commit("updateSDKConfig", { environmentName: value });
			},
		},
	},
};
</script>

<style></style>
