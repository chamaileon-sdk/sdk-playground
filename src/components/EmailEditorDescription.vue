<template>
	<div>
		<h1>Email Editor</h1>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum autem,
			saepe optio officia laudantium sunt architecto quis praesentium explicabo
			quo veniam ducimus atque deleniti asperiores cupiditate molestiae et.
			Recusandae, cum!
		</p>

		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem
			incidunt, voluptate laborum temporibus iste sequi soluta atque molestias
			dolorum error cumque! Iste beatae ad sint alias repellat illo libero
			similique.
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
					href="https://chamaileon.io/sdk/docs/email-editor/"
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
	components: {
		OptionWrapper,
	},
};
</script>

<style></style>
