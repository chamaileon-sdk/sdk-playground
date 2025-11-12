<template>
	<v-btn
		v-bind="$attrs"
		depressed
		color="success"
		@click="
			() => {
				$emit('click');
			}
		"
	>
		<v-icon left>
			mdi-plus
		</v-icon>
		<slot />
	</v-btn>
</template>

<script>
export default {};
</script>

<style></style>
