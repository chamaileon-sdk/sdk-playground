<template>
	<div>
		<PreviewButton
			button-text="Open editor"
			:preview-button-visible="previewButtonVisible"
			:is-inited="isInited"
			@previewClick="openEditor"
		/>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Email Editor'"
					:doc-url="'https://chamaileon.io/sdk/v2/docs/email-editor/'"
					:image="'EmailEditorIllustration.svg'"
					button-text="Open editor"
					:is-inited="isInited"
					@showPreviewButton="showPreviewButton"
					@previewClick="openEditor"
				>
					<p>
						With the help of the email editor plugin your users can create
						beautiful emails from scratch. The editor offers many ways of
						customization regarding functionality. You can create a personalized
						layout, design systems for your emails, and you can even change the
						access of your team members to those libraries in a team
						environment.
					</p>
				</Description>
			</div>

			<div id="header" class="section">
				<Header />
			</div>

			<div id="text-insert" class="section">
				<TextInsert />
			</div>

			<div id="elements" class="section">
				<Elements />
			</div>

			<div id="external-elements" class="section">
				<ExternalElements />
			</div>

			<div id="block-libraries" class="section">
				<BlockLibraries />
			</div>

			<div id="custom-fonts" class="section">
				<CustomFonts />
			</div>

			<div id="addons" class="section">
				<Addons />
			</div>

			<div id="settings" class="section">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email Preview'"
			:prev-to="'/emailpreview'"
			:next="'Gallery'"
			:next-to="'/gallery'"
		/>
	</div>
</template>

<script>
import PreviewButton from "../../AppElements/components/PreviewButton.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import CustomFonts from "../../sharedComponents/CustomFonts";
import Footer from "../../ViewUtilities/components/Footer.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import Addons from "../components/Addons.vue";
import BlockLibraries from "../components/BlockLibraries";
import Elements from "../components/Elements";
import ExternalElements from "../components/ExternalElements.vue";
import Header from "../components/Header";
import Settings from "../components/Settings.vue";
import TextInsert from "../components/TextInsert";

import { mapActions, mapState } from "vuex";

export default {
	components: {
		SectionObserver,
		// eslint-disable-next-line vue/no-reserved-component-names
		Header,
		// eslint-disable-next-line vue/no-reserved-component-names
		Footer,
		Elements,
		BlockLibraries,
		CustomFonts,
		TextInsert,
		Addons,
		Settings,
		Description,
		PreviewButton,
		ExternalElements,
	},
	data() {
		return {
			previewButtonVisible: true,
		};
	},
	computed: {
		...mapState(["document", "emailEditorInited"]),
		isInited() {
			return this.emailEditorInited;
		},
	},
	methods: {
		...mapActions({
			openGallery: "openGallery",
			setShowExternalElementIconModal: "setShowExternalElementIconModal",
			setShowExternalElementSocialMediaEmbedModal: "setShowExternalElementSocialMediaEmbedModal",
		}),
		async openEditor() {
			await this.$store.dispatch("initEmailEditor");
			this.$chamaileon.emailEditor.showSplashScreen();
			this.$chamaileon.emailEditor.show();
			const document = JSON.parse(JSON.stringify(this.document));
			const data = { document };
			await this.$chamaileon.emailEditor.methods.updateData(data);
			this.$chamaileon.emailEditor.hideSplashScreen();
			this.$store.dispatch("initGallery");
			this.$store.dispatch("initEmailPreview");
		},
		showPreviewButton(isVisible) {
			this.previewButtonVisible = isVisible;
		},
		closeExternalElementIconModal() {
			this.setShowExternalElementIconModal(false);
		},
		closeExternalElementSocialMediaEmbedModal() {
			this.setShowExternalElementSocialMediaEmbedModal(false);
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
