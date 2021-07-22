<template>
	<div>
		<SectionObserver>
			<div class="section" id="header">
				<Header :actLogoCreator="this.creatorFunction" />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email Thumbnail'"
			:prevTo="'/emailthumbnail'"
			:next="'Email Editor'"
			:nextTo="'/emaileditor'"
		/>
		<OpenButton @openEditorClicked="openEditor" />
	</div>
</template>

<script>
import Footer from "../components/Footer.vue";
import SectionObserver from "../components/SectionObserver.vue";
import Header from "../components/Preview/PreviewButtons.vue";
import OpenButton from "../components/BaseOpenButton.vue";

export default {
	components: {
		Header,
		Footer,
		SectionObserver,
		OpenButton,
	},

	methods: {
		openEditor() {
			this.$store.state.sdk.previewEmail({
				...this.$store.getters.getPreviewConfigObject,
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

	mounted() {
		this.$store.dispatch("updateSDK");
	},

	destroyed() {
		window.chamaileonSdk.destroy;
	},

	computed: {
		config() {
			return this.$store.getters.getPreviewConfigObject;
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

		code() {
			return `const previewConfig = {
    document: {}, 
    settings: {
      buttons: {
        header: ${this.calculateHeader}
      }
    },
    hooks: {} 
};

const previewInstance = await chamaileonPlugins.previewEmail(previewConfig);`;
		},
	},
};
</script>

<style></style>
