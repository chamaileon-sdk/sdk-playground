<template>
	<div class="d-flex flex-column" style="height: calc(100vh - 140px)">
		<h1 class="mb-8">{{ title }}</h1>

		<slot />

		<div style="margin-top: 23px; margin-bottom: 80px !important">
			<v-btn
				v-if="!hideGetStarted"
				@click="scrollToFirst"
				target="_blank"
				class="ma-0 mr-3"
				depressed
				color="primary"
			>
				<v-icon left>mdi-palette</v-icon>
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
				<v-icon left>mdi-book</v-icon>
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
				<v-icon left>mdi-book-open</v-icon>
				read more
			</v-btn>

		</div>

		<div v-if="buttonText" class="previewBtn" v-observe-visibility="{
				callback: visibilityChanged,
				intersection: {
					threshold: 0.5,
				},
		}">
			<v-btn
				depressed
				class="grey lighten-3 pa-3 custom-btn primary--text"
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
				<v-icon >mdi-eye</v-icon>
				<span>{{this.buttonText}}</span>
				</div>
			</v-btn>
		</div>

		<inline-svg 
			:src="img" 
			width="100%" 
			:fill="this.$vuetify.theme.themes.light.primary "
			style="margin-top: auto"
			class="rounded-0"
			alt=""
		></inline-svg>
	</div>
</template>

<script>
export default {
	created() {
		this.img = require(`@/assets/${this.image}`);
	},

	methods: {
		scrollToFirst() {
			window.scrollTo({ top: window.innerHeight + 80, behavior: "smooth" });
		},
		visibilityChanged (isVisible) {
			this.$emit("showPreviewButton", isVisible);
		},
		emitClick() {
			this.$emit("previewClick");
		}
	},

	data() {
		return {
			img: undefined,
		};
	},

	props: {
		title: String,
		docUrl: String,
		readMoreUrl: String,
		image: String,
		hideGetStarted: {
			type: Boolean,
			default: false,
		},
		buttonText: String
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
