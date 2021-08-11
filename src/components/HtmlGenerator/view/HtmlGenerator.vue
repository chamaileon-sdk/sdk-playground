<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email HTML Generator'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-html-generator/'"
					:image="'HtmlGeneratorIllustration.svg'"
				>
					<p>
						Our HTML generator plugin allows you to generate an email HTML from
						your current document. We offer many options to help you generate
						the email based on the target mail client.
					</p>
				</Description>
			</div>

			<div class="section" id="settings">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Variable Editor'"
			:prevTo="'/variableeditor'"
			:next="'Email HTML Import'"
			:nextTo="'/htmlimport'"
		/>
	</div>
</template>

<script>
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Footer from "../../ViewUtilities/components/Footer.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

import Settings from "../components/Settings.vue";

export default {
	components: {
		SectionObserver,
		Settings,
		Description,
		Footer,
	},
};
</script>

<style></style>
