<template>
	<div>
		<PreviewButton
			:button-text="'SHOW PREVIEW'"
			:preview-button-visible="previewButtonVisible"
			:is-inited="isInited"
			@previewClick="openHtmlImport"
		/>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email HTML Import'"
					:doc-url="'https://chamaileon.io/sdk/docs/email-html-importer/'"
					:image="'HtmlImportIllustration.svg'"
					button-text="Open preview"
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
		<Footer :previous="'Email HTML Generator'" :prevTo="'/htmlgenerator'" />
	</div>
</template>

<script>
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Footer from "../../ViewUtilities/components/Footer.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import PreviewButton from "../../AppElements/components/PreviewButton.vue";
import { mapGetters, mapActions, mapState } from "vuex";

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
		...mapGetters({
			getPreviewConfigObject: "getPreviewConfigObject",
		}),
		isInited() {
			// if (this.sdkInited === true) {
			// 	return this.htmlImportInited;
			// }
			return "false";
		},
	},
	mounted() {
		this.$store.dispatch("fetchDummyHtml");
	},
	methods: {
		async openHtmlImport() {
			if (!this.$chamaileon.htmlImport) {
				this.$chamaileon.htmlImport = await this.$chamaileon.createPlugins.createHtmlImport({
					// ...this.$store.getters.getHtmlImportConfigObject,				
					id: "htmlImport",
					hooks: {
						cancel: () => {
							console.log('TODO CANCEL');
							this.$chamaileon.htmlImport.hide();
						},
						close: () => {
							console.log('TODO CLOSE');
							this.$chamaileon.htmlImport.hide();
						},
						importReady: async (message) => {
							console.log('TODO onButtonClicked');
							const template = {
								content: message.document
							};
							console.log(message.document);
							this.$chamaileon.htmlImport.hide();
							// let templateBody;
							// if (template.version !== "2.0.0") {
							// 	templateBody = convertNodes(template.content);
							// 	const emailData = {
							// 		...templateBody,
							// 		blocks: template.blocks || [],
							// 		version: "2.0.0",
							// 	};
							// 	await this.createEmail(emailData, "import");
							// } else {
							// 	await this.createEmail(template, "import");
							// }

							// this.closeHtmlImport();
						},
						onButtonClicked: async ({ buttonId, data }) => {
							console.log('TODO onButtonClicked');
							// console.log("variable editor => button clicked: ", buttonId, data);

							// if (buttonId === "close") {
							// 	console.log("variable editor => closing");
							// 	console.log(this.$chamaileon);
							// 	const newJson = await this.$chamaileon.htmlImport.methods.getDocument();
							// 	this.$store.commit("updateDocument", newJson);
							// 	// exampleJsonTextArea.value = JSON.stringify(newJson);
							// 	this.$chamaileon.htmlImport.hide();
							// }
						},
					},
				});
			}
			console.log(this.$chamaileon.htmlImport);
			this.$chamaileon.htmlImport.show();
		},
		showPreviewButton(isVisible) {
			this.previewButtonVisible = isVisible;
		},
	}
};
</script>

<style></style>
