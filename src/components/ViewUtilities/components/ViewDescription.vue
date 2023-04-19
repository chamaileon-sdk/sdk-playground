<template>
	<div class="d-flex flex-column" style="height: calc(100vh - 140px)">
		<h1 class="mb-8">
			{{ title }}
		</h1>

		<slot />

		<div style="margin-top: 23px; margin-bottom: 80px !important">
			<v-btn
				v-if="!hideGetStarted"
				target="_blank"
				class="ma-0 mr-3"
				depressed
				color="primary"
				@click="scrollToFirst"
			>
				<v-icon left>
					mdi-palette
				</v-icon>
				Get Started
			</v-btn>

			<v-btn
				v-if="docUrl"
				:href="docUrl"
				target="_blank"
				class="ma-0"
				:text="!hideGetStarted"
				:depressed="hideGetStarted"
				color="primary"
			>
				<v-icon left>
					mdi-book
				</v-icon>
				docs
			</v-btn>

			<v-btn
				v-if="readMoreUrl"
				:href="readMoreUrl"
				target="_blank"
				class="ma-0"
				:text="!hideGetStarted"
				:depressed="hideGetStarted"
				color="primary"
			>
				<v-icon left>
					mdi-book-open
				</v-icon>
				read more
			</v-btn>
		</div>

		<div
			v-if="buttonText"
			v-observe-visibility="{
				callback: visibilityChanged,
				intersection: {
					threshold: 0.5,
				},
			}"
			class="previewBtn"
		>
			<v-btn
				depressed
				class="grey lighten-3 pa-3 custom-btn primary--text"
				:disabled="isInited === 'pending'"
				:loading="isInited === 'pending'"
				width="100%"
				height="100%"
				min-width="0"
				@click="emitClick"
			>
				<div
					class="
					d-flex
					flex-wrap flex-column
					grey--text
					text--darken-2
				"
					style="width: 100px"
				>
					<v-icon>mdi-eye</v-icon>
					<span>{{ buttonText }}</span>
				</div>
			</v-btn>
		</div>

		<InlineSvg
			:src="img"
			width="100%"
			:fill="$vuetify.theme.themes.light.primary "
			style="margin-top: auto"
			class="rounded-0"
			alt=""
		/>
	</div>
</template>

<script>
export default {

	props: {
		// eslint-disable-next-line vue/require-default-prop
		title: String,
		// eslint-disable-next-line vue/require-default-prop
		docUrl: String,
		// eslint-disable-next-line vue/require-default-prop
		readMoreUrl: String,
		// eslint-disable-next-line vue/require-default-prop
		image: String,
		hideGetStarted: {
			type: Boolean,
			default: false,
		},
		// eslint-disable-next-line vue/require-default-prop
		buttonText: String,
		isInited: {
			type: [Boolean, String],
			default: false,
			required: false,
		},
	},

	data() {
		return {
			img: undefined,
		};
	},
	created() {
		this.img = `./assets/${this.image}`;
	},

	methods: {
		scrollToFirst() {
			window.scrollTo({ top: window.innerHeight + 80, behavior: "smooth" });
		},
		visibilityChanged(isVisible) {
			this.$emit("showPreviewButton", isVisible);
		},
		emitClick() {
			this.$emit("previewClick");
		},
	},
};
</script>

<style scoped>
.imgWrapper {
	position: relative;
}

.previewBtn {
	width: 35vw;
	height: 50px;
	margin: auto;
	margin-bottom: 60px;
}

</style>
