<template>
	<v-btn
		fab
		large
		depressed
		elevation="1"
		class="openbtn mr-11 primary"
		@click="() => this.$emit('openEditorClicked')"
		><v-icon>mdi-eye</v-icon></v-btn
	>
</template>

<script>
export default {};
</script>

<style scoped>
.openbtn {
	position: fixed;
	bottom: 0;
	right: 33.33%;
	margin-bottom: 70px;
	z-index: 2;
}
</style>
