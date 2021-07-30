<template>
	<v-app>
		<h1 class="mb-8">{{ title }}</h1>
		<p>
			{{ paragraph1 }}
		</p>

		<p>
			{{ paragraph2 }}
		</p>

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
			<v-img
				:transition="false"
				:eager="true"
				:src="require(`@/assets/${image}`)"
			></v-img>
		</v-card>
	</v-app>
</template>

<script>
export default {
	props: {
		title: String,
		paragraph1: String,
		paragraph2: String,
		docUrl: String,
		image: String,
	},
};
</script>

<style></style>
