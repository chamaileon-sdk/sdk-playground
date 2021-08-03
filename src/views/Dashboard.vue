<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Chamaileon SDK Playground'"
					:docUrl="'https://chamaileon.io/sdk/docs/'"
					:paragraphs="paragraphs"
					:image="'SdkIllustration.svg'"
				/>
			</div>
			<div class="section" id="sdklogo">
				<Logo />
			</div>
			<div class="section" id="splashscreen">
				<SplashScreen />
			</div>
			<div class="section" id="colors">
				<Colors />
			</div>
			<div class="section" id="language">
				<Language />
			</div>
		</SectionObserver>
		<Footer :next="'Email Thumbnail'" :nextTo="'/emailthumbnail'" />
	</div>
</template>

<script>
import Footer from "../components/ViewUtilities/components/Footer.vue";
import SectionObserver from "../components/AppElements/components/SectionObserver.vue";
import Logo from "../components/Dashboard/components/Logo.vue";
import Language from "../components/Dashboard/components/Language.vue";
import Colors from "../components/Dashboard/components/Colors.vue";
import SplashScreen from "../components/Dashboard/components/SplashScreen.vue";
import Description from "../components/ViewUtilities/components/ViewDescription.vue";

export default {
	data() {
		return {
			paragraphs: [
				"The Chamaileon SDK consists of multiple plugins and API endpoints that can help you to extend your product with amazing email creation capabilities. You can try out all of the configuration options in this playground."
			]	
		};
	},

	components: {
		SectionObserver,
		Footer,
		Logo,
		Colors,
		SplashScreen,
		Language,
		Description,
	},
};
</script>

<style></style>
