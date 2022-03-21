<template>
	<v-card
		color="white"
		app
		elevation="0"
		height="64"
		clipped-left
		class="app-header"
	>
		<div class="left-button-holder ml-3">
			<div class="left-button-wrapper d-flex align-center">
				<v-btn
					icon
					small
					class="mr-2"
				>
					<v-icon>mdi-arrow-left</v-icon>
				</v-btn>
				<span v-for="(button, ind) in headerButtons.left" :key="ind">
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
		</div>

		<div class="text-center">
			<v-toolbar-title class="center">
				{{ documentTitle }}
			</v-toolbar-title>
		</div>

		<div class="right-button-holder mr-3">
			<div class="right-button-wrapper d-flex align-center">
				<span v-for="(button, ind) in headerButtons.right" :key="ind">
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
