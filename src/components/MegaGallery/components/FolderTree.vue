<template>
	<div>
		<h2>Folder Tree</h2>
		<p>
			You can add a Folder Tree to the Gallery plugin and help your users to be organized. 
			This can, and of course recommended to follow the folder structure of the saved emails. 
			Select a folder, that will be the default when you open the Gallery and ready to pick an image from.
		</p>
		<OptionsWrapper>
			<FolderTreePreview />
		</OptionsWrapper>
		<OptionsWrapper>
				<v-row
					elevation="0"
					class="d-flex white rounded justify-center align-center pa-4"
				>
					<v-col cols="12" class="pa-0 ma-0">
						<v-icon
							color="primary"	
						>
							mdi-folder
						</v-icon>
						
						
						<span>
								<b> selectedFolderId: </b> {{ selectedFolderId || "Select a folder!" }}
						</span>
						
					</v-col>
				</v-row>
		</OptionsWrapper>
	</div>
</template>

<script>
import FolderTreePreview from "./FolderTree/FolderTreePreview.vue";
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapState, mapMutations } from "vuex";

export default {
	components: {
		FolderTreePreview,
		OptionsWrapper,
	},
	computed: {
		...mapState({
			selectedFolderId: (state) => state.megaGalleryConfig.settings.selectedFolderId,
		}),
	},
	methods: {
		...mapMutations({
			addBtn: "addEditorBtn",
			addDD: "addEditorDropdown",
		}),
	},
};
</script>

<style></style>
