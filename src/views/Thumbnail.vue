<template>
	<div>
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
	</div>
</template>

<script>
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
	},
};
</script>

<style></style>
