<template>
	<div>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Chamaileon SDK'"
					:doc-url="'https://chamaileon.io/sdk/v2/docs/'"
					:read-more-url="'https://chamaileon.io/sdk/'"
					:image="'SdkIllustration.svg'"
				>
					<p>
						The Chamaileon SDK consists of multiple plugins and API endpoints
						that can help you to extend your product with amazing email creation
						capabilities. You can fully customize the SDK to that it fits
						seamlessly into your product.
					</p>
				</Description>
			</div>
			<div id="sdklogo" class="section">
				<Logo />
			</div>
			<div id="splashscreen" class="section">
				<SplashScreen />
			</div>
			<div id="colors" class="section">
				<Colors />
			</div>
			<div id="language" class="section">
				<Language />
			</div>
			<div id="developer" class="section">
				<Developer />
			</div>
		</SectionObserver>
		<Footer :next="'Email Thumbnail'" :next-to="'/emailthumbnail'" />
	</div>
</template>

<script>
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Logo from "../components/Logo.vue";
import Language from "../components/Language.vue";
import Colors from "../components/Colors.vue";
import Developer from "../components/Developer.vue";
import SplashScreen from "../components/SplashScreen.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

export default {
	components: {
		SectionObserver,
		Footer,
		Logo,
		Colors,
		Developer,
		SplashScreen,
		Language,
		Description,
	},
};
</script>

<style></style>
