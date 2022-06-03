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
					v-if="!button.items"
					:id="button.id"
					:label="button.label"
					:color="button.color"
					:depressed="button.style === 'depressed'"
					:text="button.style === 'text'"
					:outlined="button.style === 'outlined'"
					:rounded="button.style === 'rounded'"
					:icon="!button.label"
					class="ml-2"
				>
					<div
						class="d-flex align-center"
						:class="{ 'white--text': button.style === 'depressed' }"
					>
						<v-icon v-if="button.icon">
							mdi-{{ button.icon }}
						</v-icon>
						<span v-if="button.label" class="ml-2">
							{{ button.label }}
						</span>
					</div>
				</v-btn>
			</span>
		</div>

		<v-spacer />

		<div>
			<span v-for="(button, ind) in footerButtons.right" :key="ind">
				<v-btn
					v-if="!button.items"
					:id="button.id"
					:label="button.label"
					:color="button.color"
					:depressed="button.style === 'depressed'"
					:text="button.style === 'text'"
					:outlined="button.style === 'outlined'"
					:rounded="button.style === 'rounded'"
					:icon="!button.label"
					class="ml-2"
				>
					<div
						class="d-flex align-center"
						:class="{ 'white--text': button.style === 'depressed' }"
					>
						<v-icon v-if="button.icon">
							mdi-{{ button.icon }}
						</v-icon>
						<span v-if="button.label" class="ml-2">
							{{ button.label }}
						</span>
					</div>
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
