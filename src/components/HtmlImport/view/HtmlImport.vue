<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email HTML Import'"
					:docUrl="'https://chamaileon.io/sdk/v2/docs/email-html-importer/'"
					:image="'HtmlImportIllustration.svg'"
					:hideGetStarted="true"
				>
					<p>
						Our API allows you to send existing HTML email code to the backend, and convert it to a JSON object,
						which can be processed in the editor. You can see examples under the right menu options
					</p>
				</Description>
			</div>
		</SectionObserver>
		<Footer :previous="'Email HTML Generator'" :prevTo="'/htmlgenerator'" />
	</div>
</template>

<script>
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Footer from "../../ViewUtilities/components/Footer.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

export default {
	mounted() {
		this.$store.dispatch("fetchDummyHtml");
	},

	components: {
		SectionObserver,
		Description,
		Footer,
	},
};
</script>

<style></style>