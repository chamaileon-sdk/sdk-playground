<template>
	<v-app>
		<h2>Splash Screen</h2>
		<p>
			Splashscreens are shown while a plugin is loading. Just in case of the
			logos, you can fully customize the splashscreen too. Any kind of
			splashscreen is supported, whether it is static, animated or reactive.
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
