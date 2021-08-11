<template>
	<div>
		<h2>Splash Screen</h2>
		<p>
			Splash screens are shown while a plugin is loading. Just in case of the
			logos, you can fully customize the splash screen too. Any kind of splash
			screen is supported, whether it is static, animated, or reactive.
		</p>
		<OptionsWrapper class="px-0">
			<SplashScreenSelector />
		</OptionsWrapper>
	</div>
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
