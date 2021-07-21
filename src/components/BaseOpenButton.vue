<template>
	<div>
		<v-hover v-slot="{ hover }">
			<div class="openbtn pa-3" :class="hover ? 'on-hover' : ''">
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
						open preview
					</div>
				</v-btn>
			</div>
		</v-hover>
		<v-hover v-slot="{ hover }">
			<div class="openbtnl pa-3" :class="hover ? 'on-hover' : ''">
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
						open preview
					</div>
				</v-btn>
			</div>
		</v-hover>
	</div>
</template>

<script>
export default {
	mounted() {
		document.querySelector(".openbtn").style.opacity = 1;
		document.querySelector(".openbtnl").style.opacity = 1;

		setTimeout(() => {
			document.querySelector(".openbtn").style.opacity = "";
			document.querySelector(".openbtnl").style.opacity = "";
		}, 2000);
	},

	methods: {
		emitClick() {
			this.$emit("openEditorClicked");
		},
	},
};
</script>

<style scoped>
.mounted {
	opacity: 1 !important;
}

.openbtn {
	height: 100vh !important;
	width: 128px;
	position: fixed;
	bottom: 0;
	right: 33.33%;
	margin-right: -85px;

	transition: opacity 0.2s ease-in-out;
}

.openbtn:not(.on-hover) {
	opacity: 0;
}

.custom-btn::before {
	color: transparent;
}

.openbtnl {
	height: 100vh !important;
	width: 128px;
	position: fixed;
	bottom: 0;
	left: 256px;

	transition: opacity 0.2s ease-in-out;
}

.openbtnl:not(.on-hover) {
	opacity: 0;
}
</style>
