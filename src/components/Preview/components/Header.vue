<template>
	<v-app>
		<h1>Header</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quos
			pariatur saepe voluptas mollitia delectus nobis quia officia, cum est
			tempore nesciunt sapiente itaque quidem similique accusamus, accusantium
			repellendus dolorem!
		</p>
		<OptionWrapper>
			<Header />
		</OptionWrapper>

		<h3>Buttons</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis hic
			earum, molestiae voluptatum ullam ut quae ratione ducimus, illum aperiam
			eligendi voluptatibus? Quia doloremque, quisquam ipsa veritatis unde eos.
			Facilis!
		</p>
		<OptionWrapper>
			<template>
				<v-row align="center" justify="end" class="ma-0">
					<AddButton class="mr-6" @click="addBtn"> New Button </AddButton>
					<AddButton @click="addDD"> New DropDown </AddButton>
				</v-row>
			</template>
			<List6 :section="'Preview'" />
		</OptionWrapper>
	</v-app>
</template>

<script>
import AddButton from "../../AddButton.vue";
import List6 from "../../List6.vue";
import OptionWrapper from "../../optionWrapper.vue";
import Header from "./Header/HeaderPreview.vue";

import { mapMutations } from "vuex";

export default {
	components: {
		AddButton,
		List6,
		OptionWrapper,
		Header,
	},
	methods: {
		...mapMutations({
			addBtn: "addPreviewBtn",
			addDD: "addPreviewDropdown",
		}),
	},

	data() {
		return {
			rules: {
				required: (value) => !!value || "Required.",
				unique: (value) =>
					!this.$store.state.editorConfig.idArr.includes(value),
			},
		};
	},
};
</script>

<style></style>
