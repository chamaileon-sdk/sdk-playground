<template>
	<v-app>
		<SectionObserver>
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
	</v-app>
</template>

<script>
import Footer from "../components/Footer.vue";
import SectionObserver from "../components/SectionObserver.vue";
import Logo from "../components/Dashboard/Logo.vue";
import Language from "../components/Dashboard/Language.vue";
import Colors from "../components/Dashboard/Colors.vue";
import SplashScreen from "../components/Dashboard/SplashScreen.vue";

export default {
	components: {
		SectionObserver,
		Footer,
		Logo,
		Colors,
		SplashScreen,
		Language,
	},
};
</script>

<style></style>
