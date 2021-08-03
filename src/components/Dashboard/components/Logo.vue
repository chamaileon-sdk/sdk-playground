<template>
	<div>
		<h2>Logo</h2>
		<p>
			You can set up what logo you want to use within the plugins. This is a Javascript file that injects your logo into the DOM, which makes it possible to even create animated logos.
		</p>
		<p>
			Select one of the example logos from below.
		</p>
		<OptionsWrapper class="px-0">
			<LogoSelector />
		</OptionsWrapper>
	</div>
</template>

<script>
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import LogoSelector from "./Logo/LogoSelector.vue";

export default {
	components: {
		LogoSelector,
		OptionsWrapper,
	},
};
</script>

<style></style>
