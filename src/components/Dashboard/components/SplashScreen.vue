<template>
	<div>
		<h1>Splash Screen</h1>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
			velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
			cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
			est laborum.
		</p>
		<OptionsWrapper class="px-0">
			<SplashScreenSelector />
		</OptionsWrapper>
	</div>
</template>

<script>
import OptionsWrapper from "../../OptionWrapper.vue";
import SplashScreenSelector from "./SplashScreen/SplashScreenSelector.vue";

export default {
	components: {
		SplashScreenSelector,
		OptionsWrapper,
	},
};
</script>

<style></style>
