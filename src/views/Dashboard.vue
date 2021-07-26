<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Chamaileon SDK'"
					:docUrl="'https://chamaileon.io/sdk/docs/'"
					:paragraph1="paragraph1"
					:paragraph2="paragraph2"
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
import Footer from "../components/Footer.vue";
import SectionObserver from "../components/SectionObserver.vue";
import Logo from "../components/Dashboard/Logo.vue";
import Language from "../components/Dashboard/Language.vue";
import Colors from "../components/Dashboard/Colors.vue";
import SplashScreen from "../components/Dashboard/SplashScreen.vue";
import Description from "../components/ViewDescription.vue";

export default {
	data() {
		return {
			paragraph1:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum ullam consectetur quidem repellendus facilis deserunt architecto, debitis nihil? Repellat nesciunt beatae eius nulla incidunt iure modi sint consequuntur esse.",
			paragraph2:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum ullam consectetur quidem repellendus facilis deserunt architecto, debitis nihil? Repellat nesciunt beatae eius nulla incidunt iure modi sint consequuntur esse.",
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
