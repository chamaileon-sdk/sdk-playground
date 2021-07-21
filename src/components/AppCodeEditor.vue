<template>
	<v-card
		class="rounded-0 text-wrap pa-0 ma-0"
		width="100%"
		height="100%"
		dark
		flat
	>
		<highlight-code
			style="position: fixed"
			class="pa-0"
			lang="javascript"
			:code="code"
		/>
	</v-card>
</template>

<script>
export default {
	props: {
		code: String,
	},
};
</script>

<style>
.hljs {
	padding: 40px !important;
	display: block;
	height: 100vh;
	background: transparent;
	overflow-y: auto;
}

code {
	background-color: transparent !important;
	white-space: pre-wrap;
	overflow: auto;
}
</style>
