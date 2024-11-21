<template>
	<v-card flat class="pa-4">
		<v-select
			v-model="locale"
			hide-details="true"
			:items="['de','en', 'es', 'fr', 'hu', 'it', 'pt-br', 'ru', 'sl', 'zh-tw']"
			outlined
			label="Language"
		/>
	</v-card>
</template>

<script>
export default {
	computed: {
		locale: {
			get() {
				return this.$store.state.sdkConfig.locale;
			},
			set(value) {
				this.$store.dispatch("updateSdkConfig", { locale: value });
			},
		},
	},
};
</script>

<style></style>
