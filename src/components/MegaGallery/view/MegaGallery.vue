<template>
	<div>
		<PreviewButton 
			buttonText="Open gallery"
			:previewButtonVisible="this.previewButtonVisible"
			@previewClick="this.openGallery"
		/>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Gallery'"
					:docUrl="'https://chamaileon.io/sdk/docs/gallery/'"
					:image="'EmailThumbnailIllustration.svg'"
					buttonText="Open gallery"
					@showPreviewButton="showPreviewButton"
					@previewClick="this.openGallery"
				>
					<p>
						The Gallery plugin shows stored image assets to choose from and insert into emails during creation.
						Out of the box supports some basic editing features like cropping and resizing, but 
						with 3rd party image-editor, you can extend it's capability.
						<br>
						<br>
						After set up, open the Gallery from the editor with editing an image element. 
					</p>
				</Description>
			</div>
			<div class="section" id="folder">
				<FolderTree />
			</div>
			<div class="section" id="settings">
				<Settings />
			</div>
			
		</SectionObserver>
		<Footer
			:previous="'Email Editor'"
			:prevTo="'/emaileditor'"
			:next="'Variable Editor'"
			:nextTo="'/variableeditor'"
		/>
	</div>
</template>

<script>
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import FolderTree from "../components/FolderTree";
import Settings from "../components/Settings.vue";
import PreviewButton from "../../AppElements/components/PreviewButton.vue"

import { mapActions } from "vuex";

export default {
	components: {
		SectionObserver,
		FolderTree,
		Footer,
		Description,
		Settings,
		PreviewButton
	},
	data() {
		return {
			previewButtonVisible: true
		}
	},
	mounted() {
		this.$store.dispatch("updateSDK");
	},
	destroyed() {
		window.chamaileonSdk.destroy;
	},
	methods: {
		...mapActions({
			openGallery: "openGallery"
		}),
		showPreviewButton(isVisible) {
			this.previewButtonVisible = isVisible;
		}
	}
};
</script>

<style>
.v-btn--example {
	position: fixed;
	bottom: 0;
	right: 31%;
	margin-bottom: 64px;
}

body {
	overflow: hidden !important;
}
iframe {
	position: fixed;
}
</style>
