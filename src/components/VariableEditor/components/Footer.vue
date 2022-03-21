<template>
	<div>
		<h2>Footer</h2>
		<p>
			Similarly to the header, you can configure buttons on both side of the
			footer. This provides even more options for full integration and building
			a custom experience.
		</p>
		<OptionWrapper>
			<FooterPreview />
		</OptionWrapper>

		<h3>Buttons</h3>
		<p>
			You can add and customize your buttons and dropdowns below. The icon is
			required to be a <br>
			<a
				href="https://materialdesignicons.com/"
				target="_blank"
			>Material Design Icon</a>
			without <em>mdi-</em> prefix. Keep in mind that the footer can only store
			a limited amount of buttons.
		</p>
		<OptionWrapper>
			<SplitList :section="'Footer'" />
		</OptionWrapper>
	</div>
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
