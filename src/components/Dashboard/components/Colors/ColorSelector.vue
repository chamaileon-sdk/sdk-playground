<template>
	<v-card flat class="pa-4">
		<v-row>
			<v-col
				md="6"
				xl="2"
				lg="4"
			>
				<ColorPicker
					:index="0"
					:value="primaryColor"
					:label="'Primary Color'"
					@colorChange="changePrimary"
				/>
			</v-col>
			<v-col
				md="6"
				xl="2"
				lg="4"
			>
				<ColorPicker
					:index="1"
					:value="secondaryColor"
					:label="'Secondary Color'"
					@colorChange="changeSecondary"
				/>
			</v-col>
			<v-col
				md="6"
				xl="2"
				lg="4"
			>
				<ColorPicker
					:index="2"
					:value="errorColor"
					:label="'Error'"
					@colorChange="changeError"
				/>
			</v-col>
			<v-col
				md="6"
				xl="2"
				lg="4"
			>
				<ColorPicker
					:index="3"
					:value="infoColor"
					:label="'Info'"
					@colorChange="changeInfo"
				/>
			</v-col>
			<v-col
				md="6"
				xl="2"
				lg="4"
			>
				<ColorPicker
					:index="4"
					:value="successColor"
					:label="'Success'"
					@colorChange="changeSuccess"
				/>
			</v-col>
			<v-col
				md="6"
				xl="2"
				lg="4"
			>
				<ColorPicker
					:index="5"
					:value="warningColor"
					:label="'Warning'"
					@colorChange="changeWarning"
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
			errorColor: state => state.sdkConfig.colors.error,
			infoColor: state => state.sdkConfig.colors.info,
			successColor: state => state.sdkConfig.colors.success,
			warningColor: state => state.sdkConfig.colors.warning,
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
		changeError(value) {
			this.$store.dispatch("updateSdkConfig", {
				colors: { ...this.$store.state.sdkConfig.colors, error: value },
			});
		},
		changeInfo(value) {
			this.$store.dispatch("updateSdkConfig", {
				colors: { ...this.$store.state.sdkConfig.colors, info: value },
			});
		},
		changeSuccess(value) {
			this.$store.dispatch("updateSdkConfig", {
				colors: { ...this.$store.state.sdkConfig.colors, success: value },
			});
		},
		changeWarning(value) {
			this.$store.dispatch("updateSdkConfig", {
				colors: { ...this.$store.state.sdkConfig.colors, warning: value },
			});
		},
	},
};
</script>

<style></style>
