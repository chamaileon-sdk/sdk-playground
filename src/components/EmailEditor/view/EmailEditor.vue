<template>
  <div>
    <div class="stickyDiv" v-if="this.section !== '#home'">
      <v-btn
        depressed
        class="grey lighten-3 pa-3 custom-btn primary--text"
        width="100%"
        height="100%"
        min-width="0"
		@click="openEditor"
      >
        <div
          class="
            d-flex
            flex-wrap flex-column
            text-wrap
            grey--text
            text--darken-2
          "
          style="width: 100px"
        >
          <v-icon >mdi-eye</v-icon>
          <span>preview</span>
        </div>
      </v-btn>
    </div>
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
            layout, design systems for your emails, and you can even change the
            access of your team members to those libraries in a team
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

      <div class="section" id="custom-fonts">
        <CustomFonts />
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
      :next="'Gallery'"
      :nextTo="'/gallery'"
    />
  </div>
</template>

<script>
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Header from "../components/Header";
import Elements from "../components/Elements";
import BlockLibraries from "../components/BlockLibraries";
import CustomFonts from "../../sharedComponents/CustomFonts";
import TextInsert from "../components/TextInsert";
import Addons from "../components/Addons";
import Settings from "../components/Settings";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

import { mapGetters, mapState, mapActions } from "vuex";

export default {
	components: {
		SectionObserver,
		Header,
		Footer,
		Elements,
		BlockLibraries,
		CustomFonts,
		TextInsert,
		Addons,
		Settings,
		Description,
	},
	data() {
		return {
			section: null
		}
	},
	computed: {
		...mapState(["sdk"]),
		...mapGetters(["getConfigObject"]),
	},
	created() {
		this.section = this.$route.hash
	},
	methods: {
		...mapActions({
			openGallery: "openGallery",
		}),
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
					onEditImage: async ({
						originalImage,
						lockDimensions,
					}) => {
						const { src }  = await this.openGallery( { editImgSrc: originalImage, dimensions: lockDimensions });					
						return { src };
					},
					onEditBackgroundImage: async ({
						originalImage,
						lockDimensions,
					}) => {
						const { url: src }  = await this.openGallery( { editImgSrc: originalImage, dimensions: lockDimensions });
						return { src };
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
	mounted() {
		this.$store.dispatch("updateSDK");
	},
	destroyed() {
		window.chamaileonSdk.destroy;
	},
	watch: {
		$route(to, from) {
			this.section = to.hash
		}
  	}
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

.stickyDiv {
  text-align: center;
  background-color: rgb(240, 238, 238);
  position: fixed;
  width: 40%;
  left: 24.127%;
  z-index: 5;
  height: 50px;
  line-height: 50px;
  margin-top: 5px;
}

.stickyDiv:hover {
  background-color: rgba(240, 238, 238, 0.619);
  cursor: pointer;
}
</style>
