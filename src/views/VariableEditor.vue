<template>
	<Wrapper :code="code">
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
	</Wrapper>
</template>

<script>
import Wrapper from "../components/AppRouterViewContainer.vue";
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
		Wrapper,
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
	computed: {
		config() {
			return this.$store.getters.getVariableEditorConfigObject;
		},

		calculateVariables() {
			let out = "";

			this.config.settings.variablesToEdit.forEach((c) => {
				out += `"${c}",`;
			});

			out = out.slice(0, -1);
			return out;
		},

		calculateHeaderLeft() {
			let literal = "";
			let arr = this.config.settings.buttons.header.left;

			if (arr.length === 0) return "[]";

			literal += `[
				/*It's not necessary to have a close button, 
				but otherwise there is no way to exit the app*/`;
			arr.forEach((c) => {
				literal += `
					{
						id: '${c.id}',
						${c.icon ? `icon: '${c.icon}'` : `label: '${c.label}'`}
					},`;
			});
			literal += `
				]`;
			return literal;
		},

		calculateHeaderRight() {
			let literal = "";
			let arr = this.config.settings.buttons.header.right;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
					{
						id: '${c.id}',
						${c.icon ? `icon: '${c.icon}'` : `label: '${c.label}'`}
					},`;
			});
			literal += `
				]`;
			return literal;
		},

		calculateFooterRight() {
			let literal = "";
			let arr = this.config.settings.buttons.footer.right;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
					{
						id: '${c.id}',
						${c.icon ? `icon: '${c.icon}'` : `label: '${c.label}'`}
					},`;
			});
			literal += `
				]`;
			return literal;
		},

		calculateFooterLeft() {
			let literal = "";
			let arr = this.config.settings.buttons.footer.left;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
					{
						id: '${c.id}',
						${c.icon ? `icon: '${c.icon}'` : `label: '${c.label}'`}
					},`;
			});
			literal += `
				]`;
			return literal;
		},

		calculateTextInsert() {
			let literal = "";
			let arr = this.config.settings.buttons.textInsertPlugin;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
				{
					id: '${c.id}',
					label: '${c.label}',
					icon: '${c.icon}'
				},`;
			});
			literal += `
			]`;
			return literal;
		},

		code() {
			return `const variableEditorConfig = {
    document: {},
    settings: {
        variablesToEdit: [${this.calculateVariables}],
        buttons: {
            header: {
                left: ${this.calculateHeaderLeft},
                right: ${this.calculateHeaderRight},
            },
            footer: {
                left: ${this.calculateFooterLeft},
                right: ${this.calculateFooterRight},
            },
            textInsertPlugin: ${this.calculateTextInsert}
    },
    hooks: {}
};

const variableEditorInstance = await chamaileonPlugins.editVariables(variableEditorConfig)`;
		},
	},
};
</script>

<style></style>
