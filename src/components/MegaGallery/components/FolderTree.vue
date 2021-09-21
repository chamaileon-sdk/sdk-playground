<template>
	<div>
		<h2>Folder Tree</h2>
		<p>
			You can add a folder tree to the Gallary and help your users to be organized. 
			This can and recommended to follow the folder stucture of emails. 
			In the settings you also can pass down the selected folder id. 
			This way the right images can be loaded right with the gallery.  
		</p>
		<OptionsWrapper>
			<FolderTreePreview />
		</OptionsWrapper>

		<p>
			You can set the maximum file size allowed to upload, how many image you want to load without scrolling and the selected folder if you have any. 
		
		</p>
		<OptionsWrapper>
			<template>
				<v-row align="center" justify="end" class="ma-0">
					<AddButton class="mr-lg-6" @click="addBtn"> New Button </AddButton>
					<AddButton class="mt-6 mt-lg-0" @click="addDD">
						New DropDown
					</AddButton>
				</v-row>
			</template>

			<List6 :section="'Editor'" />
		</OptionsWrapper>
	</div>
</template>

<script>
import AddButton from "../../ViewUtilities/components/AddButton.vue";
import FolderTreePreview from "./FolderTree/FolderTreePreview.vue";
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import List6 from "../../Lists/components/List6.vue";
import { mapMutations } from "vuex";

export default {
	components: {
		AddButton,
		FolderTreePreview,
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
