<template>
	<v-app>
		<h1>Footer</h1>
		<p>
			Similarly to the header, you can configure buttons on the left- and right-hand-side in the footer of the variable editor.
		</p>
		<OptionWrapper>
			<FooterPreview />
		</OptionWrapper>

		<h3>Buttons</h3>
		<p>
			You can configure the buttons and dropdowns on the left- and right-hand-side of the footer below.
		</p>
		<OptionWrapper>
			<SplitList :section="'Footer'" />
		</OptionWrapper>
	</v-app>
</template>

<script>
import SplitList from "../../Lists/components/SplitList.vue";
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import FooterPreview from "./Footer/FooterPreview.vue";

export default {
	components: {
		SplitList,
		OptionWrapper,
		FooterPreview,
	},
};
</script>

<style></style>
