<template>
	<div>
		<PreviewButton
			:button-text="'SHOW PREVIEW'"
			:preview-button-visible="previewButtonVisible"
			:is-inited="isInited"
			@previewClick="openPreview"
		/>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Email Preview'"
					:doc-url="'https://chamaileon.io/sdkv2/docs/email-preview/'"
					:image="'EmailPreviewIllustration.svg'"
					:button-text="'SHOW PREVIEW'"
					:is-inited="isInited"
					@showPreviewButton="showPreviewButton"
					@previewClick="openPreview"
				>
					<p>
						This plugin helps you to show your customers how an email looks like
						on different devices.<br>
						You can fully customize and extend the functionality of this plugin
						by adding different buttons to the header and defining how each
						button behaves, through a hook.
					</p>
				</Description>
			</div>
			<div id="header" class="section">
				<Header />
			</div>
			<div id="settings" class="section">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email Thumbnail'"
			:prev-to="'/emailthumbnail'"
			:next="'Email Editor'"
			:next-to="'/emaileditor'"
		/>
	</div>
</template>

<script>
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Header from "../components/Header.vue";
import Settings from "../components/Settings.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import PreviewButton from "../../AppElements/components/PreviewButton.vue";

import { mapGetters, mapActions, mapState } from "vuex";

export default {
	components: {
		Header,
		Footer,
		SectionObserver,
		Description,
		Settings,
		PreviewButton,
	},
	data() {
		return {
			previewButtonVisible: true,
		};
	},
	computed: {
		...mapState({
			emailPreviewInited: state => state.emailPreviewInited,
			document: state => state.document,
		}),
		...mapGetters({
			getPreviewConfigObject: "getPreviewConfigObject",
		}),
		isInited() {
			return this.emailPreviewInited;
		},
	},
	methods: {
		...mapActions({
			initMegaPreview: "initMegaPreview",
		}),
		async openPreview() {
			await this.$store.dispatch("initEmailPreview");
			const document = JSON.parse(JSON.stringify(this.document));
			const data = { document };
			this.$chamaileon.emailPreview.methods.updateData(data);
			this.$chamaileon.emailPreview.show();
		},
		showPreviewButton(isVisible) {
			this.previewButtonVisible = isVisible;
		},
	},
};
</script>
