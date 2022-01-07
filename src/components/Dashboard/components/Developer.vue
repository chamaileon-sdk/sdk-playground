<template>
	<div>
		<h2>Developer settings</h2>
		<p>
			
		</p>
		<OptionsWrapper>
			<ChamaileonSdk class="rounded-0 d-flex pa-4"/>
			<EnvironmentName class="rounded-b rounded-0 d-flex pa-4"/>
			<v-btn
				@click="updateSDK"
				target="_blank"
				class="ma-0 mt-3 mr-3"
				depressed
				color="primary"
			>
				<v-icon left>mdi-sync</v-icon>
					INIT SDK
			</v-btn>
			<v-btn
				@click="resetPlayGround"
				target="_blank"
				class="ma-0 mt-3 mr-3"
				depressed
				dark
				color="red"
			>
				<v-icon left>mdi-reload-alert</v-icon>
					RESET PLAYGROUND
			</v-btn>
		</OptionsWrapper>
	</div>
</template>

<script>
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import EnvironmentName from "./Developer/EnvironmentName.vue";
import ChamaileonSdk from "./Developer/ChamaileonSdk.vue";

export default {
	components: {
		OptionsWrapper,
		EnvironmentName,
		ChamaileonSdk
	},
	methods: {
		updateSDK() {
			this.$store.dispatch("updateSDK");
		},
		resetPlayGround() {
			this.$store.dispatch("resetPlayGround")
		}
	}
};
</script>

<style></style>

