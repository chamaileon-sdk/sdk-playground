<template>
	<div class="d-flex flex-column" style="height: calc(100vh - 140px)">
		<h1 class="mb-8">{{ title }}</h1>

		<slot />

		<div class="d-flex mt-6" style="margin-bottom: 100px !important">
			<v-btn
				@click="scrollToFirst"
				target="_blank"
				class="ma-0 mr-3"
				depressed
				color="primary"
			>
				<v-icon left>mdi-palette</v-icon>
				Get Started
			</v-btn>

			<v-btn :href="docUrl" target="_blank" class="ma-0" text color="primary">
				<v-icon left>mdi-book</v-icon>
				Read the docs
			</v-btn>
		</div>

		<img
			v-if="image"
			width="100%"
			style="margin-top: auto"
			class="rounded-0"
			:src="img"
			alt=""
		/>
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
	},

	data() {
		return {
			img: undefined,
		};
	},

	props: {
		title: String,
		docUrl: String,
		image: String,
	},
};
</script>

<style>
.imgWrapper {
	position: relative;
}
</style>
