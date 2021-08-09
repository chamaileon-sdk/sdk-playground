<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<Description
					:title="'Email Editor'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-editor/'"
					:image="'EmailEditorIllustration.svg'"
				>
					<p>
						With the help of the email editor plugin your users can create
						beautiful emails from scratch. The editor offers many ways of
						customization regarding functionality. You can create a personalized
						layout, design systems for your emails and you can even change the
						access of yout team members to those libraries in a team
						environment.
					</p>
				</Description>
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
import OpenButton from "../../AppElements/components/OpenButton.vue";
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Header from "../components/Header";
import Elements from "../components/Elements";
import BlockLibraries from "../components/BlockLibraries";
import TextInsert from "../components/TextInsert";
import Addons from "../components/Addons";
import Settings from "../components/Settings";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

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