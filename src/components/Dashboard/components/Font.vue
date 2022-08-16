<template>
	<div>
		<h2>Font</h2>
		<p>
			You can set up your preferred font that will be used in our plugins.
		</p>
		<OptionsWrapper>
			<FontSelector />
		</OptionsWrapper>
	</div>
</template>

<script>
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import FontSelector from "./Font/FontSelector.vue";

export default {
	components: {
		FontSelector,
		OptionsWrapper,
	},
};
</script>

<style></style>
