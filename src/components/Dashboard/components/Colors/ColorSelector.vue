<template>
	<v-card flat class="pa-4">
		<v-row>
			<v-col>
				<ColorPicker
					:index="0"
					:value="primaryColor"
					:label="'Primary Color'"
					@colorChange="changePrimary"
				/>
			</v-col>
			<v-col>
				<ColorPicker
					:index="1"
					:value="secondaryColor"
					:label="'Secondary Color'"
					@colorChange="changeSecondary"
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
	computed: {
		...mapState({
			primaryColor: state => state.sdkConfig.colors.primary,
			secondaryColor: state => state.sdkConfig.colors.secondary,
		}),
	},
	methods: {
		changePrimary(value) {
			this.$store.dispatch("updateSdkConfig", {
				colors: { ...this.$store.state.sdkConfig.colors, primary: value },
			});
		},
		changeSecondary(value) {
			this.$store.dispatch("updateSdkConfig", {
				colors: { ...this.$store.state.sdkConfig.colors, secondary: value },
			});
		},
	},
};
</script>

<style></style>
