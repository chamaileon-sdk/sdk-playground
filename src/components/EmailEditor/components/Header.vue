<template>
	<v-app>
		<h1>Header</h1>
		<p>
			You can configure buttons & dropdowns to appear in the header on the right-hand-side. It is a great way to interact with you application from this plugin. For example, you can pop up dialogs when your users click on one of the buttons or dropdown items.
		</p>
		<p>
			Whenever you click on a button or a dropdown item, a hook will be called, and the <em>buttonId</em> will be passed to the hook, which is the <em>id</em> property in the config. (Please, check out the hooks tab on the right-hand-side.)
		</p>
		<OptionsWrapper>
			<HeaderPreview />
		</OptionsWrapper>

		<h3>Your Buttons</h3>
		<p>
			You can add buttons and dropdowns below. Keep in mind, that you can add buttons (menu items) to dropdowns as well.
		</p>
		<p>
			The icons are from <a href="https://materialdesignicons.com/" target="_blank">material design icons</a>. In the configuration object, you will have to use the icon name without the <em>mdi-</em> prefix.
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
import AddButton from "../../ViewUtilities/components/AddButton.vue";
import HeaderPreview from "./Header/HeaderPreview.vue";
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import List6 from "../../Lists/components/List6.vue";
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
