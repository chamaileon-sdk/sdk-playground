<template>
	<v-app>
		<h1>Header</h1>
		<p>
			In the variable editor, you can configure buttons in the header on the left-hand-side and on the right-hand-side as well. In our example, we programmatically configure a close button as well, but you don't have to do that in your application. (It is not necessarily needed, if you create a wizard with multiple steps.)
		</p>
		<OptionWrapper>
			<HeaderPreview />
		</OptionWrapper>

		<h3>Buttons</h3>
		<p>
			You can configure the buttons and dropdowns on the left- and right-hand-side of the header below.
		</p>
		<OptionWrapper>
			<SplitList :section="'Header'" />
		</OptionWrapper>
	</v-app>
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
