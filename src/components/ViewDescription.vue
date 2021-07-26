<template>
	<div>
		<h1>{{ title }}</h1>
		<p>
			{{ paragraph1 }}
		</p>

		<p>
			{{ paragraph2 }}
		</p>

		<OptionWrapper
			style="
				background-color: rgba(0, 0, 0, 0) !important;
				border: none;
				/*padding-right: 0 !important;*/
			"
		>
			<div class="d-flex">
				<v-btn
					:href="docUrl"
					target="_blank"
					class="ml-auto ma-0"
					text
					color="primary"
				>
					<v-icon left>mdi-book</v-icon>
					Read the docs
				</v-btn>
			</div>
		</OptionWrapper>
	</div>
</template>

<script>
import OptionWrapper from "./optionWrapper.vue";

export default {
	props: {
		title: String,
		paragraph1: String,
		paragraph2: String,
		docUrl: String,
	},

	components: {
		OptionWrapper,
	},
};
</script>

<style></style>
