<template>
	<v-app>
		<h1>Header</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quasi
			exercitationem porro quaerat iusto reiciendis vero accusamus nam libero
			ipsum, vitae non a distinctio beatae! Libero pariatur voluptate commodi
			sapiente?
		</p>
		<OptionWrapper>
			<HeaderPreview />
		</OptionWrapper>

		<h3>Buttons</h3>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium optio
			quae esse repudiandae minus eligendi perferendis nesciunt eos vitae quis.
			At commodi quam provident, praesentium asperiores architecto est rerum
			aliquam!
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
