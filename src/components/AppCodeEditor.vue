<template>
	<v-card class="rounded-0 pa-0 ma-0" width="100%" dark fixed flat>
		<v-tabs v-model="tab" :show-arrows="true" dark>
			<v-tabs-slider color="yellow"></v-tabs-slider>
			<v-tab> JavaScript </v-tab>
			<v-tab> Document </v-tab>
			<v-tab>Hooks</v-tab>
		</v-tabs>

		<v-card
			v-if="tab === 0"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="javascript" :code="code" />
		</v-card>

		<v-lazy>
			<v-card
				v-if="tab === 1"
				class="rounded-0 pa-0 ma-0"
				width="100%"
				dark
				fixed
				flat
			>
				<highlight-code class="pa-0" lang="javascript" :code="doc" />
			</v-card>
		</v-lazy>

		<v-card
			v-if="tab === 2"
			class="rounded-0 pa-0 ma-0"
			width="100%"
			dark
			fixed
			flat
		>
			<highlight-code class="pa-0" lang="javascript" :code="hooks" />
		</v-card>

		<v-card dark class="copyCard rounded-pill" elevation="0" v-show="snackbar"
			><v-card-text class="pa-2 px-4 success--text"
				>Code Copied to Clipboard</v-card-text
			></v-card
		>
		<v-btn
			dark
			icon
			large
			class="copyToClipboard"
			@click="copyToClipboard(code)"
			><v-icon>mdi-clipboard-file-outline</v-icon></v-btn
		>
	</v-card>
</template>

<script>
export default {
	data: () => ({
		snackbar: false,
		tab: 0,
	}),

	computed: {
		doc() {
			return JSON.stringify(this.$store.state.document, null, "  ");
		},
	},

	props: {
		code: String,
		hooks: String,
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
	z-index: 2;
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
	height: calc(100vh - 48px);
	background: transparent;
	overflow-y: auto;
}

code {
	background-color: transparent !important;
	white-space: pre-wrap;
	overflow: auto;
}
</style>
