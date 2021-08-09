<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email Variable Editor'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-variable-editor/'"
					:image="'VariableEditorIllustration.svg'"
				>
					<p>
						This plugin is a restricted editor with which you can only modify
						the variables in an email that you previously defined within the
						email editor. A really good use case is when you want to create
						multiple emails and you only want your users to customize certain
						parts of the email. You can basically create wizards with the
						variable editor that can be used to create multiple brand consistent
						emails with ease.
					</p>
				</Description>
			</div>

			<div class="section" id="variablestoedit">
				<VariablesToEdit />
			</div>

			<div class="section" id="header">
				<Header />
			</div>

			<div class="section" id="footer">
				<Footer />
			</div>

			<div class="section" id="text-insert">
				<TextInsert />
			</div>
		</SectionObserver>
		<NavFooter
			:previous="'Email Editor'"
			:prevTo="'/emaileditor'"
			:next="'Email HTML Generator'"
			:nextTo="'/htmlgenerator'"
		/>
		<OpenButton @openEditorClicked="openEditor" />
	</div>
</template>

<script>
import OpenButton from "../../AppElements/components/OpenButton.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import TextInsert from "../components/TextInsert.vue";
import VariablesToEdit from "../components/VariablesToEdit.vue";
import NavFooter from "../../ViewUtilities/components/Footer.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

export default {
	mounted() {
		this.$store.dispatch("updateSDK");
	},
	destroyed() {
		window.chamaileonSdk.destroy;
	},
	components: {
		Header,
		Footer,
		NavFooter,
		TextInsert,
		SectionObserver,
		OpenButton,
		VariablesToEdit,
		Description,
	},
	methods: {
		async openEditor() {
			const variableEditor = await this.$store.state.sdk.editVariables({
				...this.$store.getters.getVariableEditorConfigObject,
				hooks: {
					onButtonClicked: async ({ buttonId }) => {
						if (buttonId === "close") {
							const newJson = await variableEditor.getDocument();
							this.$store.commit("updateDocument", newJson);
							//exampleJsonTextArea.value = JSON.stringify(newJson);
							variableEditor.close();
						}
					},
				},
			});
		},
	},
};
</script>

<style></style>
