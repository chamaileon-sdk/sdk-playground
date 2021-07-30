<template>
	<v-btn
		depressed
		@click="
			() => {
				this.$emit('click');
			}
		"
		color="success"
	>
		<v-icon left> mdi-plus </v-icon>
		<slot />
	</v-btn>
</template>

<script>
export default {};
</script>

<style></style>
