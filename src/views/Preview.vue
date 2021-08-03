<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email Preview'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-preview/'"
					:paragraphs="paragraphs"
					:image="'EmailPreviewIllustration.svg'"
				/>
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
	data() {
		return {
			paragraphs: [
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum ullam consectetur quidem repellendus facilis deserunt architecto, debitis nihil? Repellat nesciunt beatae eius nulla incidunt iure modi sint consequuntur esse."
			]
		};
	},

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
