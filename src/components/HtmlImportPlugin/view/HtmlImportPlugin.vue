<template>
	<div>
		<PreviewButton
			:button-text="'Open HTML import plugin'"
			:preview-button-visible="previewButtonVisible"
			:is-inited="isInited"
			@previewClick="openHtmlImport"
		/>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Email HTML Import Plugin'"
					:doc-url="'https://chamaileon.io/sdk/v2/docs/email-html-import-plugin/'"
					:image="'HtmlImportIllustration.svg'"
					:button-text="'Open HTML import plugin'"
					:is-inited="isInited"
					@showPreviewButton="showPreviewButton"
					@previewClick="openHtmlImport"
				>
					<p>
						Our HTML import plugin allows you to import an existing HTML email and
						convert it into our email document JSON format. Then, you can directly
						load it into any of our other plugins, make changes to it or save it in
						your system.
					</p>
				</Description>
			</div>
			<div id="header" class="section">
				<Header />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Variable Editor'"
			:prev-to="'/variableeditor'"
			:next="'Email HTML Generator'"
			:next-to="'/htmlgenerator'"
		/>
	</div>
</template>

<script>
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Footer from "../../ViewUtilities/components/Footer.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import PreviewButton from "../../AppElements/components/PreviewButton.vue";
import Header from "../components/Header.vue";
import { mapState } from "vuex";

export default {
	components: {
		// eslint-disable-next-line vue/no-reserved-component-names
		Header,
		SectionObserver,
		Description,
		// eslint-disable-next-line vue/no-reserved-component-names
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
