<template>
	<div>
		<h2>Header</h2>
		<p>
			In the variable editor, you can configure buttons in the header on both
			side. In our example, we programmatically configured a close button as
			well, which is not necessary but is a must-have in order to close the
			editor when used as a pop-up.
		</p>
		<OptionWrapper>
			<HeaderPreview />
		</OptionWrapper>

		<h3>Buttons</h3>
		<p>
			You can add and customize your buttons and dropdowns below. The icon is
			required to be a <br>
			<a
				href="https://pictogrammers.github.io/@mdi/font/6.5.95/"
				target="_blank"
			>Material Design Icon</a>
			without <em>mdi-</em> prefix. Keep in mind that the header can only store
			a limited amount of buttons.
		</p>
		<OptionWrapper>
			<SplitList :section="'Header'" />
		</OptionWrapper>
	</div>
</template>

<script>
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import HeaderPreview from "./Header/HeaderPreview.vue";
import SplitList from "../../Lists/components/SplitList.vue";

export default {
	components: {
		SplitList,
		OptionWrapper,
		HeaderPreview,
	},
};
</script>

<style></style>
