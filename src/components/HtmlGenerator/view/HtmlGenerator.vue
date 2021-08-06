<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email HTML Generator'"
					:docUrl="'https://chamaileon-sdk.github.io/examples/api/generate-email-html/'"
					:image="'HtmlGeneratorIllustration.svg'"
				/>
			</div>

			<div class="section" id="settings">
				<Settings />
			</div>
		</SectionObserver>
		<Footer :next="'Email Thumbnail'" :nextTo="'/emailthumbnail'" />
	</div>
</template>

<script>
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Footer from "../../ViewUtilities/components/Footer.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

import Settings from "../components/Settings.vue";

export default {
	mounted() {
		this.$store.dispatch("fetchDummyHtml");
	},

	components: {
		SectionObserver,
		Settings,
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
