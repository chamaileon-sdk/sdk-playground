<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email Editor'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-editor/'"
					:paragraph1="paragraph1"
					:paragraph2="paragraph2"
					:image="'EmailEditorIllustration.svg'"
				/>
			</div>

			<div class="section" id="header">
				<Header />
			</div>

			<div class="section" id="text-insert">
				<TextInsert />
			</div>

			<div class="section" id="elements">
				<Elements />
			</div>

			<div class="section" id="block-libraries">
				<BlockLibraries />
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
	</div>
</template>

<script>
import OpenButton from "../components/AppElements/components/OpenButton.vue";
import Footer from "../components/ViewUtilities/components/Footer.vue";
import SectionObserver from "../components/AppElements/components/SectionObserver.vue";
import Header from "../components/EmailEditor/components/Header";
import Elements from "../components/EmailEditor/components/Elements";
import BlockLibraries from "../components/EmailEditor/components/BlockLibraries";
import TextInsert from "../components/EmailEditor/components/TextInsert";
import Addons from "../components/EmailEditor/components/Addons";
import Settings from "../components/EmailEditor/components/Settings";
import Description from "../components/ViewUtilities/components/ViewDescription.vue";

import { mapGetters, mapState } from "vuex";

export default {
	data() {
		return {
			paragraph1:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum ullam consectetur quidem repellendus facilis deserunt architecto, debitis nihil? Repellat nesciunt beatae eius nulla incidunt iure modi sint consequuntur esse.",
			paragraph2:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nostrum ullam consectetur quidem repellendus facilis deserunt architecto, debitis nihil? Repellat nesciunt beatae eius nulla incidunt iure modi sint consequuntur esse.",
		};
	},

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
		Description,
	},

	methods: {
		openEditor() {
			this.sdk.editEmail({
				...this.$store.getters.getConfigObject,
				hooks: {
					onSave: (obj) => {
						return new Promise(
							function (resolve) {
								this.$store.commit("updateDocument", obj.document);
								return resolve();
							}.bind(this)
						);
					},
					onAutoSave: (obj) => {
						return new Promise(
							function (resolve) {
								this.$store.commit("updateDocument", obj.document);
								return resolve();
							}.bind(this)
						);
					},

					onChange: () => {
						return new Promise((resolve) => {
							resolve();
						});
					},

					onBeforeClose: () => {
						return new Promise((resolve) => {
							resolve();
						});
					},

					onAfterClose: () => {
						return new Promise((resolve) => {
							resolve();
						});
					},

					onEditTitle: ({ title }) => {
						return new Promise((resolve) => {
							resolve();
						});
					},

					onEditImage: ({
						originalImage,
						lockDimensions: { width, height },
					}) => {
						return new Promise((resolve) => {
							resolve({ src });
						});
					},

					onEditBackgroundImage: () => {
						return new Promise((resolve) => {
							resolve({ src });
						});
					},

					onLoadBlocks: ({ libId }) => {
						const blocks = this.$store.getters.getBlocksById(libId);

						return new Promise((resolve) => {
							resolve({ blocks });
						});
					},

					onBlockSave: ({ libId, block }) => {
						this.$store.commit("addBlockToLib", { libId: libId, block: block });

						return new Promise((resolve) => {
							resolve({ block });
						});
					},

					onBlockRename: ({ libId, block: { _id, title } }) => {
						this.$store.commit("renameBlock", {
							libId: libId,
							block: { _id, title },
						});

						return new Promise((resolve) => {
							resolve();
						});
					},

					onBlockDelete: ({ libId, block: { _id } }) => {
						this.$store.commit("deleteBlock", {
							libId: libId,
							blockId: _id,
						});

						return new Promise((resolve) => {
							resolve();
						});
					},

					onHeaderButtonClicked: ({ buttonId }) => {
						return new Promise((resolve) => {
							resolve();
						});
					},

					onTextInsertPluginButtonClicked: ({ buttonId }) => {
						return new Promise((resolve) => {
							resolve({ value: "Your inserted text." });
						});
					},

					onExpressionEditClicked: ({ expression }) => {
						return new Promise((resolve) => {
							resolve({ expression: "<Your inserted expression>" });
						});
					},
				},
			});
		},
	},

	computed: {
		...mapState(["sdk"]),
		...mapGetters(["getConfigObject"]),
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
