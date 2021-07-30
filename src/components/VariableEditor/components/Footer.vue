<template>
	<v-app>
		<h1>Footer</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic id possimus a
			maxime quo voluptas commodi natus libero soluta provident laudantium, amet
			fugit aliquid consequuntur voluptatem obcaecati fugiat dolorum dolores.
		</p>
		<OptionWrapper>
			<FooterPreview />
		</OptionWrapper>

		<h3>Buttons</h3>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vero
			odit eos reprehenderit itaque aspernatur debitis, nesciunt exercitationem
			libero placeat non ipsum impedit quisquam optio tenetur quas molestiae
			ipsa eveniet!
		</p>
		<OptionWrapper>
			<SplitList :section="'Footer'" />
		</OptionWrapper>
	</v-app>
</template>

<script>
import SplitList from "../../SplitList.vue";
import OptionWrapper from "../../optionWrapper.vue";
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
