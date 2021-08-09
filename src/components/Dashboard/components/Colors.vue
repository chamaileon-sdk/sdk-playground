<template>
	<div>
		<h2>Colors</h2>
		<p>
			You can set up your colors within the plugins to match your brand colors.
			In most of the cases it is enough to change the primary color.
		</p>
		<OptionsWrapper>
			<ColorSelector />
		</OptionsWrapper>
	</div>
</template>

<script>
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import ColorSelector from "./Colors/ColorSelector.vue";

export default {
	components: {
		ColorSelector,
		OptionsWrapper,
	},
};
</script>

<style></style>
