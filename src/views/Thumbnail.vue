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

	computed: {
		config() {
			return this.$store.getters.getThumbnailSettings;
		},
		code() {
			return `const thumbnailInstance = await chamaileonPlugins.createThumbnail({
    document: {}, 
    container: "${this.config.container}", //Can change it in your code
    width: ${this.config.width},
    height: ${this.config.height},
    scale: ${this.config.scale}
    scroll: ${this.config.scroll},
});`;
		},
	},
};
</script>

<style></style>
