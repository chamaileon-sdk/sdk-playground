<template>
	<v-card
		class="rounded-0 text-wrap pa-0 ma-0"
		width="100%"
		height="100%"
		dark
		flat
	>
		<v-card class="copyCard rounded-pill" elevation="0" v-show="snackbar"
			><v-card-text class="pa-2 px-4 success--text"
				>Code Copied to Clipboard</v-card-text
			></v-card
		>
		<v-btn icon large class="copyToClipboard" @click="copyToClipboard(code)"
			><v-icon>mdi-clipboard-file-outline</v-icon></v-btn
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
	data: () => ({
		snackbar: false,
	}),

	props: {
		code: String,
	},

	methods: {
		copyToClipboard(str) {
			console.log("copy");
			const el = document.createElement("textarea");
			el.value = str;
			el.setAttribute("readonly", "");
			el.style.position = "absolute";
			el.style.left = "-9999px";
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);

			this.snackbar = true;

			setTimeout(() => {
				this.snackbar = false;
			}, 800);
		},
	},
};
</script>

<style>
.copyToClipboard {
	position: fixed !important;
	margin: 40px;
	right: 0;
	top: 0;
	z-index: 1;
	opacity: 0.15;
}

.copyCard {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 2;
	margin-right: 90px;
	margin-top: 40px;
}

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
