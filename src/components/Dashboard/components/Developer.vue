<template>
	<div>
		<h2>Developer settings</h2>
		<p>
			This is a warning here!!
		</p>
		<OptionsWrapper>
			<ApiBackendSelector class="rounded-t rounded-0 d-flex pa-4" />
			<ApiKey class="rounded-0 d-flex pa-4"/>
			<ChamaileonSdk class="rounded-0 d-flex pa-4"/>
			<EnvironmentName class="rounded-b rounded-0 d-flex pa-4"/>
			<v-btn
				@click="updateSDK"
				target="_blank"
				class="ma-0 mt-3 mr-3"
				depressed
				color="primary"
			>
				<v-icon left>mdi-reload-alert</v-icon>
					UPDATE SDK
			</v-btn>
		</OptionsWrapper>
	</div>
</template>

<script>
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import ApiBackendSelector from "./Developer/ApiBackendSelector.vue";
import ApiKey from "./Developer/ApiKey.vue";
import EnvironmentName from "./Developer/EnvironmentName.vue";
import ChamaileonSdk from "./Developer/ChamaileonSdk.vue";

export default {
	components: {
		ApiBackendSelector,
		ApiKey,
		OptionsWrapper,
		EnvironmentName,
		ChamaileonSdk
	},
	methods: {
		updateSDK() {
			this.$store.dispatch("updateSDK", { vm: this });
		}
	}
};
</script>

<style></style>

