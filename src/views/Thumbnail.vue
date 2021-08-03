<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email Thumbnail'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-thumbnail/'"
					:paragraphs="paragraphs"
					:image="'EmailThumbnailIllustration.svg'"
				/>
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
	data() {
		return {
			paragraphs: [
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum ullam consectetur quidem repellendus facilis deserunt architecto, debitis nihil? Repellat nesciunt beatae eius nulla incidunt iure modi sint consequuntur esse."
			]
		};
	},

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
