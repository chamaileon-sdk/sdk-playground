<template>
  <div>
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

    <v-btn @click="OpenEditor">teszt</v-btn>
  </div>
</template>

<script>
import SplitList from "./SplitList.vue";
import OptionWrapper from "../optionWrapper.vue";
import FooterPreview from "./FooterPreview.vue";
import { mapGetters } from "vuex";

export default {
	methods: {
		OpenEditor() {
			this.$store.state.sdk.editVariables({
				document: this.$store.state.document,

				...this.getVEConfigObj,
				hooks: {},
			});
		},
	},
	computed: {
		...mapGetters(["getVEConfigObj"]),
	},
	components: {
		SplitList,
		OptionWrapper,
		FooterPreview,
	},
};
</script>

<style></style>
