<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email HTML Import'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-html-importer/'"
					:image="'HtmlImportIllustration.svg'"
				>
					<p>
						Our HTML import plugin allows you to import an existing HTML email
						to editor and make changes to it. The output is a JSON object, which
						the editor can process. Currently there are no available options for
						this plugin.
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
