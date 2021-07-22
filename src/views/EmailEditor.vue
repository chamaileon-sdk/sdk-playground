<template>
	<Wrapper :code="code">
		<SectionObserver>
			<div class="section" id="header">
				<Header />
			</div>

			<div class="section" id="elements">
				<Elements />
			</div>

			<div class="section" id="block-libraries">
				<BlockLibraries />
			</div>

			<div class="section" id="text-insert">
				<TextInsert />
			</div>

			<div class="section" id="addons">
				<Addons />
			</div>

			<div class="section" id="settings">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email Preview'"
			:prevTo="'/emailpreview'"
			:next="'Variable Editor'"
			:nextTo="'/variableeditor'"
		/>
		<OpenButton @openEditorClicked="openEditor" />
	</Wrapper>
</template>

<script>
import Wrapper from "../components/AppRouterViewContainer.vue";
import OpenButton from "../components/BaseOpenButton.vue";
import Footer from "../components/Footer.vue";
import SectionObserver from "../components/SectionObserver.vue";
import Header from "../components/EmailEditor/Header";
import Elements from "../components/EmailEditor/Elements";
import BlockLibraries from "../components/EmailEditor/BlockLibraries";
import TextInsert from "../components/EmailEditor/TextInsert";
import Addons from "../components/EmailEditor/Addons";
import Settings from "../components/EmailEditor/Settings";

import { mapGetters, mapState } from "vuex";

export default {
	mounted() {
		this.$store.dispatch("updateSDK");
	},
	destroyed() {
		window.chamaileonSdk.destroy;
	},
	components: {
		SectionObserver,
		Header,
		Footer,
		Elements,
		BlockLibraries,
		TextInsert,
		Addons,
		Settings,
		OpenButton,
		Wrapper,
	},

	methods: {
		openEditor() {
			this.sdk.editEmail({
				...this.$store.getters.getConfigObject,
				hooks: {
					onSave: async (obj) => {
						return new Promise(
							function (resolve) {
								this.$store.commit("updateDocument", obj.document);
								return resolve();
							}.bind(this)
						);
					},
				},
			});
		},

		calculateDDItems(arr) {
			if (arr.length === 0) return "[]";

			let literal = "";

			literal += "[";

			arr.forEach((c) => {
				literal += `\n\t\t\t\t\t\t{
							id: "${c.id}",
                			label: "${c.label}",
                			icon: "${c.icon}",
				\t\t},`;
			});

			literal += "\n\t\t\t\t\t]";

			return literal;
		},
	},

	computed: {
		...mapState(["sdk"]),
		...mapGetters(["getConfigObject"]),

		config() {
			return this.$store.getters.getConfigObject;
		},

		calcualteConfig() {
			if (!this.config.settings.elements.content) return "false";

			return `{
				text: ${this.config.settings.elements.content.text},
				image: ${this.config.settings.elements.content.image},
				button: ${this.config.settings.elements.content.button},
				divider: ${this.config.settings.elements.content.divider},
				social: ${this.config.settings.elements.content.social},
				code:  ${this.config.settings.elements.content.code}
			}`;
		},

		calcualteStructure() {
			if (!this.config.settings.elements.structure) return "false";

			return `{
				fullWidth: ${this.config.settings.elements.structure.fullWidth},
				box: ${this.config.settings.elements.structure.box},
				multiColumn: ${this.config.settings.elements.structure.multiColumn}
			}`;
		},

		calcualteAdvanced() {
			if (!this.config.settings.elements.advanced) return "false";

			return `{
				loop: ${this.config.settings.elements.advanced.loop},
				conditional: ${this.config.settings.elements.advanced.conditional},
				dynamicImage: ${this.config.settings.elements.advanced.dynamicImage}
			}`;
		},

		calculateElements() {
			if (!this.config.settings.elements) return "false";

			return `{
			content: ${this.calcualteConfig},
			structure: ${this.calcualteStructure},
			advanced: ${this.calcualteAdvanced}
		}`;
		},

		calculateBL() {
			if (!this.config.addons.blockLock) return "false";

			return `{
                enabled: ${this.config.addons.blockLock.enabled}
            }`;
		},

		calculateVE() {
			if (!this.config.addons.variableSystem) return "false";

			return `{
                enabled: ${this.config.addons.variableSystem.enabled}
            }`;
		},

		calculateHeader() {
			let literal = "";
			let arr = this.config.settings.buttons.header;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
				{
					${c.type === "button" ? `id: '${c.id}',\n\t\t\t\t\t` : ""}type: '${c.type}',
					icon: '${c.icon}',
					label: '${c.label}',
					color: '${c.color}',
					style: '${c.style}'${
	c.items ? `,\n\t\t\t\t\titems: ${this.calculateDDItems(c.items)}` : ""
}
				},`;
			});
			literal += `
			]`;
			return literal;
		},

		calculateBlockLibs() {
			let literal = "";
			let arr = this.config.blockLibraries;

			if (arr.length === 0) return "[]";

			literal += "[";
			arr.forEach((c) => {
				literal += `
				{
					id: '${c.id}',
					label: '${c.label}',
					accessLevel: '${c.accessLevel}'
				},`;
			});
			literal += `
			]`;
			return literal;
		},

		calculateTextInsert() {
			let literal = "";
			let arr = this.config.settings.buttons.textInsert;

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
			return `const editorInstance = await chamaileonPlugins.editEmail({
	// a JSON object that represents the email document
    document: {},
    user: ${
	this.config.user
		? `{
        name: "${this.config.user.name}",
        avatar: "${this.config.user.avatar}"
    }`
		: "false"
},
    settings: {
        staticAssetsBaseUrl: "https://yourdomain.com/path/to/static/assets/",
        buttons: {
            header: ${this.calculateHeader},
            textInsert: ${this.calculateTextInsert}
        },
        elements: ${this.calculateElements},
        blockLibraries: ${this.calculateBlockLibs},
        addons: {
            blockLock: ${this.calculateBL},
            variableSystem: ${this.calculateVE}
        }
    },
	autoSaveInterval: ${this.config.autoSaveInterval},
    hooks: hooks
});`;
		},
	},
};
</script>

<style>
.v-btn--example {
	position: fixed;
	bottom: 0;
	right: 31%;
	margin-bottom: 64px;
}

body {
	overflow: hidden !important;
}
iframe {
	position: fixed;
}
</style>
