<template>
	<v-card
		style="position: fixed"
		class="rounded-0"
		width="100%"
		height="100%"
		dark
		flat
	>
		<highlight-code lang="javascript" :code="code" />
	</v-card>
</template>

<script>
export default {
	props: {
		code: String,
	},
};
</script>

<style></style>
