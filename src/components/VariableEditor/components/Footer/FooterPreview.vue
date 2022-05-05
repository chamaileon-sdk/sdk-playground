<template>
	<v-card
		app
		height="64"
		flat
		class="d-flex align-center px-3 flex-wrap"
	>
		<div>
			<span v-for="(button, ind) in footerButtons.left" :key="ind">
				<v-btn
					v-if="!button.icon"
					outlined
					class="mr-2"
				>
					{{ button.label }}
				</v-btn>

				<v-btn
					v-if="button.icon"
					icon
					small
					class="mr-2"
				>
					<v-icon>mdi-{{ button.icon }}</v-icon>
				</v-btn>
			</span>
		</div>

		<v-spacer />

		<div>
			<span v-for="(button, ind) in footerButtons.right" :key="ind">
				<v-btn
					v-if="!button.icon"
					outlined
					class="ml-2"
				>
					{{ button.label }}
				</v-btn>

				<v-btn
					v-if="button.icon"
					icon
					small
					class="ml-2"
				>
					<v-icon>mdi-{{ button.icon }}</v-icon>
				</v-btn>
			</span>
		</div>
	</v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters([ "footerButtons" ]),
	},
};
</script>

<style></style>
