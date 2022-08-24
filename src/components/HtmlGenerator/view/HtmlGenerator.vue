<template>
	<div>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Email HTML Generator'"
					:doc-url="'https://chamaileon.io/sdk/v2/docs/email-html-generator/'"
					:image="'HtmlGeneratorIllustration.svg'"
				>
					<p>
						Our HTML generator plugin allows you to generate an email HTML from
						your current document. We offer many options to help you generate
						the email based on the target mail client.
					</p>
				</Description>
			</div>

			<div id="settings" class="section">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email HTML Import Plugin'"
			:prev-to="'/htmlimportplugin'"
			:next="'Email HTML Import'"
			:next-to="'/htmlimport'"
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
