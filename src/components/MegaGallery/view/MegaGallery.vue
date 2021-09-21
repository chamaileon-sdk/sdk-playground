<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Mega Gallery'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-editor/'"
					:image="'EmailEditorIllustration.svg'"
				>
					<p>
						You can use our Gallery plugin to show image assets to your users. 
						Users can use our basic editing tool to crop, 
						resize the image or you can add 3rd party application for more advanced experience.
					</p>
				</Description>
			</div>
			<div class="section" id="folder">
				<FolderTree />
			</div>
			
		</SectionObserver>
		<Footer
			:previous="'Email Editor'"
			:prevTo="'/emaileditor'"
			:next="'Variable Editor'"
			:nextTo="'/variableeditor'"
		/>
		<OpenButton @openEditorClicked="openGallery" />
	</div>
</template>

<script>
import OpenButton from "../../AppElements/components/OpenButton.vue";
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import FolderTree from "../components/FolderTree";

import { mapActions } from "vuex";

export default {
	mounted() {
		this.$store.dispatch("updateSDK");
	},
	destroyed() {
		window.chamaileonSdk.destroy;
	},
	components: {
		SectionObserver,
		FolderTree,
		Footer,
		OpenButton,
		Description,
	},
	methods: {
		...mapActions({
			openGallery: "openGallery"
		})
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
