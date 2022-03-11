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
					:doc-url="'https://chamaileon.io/sdk/docs/email-editor/'"
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
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Header from "../components/Header";
import Elements from "../components/Elements";
import BlockLibraries from "../components/BlockLibraries";
import CustomFonts from "../../sharedComponents/CustomFonts";
import TextInsert from "../components/TextInsert";
import Addons from "../components/Addons";
import Settings from "../components/Settings";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import PreviewButton from "../../AppElements/components/PreviewButton.vue";

import { mapGetters, mapState, mapActions } from "vuex";

export default {
	components: {
		SectionObserver,
		Header,
		Footer,
		Elements,
		BlockLibraries,
		CustomFonts,
		TextInsert,
		Addons,
		Settings,
		Description,
		PreviewButton,
	},
	data() {
		return {
			previewButtonVisible: true,
		};
	},
	computed: {
		...mapState(["emailEditorInited", "sdkInited", "document"]),
		...mapGetters([ "getConfigObject" ]),
		isInited() {
			if (this.sdkInited === true) {
				return this.emailEditorInited;
			}
			return "pending";
		},
	},
	watch: {
		isInited: {
			async handler(editorInited) {
				if (editorInited === false) {
					await this.$store.dispatch("initEmailEditor");
				}
				if (editorInited === true) {
					await this.$store.dispatch("initGallery");
					await this.$store.dispatch("initEmailPreview");
				}
			},
			immediate: true,
		},
	},
	methods: {
		...mapActions({
			openGallery: "openGallery",
		}),
		async openEditor() {
			if (this.isInited === false) {
				await this.$store.dispatch("initEmailEditor");
			}

			const document = JSON.parse(JSON.stringify(this.document));
			const data = { document }; // !important change we set data from now, not document
			const settings = {
				...this.getConfigObject.settings,
			};

			this.$chamaileon.emailEditor.show();
			await new Promise(resolve => setTimeout(resolve, 500));
			this.$chamaileon.emailEditor.methods.updateSettings(settings);
			await new Promise(resolve => setTimeout(resolve, 500));
			this.$chamaileon.emailEditor.methods.updateData(data);
		},
		showPreviewButton(isVisible) {
			this.previewButtonVisible = isVisible;
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
