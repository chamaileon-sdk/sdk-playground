<template>
	<v-app>
		<h1 class="mb-8">{{ title }}</h1>

		<div v-for="(paragraph, idx) in paragraphs" :key="title + idx">
			<p>{{ paragraph }}</p>
		</div>

		<div class="d-flex mt-11">
			<v-btn
				:href="docUrl"
				target="_blank"
				class="ma-0"
				depressed
				color="primary"
			>
				<v-icon left>mdi-book</v-icon>
				Read the docs
			</v-btn>
		</div>

		<v-card v-if="image" class="mt-16" flat>
			<img width="100%" :src="img" alt="" />
		</v-card>
	</v-app>
</template>

<script>
//TODO: use slot here

export default {
	created() {
		this.img = require(`@/assets/${this.image}`);
	},

	data() {
		return {
			img: undefined,
		};
	},

	props: {
		title: String,
		paragraphs: Array,
		docUrl: String,
		image: String,
	},
};
</script>

<style></style>
