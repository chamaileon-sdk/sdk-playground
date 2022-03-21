<template>
	<div>
		<h2>Developer settings</h2>
		<p />
		<OptionsWrapper>
			<EnvironmentName class="rounded-b rounded-0 d-flex pa-4" />
			<v-btn
				target="_blank"
				class="ma-0 mt-3 mr-3"
				depressed
				color="primary"
				@click="updateSDK"
			>
				<v-icon left>
					mdi-sync
				</v-icon>
				INIT SDK
			</v-btn>
			<v-btn
				target="_blank"
				class="ma-0 mt-3 mr-3"
				depressed
				dark
				color="red"
				@click="resetPlayGround"
			>
				<v-icon left>
					mdi-reload-alert
				</v-icon>
				RESET PLAYGROUND
			</v-btn>
		</OptionsWrapper>
	</div>
</template>

<script>
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import EnvironmentName from "./Developer/EnvironmentName.vue";

export default {
	components: {
		OptionsWrapper,
		EnvironmentName,
	},
	methods: {
		updateSDK() {
			this.$store.dispatch("updateSDK");
		},
		resetPlayGround() {
			this.$store.dispatch("resetPlayGround");
		},
	},
};
</script>

<style></style>
