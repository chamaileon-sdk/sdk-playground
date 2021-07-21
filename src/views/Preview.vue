<template>
	<v-app>
		<SectionObserver>
			<div class="section" id="header">
				<Header :actLogoCreator="this.creatorFunction" />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email Thumbnail'"
			:prevTo="'/emailthumbnail'"
			:next="'Email Editor'"
			:nextTo="'/emaileditor'"
		/>
		<OpenButton @openEditorClicked="openEditor" />
	</v-app>
</template>

<script>
import Footer from "../components/Footer.vue";
import SectionObserver from "../components/SectionObserver.vue";
import Header from "../components/Preview/PreviewButtons.vue";
import OpenButton from "../components/BaseOpenButton.vue";

export default {
	components: {
		Header,
		Footer,
		SectionObserver,
		OpenButton,
	},

	methods: {
		openEditor() {
			this.$store.state.sdk.previewEmail({
				...this.$store.getters.getPreviewConfigObject,
			});
		},
	},

	mounted() {
		this.$store.dispatch("updateSDK");
	},

	destroyed() {
		window.chamaileonSdk.destroy;
	},
};
</script>

<style></style>
