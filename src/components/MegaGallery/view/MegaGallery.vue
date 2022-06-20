<template>
	<div>
		<PreviewButton
			button-text="Open gallery"
			:preview-button-visible="previewButtonVisible"
			:is-inited="isInited"
			@previewClick="openGallery"
		/>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Gallery'"
					:doc-url="'https://chamaileon.io/sdk/v2/docs/gallery/'"
					:image="'EmailThumbnailIllustration.svg'"
					button-text="Open gallery"
					:is-inited="isInited"
					@showPreviewButton="showPreviewButton"
					@previewClick="openGallery"
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
			<div id="folder" class="section">
				<FolderTree />
			</div>
			<div id="settings" class="section">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email Editor'"
			:prev-to="'/emaileditor'"
			:next="'Variable Editor'"
			:next-to="'/variableeditor'"
		/>
	</div>
</template>

<script>
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import FolderTree from "../components/FolderTree";
import Settings from "../components/Settings.vue";
import PreviewButton from "../../AppElements/components/PreviewButton.vue";

import { mapState, mapActions } from "vuex";

export default {
	components: {
		SectionObserver,
		FolderTree,
		Footer,
		Description,
		Settings,
		PreviewButton,
	},
	data() {
		return {
			previewButtonVisible: true,
		};
	},
	computed: {
		...mapState({
			gallerySettings: state => state.megaGalleryConfig.settings,
			galleryInited: state => state.galleryInited,
		}),
		isInited() {
			return this.galleryInited;
		},
	},
	methods: {
		...mapActions({
			openGallery: "openGallery",
		}),
		showPreviewButton(isVisible) {
			this.previewButtonVisible = isVisible;
		},
		async openGallery() {
			await this.$store.dispatch("initGallery");
			this.$chamaileon.gallery.show();
			const { src } = await this.$chamaileon.gallery.methods.pickImage();
			console.info("Picked image: ", src);
			this.$chamaileon.gallery.hide();
		},
	},
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
