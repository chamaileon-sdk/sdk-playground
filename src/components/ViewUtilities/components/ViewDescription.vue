<template>
	<div class="d-flex flex-column" style="height: calc(100vh - 140px)">
		<h1 class="mb-8">{{ title }}</h1>

		<slot />

		<div class="d-flex mt-11">
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

		<v-card v-if="image" class="mt-auto rounded-0" flat>
			<img class="rounded-0" width="100%" :src="img" alt="" />
		</v-card>
	</div>
</template>

<script>
export default {
	created() {
		this.img = require(`@/assets/${this.image}`);
	},

	methods: {
		scrollToFirst() {
			console.log("scroll");
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

<style></style>
