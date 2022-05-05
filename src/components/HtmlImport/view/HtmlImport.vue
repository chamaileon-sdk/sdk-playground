<template>
	<div>
		<PreviewButton
			:button-text="'Open HTML import'"
			:preview-button-visible="previewButtonVisible"
			:is-inited="isInited"
			@previewClick="openHtmlImport"
		/>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Email HTML Import'"
					:doc-url="'https://chamaileon.io/sdkv2/docs/email-html-importer/'"
					:image="'HtmlImportIllustration.svg'"
					:button-text="/*'Open HTML import'*/null"
					@showPreviewButton="showPreviewButton"
					@previewClick="openHtmlImport"
				>
					<p>
						Our HTML import plugin allows you to import an existing HTML email
						to the editor and make changes to it. The output is a JSON object,
						which the editor can process. Currently, there are no available
						options for this plugin.
					</p>
				</Description>
			</div>
		</SectionObserver>
		<Footer :previous="'Email HTML Generator'" :prev-to="'/htmlgenerator'" />
	</div>
</template>

<script>
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Footer from "../../ViewUtilities/components/Footer.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import PreviewButton from "../../AppElements/components/PreviewButton.vue";
import { mapState } from "vuex";

export default {
	components: {
		SectionObserver,
		Description,
		Footer,
		PreviewButton,
	},
	data() {
		return {
			previewButtonVisible: true,
		};
	},
	computed: {
		...mapState({
			htmlImportInited: state => state.htmlImportInited,
			sdkInited: state => state.sdkInited,
		}),
		isInited() {
			if (this.sdkInited === true) {
				return this.htmlImportInited;
			}
			return "pending";
		},
	},
	watch: {
		isInited: {
			handler(v) {
				if (v === false) {
					this.$store.dispatch("initHtmlImport");
				}
			},
			immediate: true,
		},
	},
	mounted() {
		this.$store.dispatch("fetchDummyHtml");
	},
	methods: {
		async openHtmlImport() {
			if (this.isInited === false) {
				await this.$store.dispatch("initHtmlImport");
			}
			this.$chamaileon.htmlImport.show();
			return;
		},
		showPreviewButton(isVisible) {
			this.previewButtonVisible = isVisible;
		},
	},
};
</script>

<style></style>
