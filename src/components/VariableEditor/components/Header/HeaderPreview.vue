<template>
	<v-card
		app
		height="64"
		flat
		class="d-flex align-center px-3 flex-wrap"
	>
		<div>
			<v-btn
				text
				icon
				class="mr-2"
				color="#000"
			>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
			<span v-for="(button, ind) in headerButtons.left" :key="ind">
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
			<span v-for="(button, ind) in headerButtons.right" :key="ind">
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
		...mapGetters(["headerButtons", "documentTitle"]),
	},
};
</script>

<style scoped>
.center {
	margin: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
#logo {
	position: absolute;
	left: 0;
	right: 0;
	margin-left: auto;
	margin-right: auto;
	overflow: hidden;
	width: 250px;
	height: 58px;
	z-index: 3;
}
#logo svg {
	fill: var(--v-primary-base);
	display: inline-block;
	vertical-align: middle;
	transform: translate3d(0px, 0px, 0px);
	-webkit-transform: translate3d(0px, 0px, 0px);
	-webkit-transition: fill 0.3s linear;
	transition: fill 0.3s linear;
}
#logo > * {
	margin: auto;
	display: block;
}

.right-button-holder {
	margin: 0;
	position: absolute;
	top: 50%;
	right: 0%;
	transform: translateY(-50%);
}
.right-button-wrapper {
	right: 0%;
}

.left-button-holder {
	margin: 0;
	position: absolute;
	top: 50%;
	left: 0%;
	transform: translateY(-50%);
}
.left-button-wrapper {
	left: 0%;
}
</style>
