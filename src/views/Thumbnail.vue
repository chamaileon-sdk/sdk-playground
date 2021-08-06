<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email Thumbnail'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-thumbnail/'"
					:image="'EmailThumbnailIllustration.svg'"
				>
					<p>
						You can easily create thumbnails of your emails based on the JSON
						representation of the document. The plugin generates a thumbnail
						with the specified properties from the given JSON and attaches it to
						referenced DOM element.
					</p>
				</Description>
			</div>

			<div class="section" id="settings">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'SDK'"
			:prevTo="'/sdk'"
			:next="'Email Preview'"
			:nextTo="'/emailpreview'"
		/>
	</div>
</template>

<script>
import Footer from "../components/ViewUtilities/components/Footer.vue";
import SectionObserver from "../components/AppElements/components/SectionObserver.vue";
import Settings from "../components/Thumbnail/components/Settings.vue";
import Description from "../components/ViewUtilities/components/ViewDescription.vue";

export default {
	mounted() {
		this.$store.dispatch("updateSDK");
	},
	destroyed() {
		window.chamaileonSdk.destroy;
	},
	components: {
		Settings,
		SectionObserver,
		Footer,
		Description,
	},
};
</script>

<style></style>
