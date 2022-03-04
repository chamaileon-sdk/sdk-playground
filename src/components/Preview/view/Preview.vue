<template>
	<div>
		<PreviewButton
			button-text="Open preview"
			:preview-button-visible="previewButtonVisible"
			@previewClick="openPreview"
		/>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Email Preview'"
					:doc-url="'https://chamaileon.io/sdk/docs/email-preview/'"
					:image="'EmailPreviewIllustration.svg'"
					button-text="Open preview"
					@showPreviewButton="showPreviewButton"
					@previewClick="openPreview"
				>
					<p>
						This plugin helps you to show your customers how an email looks like
						on different devices.<br>
						You can fully customize and extend the functionality of this plugin
						by adding different buttons to the header and defining how each
						button behaves, through a hook.
					</p>
				</Description>
			</div>
			<div id="header" class="section">
				<Header />
			</div>
			<div id="settings" class="section">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email Thumbnail'"
			:prev-to="'/emailthumbnail'"
			:next="'Email Editor'"
			:next-to="'/emaileditor'"
		/>
	</div>
</template>

<script>
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Header from "../components/Header.vue";
import Settings from "../components/Settings.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import PreviewButton from "../../AppElements/components/PreviewButton.vue";

import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		Header,
		Footer,
		SectionObserver,
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
		...mapGetters({
			getMegaPreviewInterface: "getMegaPreviewInterface",
			getPreviewConfigObject: "getPreviewConfigObject",
		}),
	},
	mounted() {
		this.$store.dispatch("updateSDK");
	},
	methods: {
		...mapActions({
			initMegaPreview: "initMegaPreview",
		}),
		async openPreview() {
			if (!this.$chamaileon.previewPlugin) {
				this.$chamaileon.previewPlugin = await this.$chamaileon.createMegaPreview({
					...this.getPreviewConfigObject,
					hooks: {
						close: () => {
							this.$chamaileon.previewPlugin.hide();
						},
						onHeaderButtonClicked: ({ buttonId }) => {
							if (buttonId === "hideHeader") {
								this.$chamaileon.previewPlugin.methods.updateSettings({ hideHeader: true });
								setTimeout(() => {
									this.$chamaileon.previewPlugin.methods.updateSettings({ hideHeader: false });
								}, 5000);
							}
						},
						shareEmail: ({ document }) => console.log("share: " + document),
						sendTestEmail: ({ document }) => console.log("test: " + document),
						requestReview: ({ document }) => console.log("review: " + document),
					},
				});
			}
			this.$chamaileon.previewPlugin.show();
		},
		showPreviewButton(isVisible) {
			this.previewButtonVisible = isVisible;
		},
	},
};
</script>
