<template>
	<div>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Email HTML Import'"
					:doc-url="'https://chamaileon.io/sdk/v2/docs/email-html-importer/'"
					:image="'HtmlImportIllustration.svg'"
					:hide-get-started="true"
				>
					<p>
						Our API allows you to send existing HTML email code to the backend, and convert it to a JSON object,
						which can be processed in the editor. You can see examples under the right menu options
					</p>
				</Description>
			</div>
		</SectionObserver>
		<Footer :previous="'Email HTML Generator'" :prev-to="'/htmlgenerator'" />
	</div>
</template>

<script>
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Footer from "../../ViewUtilities/components/Footer.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

export default {

	components: {
		SectionObserver,
		Description,
		// eslint-disable-next-line vue/no-reserved-component-names
		Footer,
	},
	mounted() {
		this.$store.dispatch("fetchDummyHtml");
	},
};
</script>

<style></style>
