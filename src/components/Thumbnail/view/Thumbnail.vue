<template>
	<div>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Email Thumbnail'"
					:doc-url="'https://chamaileon.io/sdk/docs/email-thumbnail/'"
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

			<div id="settings" class="section">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'SDK'"
			:prev-to="'/sdk'"
			:next="'Email Preview'"
			:next-to="'/emailpreview'"
		/>
	</div>
</template>

<script>
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Settings from "../components/Settings.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

export default {
	components: {
		Settings,
		SectionObserver,
		Footer,
		Description,
	},
	mounted() {
		this.$store.dispatch("updateSDK");
	},
};
</script>

<style></style>
