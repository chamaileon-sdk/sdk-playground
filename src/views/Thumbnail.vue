<template>
	<Wrapper :code="code">
		<SectionObserver>
			<div class="section" id="settings">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'SDK'"
			:prevTo="'/sdk'"
			:next="'Email Preview'"
			:nextTo="'/emailpreview'"
		/>
	</Wrapper>
</template>

<script>
import Wrapper from "../components/AppRouterViewContainer.vue";
import Footer from "../components/Footer.vue";
import SectionObserver from "../components/SectionObserver.vue";
import Settings from "../components/Thumbnail/ThumbnailSettings.vue";

export default {
	mounted() {
		this.$store.dispatch("updateSDK");
	},
	destroyed() {
		window.chamaileonSdk.destroy;
	},
	components: {
		Settings,
		SectionObserver,
		Footer,
		Wrapper,
	},

	data() {
		return {
			code: "console.log(\"Thumbnail\")",
		};
	},
};
</script>

<style></style>
