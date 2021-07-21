<template>
	<v-card
		style="position: fixed"
		class="rounded-0"
		width="100%"
		height="100%"
		dark
		flat
	>
		<highlight-code lang="javascript" :code="testcode" />
	</v-card>
</template>

<script>
export default {
	mounted() {
		let el = document.getElementById("codeContainer");
		console.log(el);
	},
	data() {
		return {
			testcode: "console.log(\"hello world\");\n\tasd",
			CodeMirror: null,
		};
	},
};
</script>

<style></style>
