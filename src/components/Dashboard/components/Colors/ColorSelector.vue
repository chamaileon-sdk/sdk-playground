<template>
	<v-card flat class="pa-4">
		<v-row>
			<v-col>
				<ColorPicker
					:index="0"
					:value="primaryColor"
					@colorChange="changePrimary"
					:label="'Primary Color'"
				/>
			</v-col>
			<v-col>
				<ColorPicker
					:index="1"
					:value="secondaryColor"
					@colorChange="changeSecondary"
					:label="'Secondary Color'"
				/>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import ColorPicker from "../../../ViewUtilities/components/ColorPicker.vue";
import { mapState } from "vuex";

export default {
	components: {
		ColorPicker,
	},
	methods: {
		changePrimary(value) {
			this.$store.commit("updateSDKConfig", {
				colors: { ...this.$store.state.sdkConfig.colors, primary: value },
			});
		},
		changeSecondary(value) {
			this.$store.commit("updateSDKConfig", {
				colors: { ...this.$store.state.sdkConfig.colors, secondary: value },
			});
		},
	},
	computed: {
		...mapState({
			primaryColor: (state) => state.sdkConfig.colors.primary,
			secondaryColor: (state) => state.sdkConfig.colors.secondary,
		}),
	},
};
</script>

<style></style>
