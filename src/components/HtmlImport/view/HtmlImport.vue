<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email HTML Import'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-html-importer/'"
					:paragraph1="paragraph1"
					:paragraph2="paragraph2"
					:image="'HtmlImportIllustration.svg'"
				/>
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

	data() {
		return {
			paragraph1:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum ullam consectetur quidem repellendus facilis deserunt architecto, debitis nihil? Repellat nesciunt beatae eius nulla incidunt iure modi sint consequuntur esse.",
			paragraph2:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum ullam consectetur quidem repellendus facilis deserunt architecto, debitis nihil? Repellat nesciunt beatae eius nulla incidunt iure modi sint consequuntur esse.",
		};
	},
};
</script>

<style></style>
