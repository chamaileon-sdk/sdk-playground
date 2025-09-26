<template>
	<div>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Landing Page HTML Generator'"
					:doc-url="'https://chamaileon.io/sdk/v2/docs/email-html-generator/#landing-page-generation'"
					:image="'HtmlGeneratorIllustration.svg'"
				>
					<p>
						Our HTML generator plugin allows you to generate a landing page HTML from
						your current document.
					</p>
				</Description>
			</div>

			<div id="settings" class="section">
				<LandingPageSettings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email HTML Generator'"
			:prev-to="'/htmlgenerator'"
			:next="'Email HTML Import'"
			:next-to="'/htmlimport'"
		/>
	</div>
</template>

<script>
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Footer from "../../ViewUtilities/components/Footer.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

import LandingPageSettings from "../components/LandingPageSettings.vue";

export default {
	components: {
		SectionObserver,
		LandingPageSettings,
		Description,
		// eslint-disable-next-line vue/no-reserved-component-names
		Footer,
	},
};
</script>

<style></style>
