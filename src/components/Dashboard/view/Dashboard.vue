<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Chamaileon SDK'"
					:docUrl="'https://chamaileon.io/sdk/docs/'"
					:readMoreUrl="'https://chamaileon.io/sdk/'"
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
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Logo from "../components/Logo.vue";
import Language from "../components/Language.vue";
import Colors from "../components/Colors.vue";
import SplashScreen from "../components/SplashScreen.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

export default {
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
