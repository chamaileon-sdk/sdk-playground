<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email Variable Editor'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-variable-editor/'"
					:paragraphs="paragraphs"
					:image="'VariableEditorIllustration.svg'"
				/>
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
		<NavFooter :previous="'Email Editor'" :prevTo="'/emaileditor'" />
		<OpenButton @openEditorClicked="openEditor" />
	</div>
</template>

<script>
import OpenButton from "../components/AppElements/components/OpenButton.vue";
import SectionObserver from "../components/AppElements/components/SectionObserver.vue";
import Header from "../components/VariableEditor/components/Header.vue";
import Footer from "../components/VariableEditor/components/Footer.vue";
import TextInsert from "../components/VariableEditor/components/TextInsert.vue";
import VariablesToEdit from "../components/VariableEditor/components/VariablesToEdit.vue";
import NavFooter from "../components/ViewUtilities/components/Footer.vue";
import Description from "../components/ViewUtilities/components/ViewDescription.vue";

export default {
	data() {
		return {
			paragraphs: [
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum ullam consectetur quidem repellendus facilis deserunt architecto, debitis nihil? Repellat nesciunt beatae eius nulla incidunt iure modi sint consequuntur esse."
			]
		};
	},

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
