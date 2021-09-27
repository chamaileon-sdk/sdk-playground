<template>
	<div>
		<h2>Folder Tree</h2>
		<p>
			You can add a Folder Tree to the Gallery plugin and with it help your users to be organized. 
			This can and recommended to follow the folder structure of saved emails. 
			Select a folder, that will be the default when you open the Gallery and ready to pick an image from.
		</p>
		<OptionsWrapper>
			<FolderTreePreview />
		</OptionsWrapper>
	</div>
</template>

<script>
import FolderTreePreview from "./FolderTree/FolderTreePreview.vue";
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapMutations } from "vuex";

export default {
	components: {
		FolderTreePreview,
		OptionsWrapper,
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
