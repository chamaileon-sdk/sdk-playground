<template>
	<v-card flat class="pa-4">
		<v-text-field
			v-model="environmentName"
			hide-details="true"
			outlined
			label="environmentName"
		/>
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
				this.$store.dispatch("updateSdkConfig", { environmentName: value });
			},
		},
	},
};
</script>

<style></style>
