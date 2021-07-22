<template>
	<div>
		<SectionObserver>
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
import OpenButton from "../components/BaseOpenButton.vue";
import SectionObserver from "../components/SectionObserver.vue";
import Header from "../components/VariableEditor/Header.vue";
import Footer from "../components/VariableEditor/Footer.vue";
import TextInsert from "../components/VariableEditor/TextInsert.vue";
import VariablesToEdit from "../components/VariableEditor/VariablesToEdit.vue";
import NavFooter from "../components/Footer.vue";

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
