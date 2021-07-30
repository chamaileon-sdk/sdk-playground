<template>
	<div>
		<v-hover v-slot="{ hover }">
			<div class="openbtn ma-3" :class="hover ? 'on-hover' : ''">
				<v-btn
					depressed
					class="grey lighten-3 pa-3 custom-btn primary--text"
					width="100%"
					height="100%"
					@click="emitClick"
				>
					<div
						class="
							d-flex
							flex-wrap flex-column
							text-wrap
							grey--text
							text--darken-2
						"
						style="width: 100px"
					>
						<v-icon class="ma-2">mdi-eye</v-icon>
						preview changes
					</div>
				</v-btn>
			</div>
		</v-hover>
		<v-hover v-slot="{ hover }">
			<div class="openbtnl ma-3" :class="hover ? 'on-hover' : ''">
				<v-btn
					depressed
					class="grey lighten-3 pa-3 custom-btn primary--text"
					width="100%"
					height="100%"
					@click="emitClick"
				>
					<div
						class="
							d-flex
							flex-wrap flex-column
							text-wrap
							grey--text
							text--darken-2
						"
						style="width: 100px"
					>
						<v-icon class="ma-2">mdi-eye</v-icon>
						preview changes
					</div>
				</v-btn>
			</div>
		</v-hover>
	</div>
</template>

<script>
export default {
	mounted() {
		if (this.$route.hash !== "#home") this.showBtns();
	},

	data() {
		return {
			autoShown: false,
		};
	},

	watch: {
		$route(to, from) {
			if (!this.autoShown && to.hash !== "#home") this.showBtns();
		},
	},

	methods: {
		emitClick() {
			this.$emit("openEditorClicked");
		},

		showBtns() {
			document.querySelector(".openbtn").style.opacity = 1;
			document.querySelector(".openbtnl").style.opacity = 1;
			this.autoShown = true;

			setTimeout(() => {
				document.querySelector(".openbtn").style.opacity = "";
				document.querySelector(".openbtnl").style.opacity = "";
			}, 2000);
		},
	},
};
</script>

<style scoped>
.mounted {
	opacity: 1 !important;
}

.openbtn {
	height: calc(100vh - 24px) !important;
	width: 104px;
	position: fixed;
	bottom: 0;
	right: 30.873%;
	transform: translateX(-0%);
	z-index: 5;

	transition: opacity 0.2s ease-in-out;
}

.openbtn:not(.on-hover) {
	opacity: 0;
}

.custom-btn::before {
	color: transparent;
}

.openbtnl {
	height: calc(100vh - 24px) !important;
	width: 104px;
	position: fixed;
	bottom: 0;
	left: 19.127%;

	transition: opacity 0.2s ease-in-out;
}

.openbtnl:not(.on-hover) {
	opacity: 0;
}
</style>
