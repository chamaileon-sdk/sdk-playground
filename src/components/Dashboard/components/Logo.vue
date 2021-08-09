<template>
	<div>
		<h2>Logo</h2>
		<p>
			You can select what logo you want to display within the plugins. Any kind
			of logos is supported, which means you are not limited to just static
			images. You are free to use animated or even reactive logos. This
			flexibility is achieved trough passing a JavaScript file to the SDK, which
			returns a DOM element.
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
