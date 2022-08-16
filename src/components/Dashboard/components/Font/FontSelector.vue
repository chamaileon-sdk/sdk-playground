<template>
	<v-card flat class="pa-4">
		<v-text-field
			v-model="fontFamily"
			hide-details="true"
			outlined
			label="fontFamily"
		/>
		<br>
		<v-text-field
			v-model="fontUrl"
			hide-details="true"
			outlined
			label="fontUrl"
		/>
	</v-card>
</template>

<script>
export default {
	computed: {
		fontFamily: {
			get() {
				return this.$store.state.sdkConfig.font.family;
			},
			set(value) {
				this.$store.dispatch("updateSdkConfig", {
					font: { ...this.$store.state.sdkConfig.font, family: value },
				});
			},
		},
		fontUrl: {
			get() {
				return this.$store.state.sdkConfig.font.url;
			},
			set(value) {
				this.$store.dispatch("updateSdkConfig", {
					font: { ...this.$store.state.sdkConfig.font, url: value },
				});
			},
		},
	},
};
</script>

<style></style>
