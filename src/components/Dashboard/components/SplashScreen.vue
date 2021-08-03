<template>
	<v-app>
		<h2>Splash Screen</h2>
		<p>
			Splashscreens are shown while a plugin is loading. You can easily implement custom animations
		</p>
		<OptionsWrapper class="px-0">
			<SplashScreenSelector />
		</OptionsWrapper>
	</v-app>
</template>

<script>
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import SplashScreenSelector from "./SplashScreen/SplashScreenSelector.vue";

export default {
	components: {
		SplashScreenSelector,
		OptionsWrapper,
	},
};
</script>

<style></style>
