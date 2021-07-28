<template>
	<v-app>
		<h1>Header</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
			laboriosam neque laborum beatae quas, explicabo quaerat aperiam nesciunt
			provident aliquam praesentium nisi magnam nihil debitis, pariatur numquam
			veniam molestiae similique.
		</p>
		<OptionsWrapper>
			<HeaderPreview />
		</OptionsWrapper>

		<h3>Your Buttons</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis hic
			earum, molestiae voluptatum ullam ut quae ratione ducimus, illum aperiam
			eligendi voluptatibus? Quia doloremque, quisquam ipsa veritatis unde eos.
			Facilis!
		</p>
		<OptionsWrapper>
			<template>
				<v-row align="center" justify="end" class="ma-0">
					<AddButton class="mr-6" @click="addBtn"> New Button </AddButton>
					<AddButton @click="addDD"> New DropDown </AddButton>
				</v-row>
			</template>

			<List6 :section="'Editor'" />
		</OptionsWrapper>
	</v-app>
</template>

<script>
import AddButton from "../AddButton.vue";
import HeaderPreview from "./HeaderPreview.vue";
import OptionsWrapper from "../optionWrapper.vue";
import List6 from "../List6.vue";
import { mapMutations } from "vuex";

export default {
	components: {
		AddButton,
		HeaderPreview,
		OptionsWrapper,
		List6,
	},
	methods: {
		...mapMutations({
			addBtn: "addEditorBtn",
			addDD: "addEditorDropdown",
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
