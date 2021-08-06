<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email Preview'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-preview/'"
					:image="'EmailPreviewIllustration.svg'"
				>
					<p>
						This plugin helps you to show your customers how an email looks like
						on different devices.<br />
						You can fully customize and extend the functionality of this plugin
						by adding different buttons to the header and defining how each
						button behaves, trough a hook.
					</p>
				</Description>
			</div>
			<div class="section" id="header">
				<Header />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email Thumbnail'"
			:prevTo="'/emailthumbnail'"
			:next="'Email Editor'"
			:nextTo="'/emaileditor'"
		/>
		<OpenButton @openEditorClicked="openEditor" />
	</div>
</template>

<script>
import Footer from "../components/ViewUtilities/components/Footer.vue";
import SectionObserver from "../components/AppElements/components/SectionObserver.vue";
import Header from "../components/Preview/components/Header.vue";
import OpenButton from "../components/AppElements/components/OpenButton.vue";
import Description from "../components/ViewUtilities/components/ViewDescription.vue";

export default {
	components: {
		Header,
		Footer,
		SectionObserver,
		OpenButton,
		Description,
	},

	methods: {
		openEditor() {
			this.$store.state.sdk.previewEmail({
				...this.$store.getters.getPreviewConfigObject,
			});
		},
	},

	mounted() {
		this.$store.dispatch("updateSDK");
	},

	destroyed() {
		window.chamaileonSdk.destroy;
	},
};
</script>

<style></style>
