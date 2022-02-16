<template>
	<div>
		<PreviewButton
			buttonText="Open preview"
			:previewButtonVisible="this.previewButtonVisible"
			@previewClick="this.openPreview"
		/>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email Preview'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-preview/'"
					:image="'EmailPreviewIllustration.svg'"
					buttonText="Open preview"
					@showPreviewButton="showPreviewButton"
					@previewClick="this.openEditor"
				>
					<p>
						This plugin helps you to show your customers how an email looks like
						on different devices.<br />
						You can fully customize and extend the functionality of this plugin
						by adding different buttons to the header and defining how each
						button behaves, through a hook.
					</p>
				</Description>
			</div>
			<div class="section" id="header">
				<Header />
			</div>
			<div class="section" id="settings">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email Thumbnail'"
			:prevTo="'/emailthumbnail'"
			:next="'Email Editor'"
			:nextTo="'/emaileditor'"
		/>
	</div>
</template>

<script>
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Header from "../components/Header.vue";
import Settings from "../components/Settings.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import PreviewButton from "../../AppElements/components/PreviewButton.vue"

export default {
	components: {
		Header,
		Footer,
		SectionObserver,
		Description,
		Settings,
		PreviewButton
	},
	data() {
		return {
			previewButtonVisible: true,
		}
	},
	methods: {
		openPreview() {
			this.$store.state.sdk.previewEmail({
				...this.$store.getters.getPreviewConfigObject,
			});
		},
		showPreviewButton(isVisible) {
			this.previewButtonVisible = isVisible;
		}
	},

	mounted() {
		this.$store.dispatch("updateSDK");
	},

	destroyed() {
		window.chamaileonSdk.destroy;
	}
};
</script>
