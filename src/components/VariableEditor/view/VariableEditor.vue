<template>
	<div>
		<PreviewButton
			button-text="Open variable editor"
			:preview-button-visible="previewButtonVisible"
			:is-inited="isInited"
			@previewClick="openVariableEditor"
		/>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Email Variable Editor'"
					:doc-url="'https://chamaileon.io/sdkv2/docs/email-variable-editor/'"
					:image="'VariableEditorIllustration.svg'"
					:is-inited="isInited"
					button-text="Open variable editor"
					@showPreviewButton="showPreviewButton"
					@previewClick="openVariableEditor"
				>
					<p>
						This plugin is a restricted editor, with which you can only modify
						the variables in an email that you previously defined within the
						email editor. A good use case is when you want to create multiple
						emails, and you only want your users to customize certain parts of
						the email. You can basically create wizards with the variable editor
						that can be used to create multiple brand consistent emails with
						ease.
					</p>
				</Description>
			</div>

			<div id="variablestoedit" class="section">
				<VariablesToEdit />
			</div>

			<div id="header" class="section">
				<Header />
			</div>

			<div id="footer" class="section">
				<Footer />
			</div>

			<div id="custom-fonts" class="section">
				<CustomFonts no-font-files="true" />
			</div>

			<div id="text-insert" class="section">
				<TextInsert />
			</div>
		</SectionObserver>
		<NavFooter
			:previous="'Email Editor'"
			:prev-to="'/emaileditor'"
			:next="'Email HTML Generator'"
			:next-to="'/htmlgenerator'"
		/>
	</div>
</template>

<script>
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import TextInsert from "../components/TextInsert.vue";
import CustomFonts from "../../sharedComponents/CustomFonts";
import VariablesToEdit from "../components/VariablesToEdit.vue";
import NavFooter from "../../ViewUtilities/components/Footer.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import PreviewButton from "../../AppElements/components/PreviewButton.vue";
import { mapState, mapActions } from "vuex";

export default {
	components: {
		Header,
		Footer,
		NavFooter,
		CustomFonts,
		TextInsert,
		SectionObserver,
		VariablesToEdit,
		Description,
		PreviewButton,
	},
	data() {
		return {
			previewButtonVisible: true,
		};
	},
	computed: {
		...mapState({
			variableEditorInited: state => state.variableEditorInited,
			document: state => state.document,
		}),
		isInited() {
			return this.variableEditorInited;
		},
	},
	methods: {
		...mapActions({
			initVariableEditor: "initVariableEditor",
		}),
		async openVariableEditor() {
			await this.$store.dispatch("initVariableEditor");
			const document = JSON.parse(JSON.stringify(this.document));
			const data = { document };
			this.$chamaileon.variableEditor.methods.updateData(data);
			this.$chamaileon.variableEditor.show();
		},
		showPreviewButton(isVisible) {
			this.previewButtonVisible = isVisible;
		},
	},
};
</script>

<style></style>
