<template>
	<div>
		<PreviewButton
			button-text="Open editor"
			:preview-button-visible="previewButtonVisible"
			@previewClick="openEditor"
		/>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Email Editor'"
					:doc-url="'https://chamaileon.io/sdk/docs/email-editor/'"
					:image="'EmailEditorIllustration.svg'"
					button-text="Open editor"
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
		...mapState([ "sdk" ]),
		...mapGetters([ "getConfigObject" ]),
	},
	mounted() {
		this.$store.dispatch("updateSDK");
	},
	destroyed() {
		window.chamaileonSdk.destroy;
	},
	methods: {
		...mapActions({
			openGallery: "openGallery",
		}),
		openEditor() {
			this.sdk.editEmail({
				...this.$store.getters.getConfigObject,
				hooks: {
					onSave: async (obj) => {
						await this.$store.dispatch("updateDocument", obj.document);
					},
					onAutoSave: (obj) => {
						return new Promise(
							function (resolve) {
								this.$store.commit("updateDocument", obj.document);
								return resolve();
							}.bind(this),
						);
					},
					onChange: () => {
						return new Promise((resolve) => {
							resolve();
						});
					},
					onBeforeClose: () => {
						return new Promise((resolve) => {
							resolve();
						});
					},
					onAfterClose: () => {
						return new Promise((resolve) => {
							resolve();
						});
					},
					onEditTitle: ({ title }) => {
						return new Promise((resolve) => {
							resolve(title);
						});
					},
					onEditImage: async ({
						originalImage,
						lockDimensions,
					}) => {
						const { src } = await this.openGallery({ editImgSrc: originalImage, dimensions: lockDimensions });
						return { src };
					},
					onEditBackgroundImage: async ({
						originalImage,
						lockDimensions,
					}) => {
						const { url: src } = await this.openGallery({ editImgSrc: originalImage, dimensions: lockDimensions });
						return { src };
					},
					onLoadBlocks: ({ libId }) => {
						const blocks = this.$store.getters.getBlocksById(libId);

						return new Promise((resolve) => {
							resolve({ blocks });
						});
					},
					onBlockSave: ({ libId, block }) => {
						this.$store.commit("addBlockToLib", { libId, block });

						return new Promise((resolve) => {
							resolve({ block });
						});
					},
					onBlockRename: ({ libId, block: { _id, title } }) => {
						this.$store.commit("renameBlock", {
							libId,
							block: { _id, title },
						});

						return new Promise((resolve) => {
							resolve();
						});
					},
					onBlockDelete: ({ libId, block: { _id } }) => {
						this.$store.commit("deleteBlock", {
							libId,
							blockId: _id,
						});

						return new Promise((resolve) => {
							resolve();
						});
					},
					onHeaderButtonClicked: ({ buttonId }) => {
						return new Promise((resolve) => {
							resolve(buttonId);
						});
					},
					onTextInsertPluginButtonClicked: ({ buttonId }) => {
						return new Promise((resolve) => {
							resolve({ value: buttonId });
						});
					},
					onExpressionEditClicked: ({ expression }) => {
						return new Promise((resolve) => {
							resolve({ expression });
						});
					},
				},
			});
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
