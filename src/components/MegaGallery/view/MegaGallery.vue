<template>
	<div>
		<div class="stickyDiv" v-if="this.section !== '#home'">
		<v-btn
			depressed
			class="grey lighten-3 pa-3 custom-btn primary--text"
			width="100%"
			height="100%"
			min-width="0"
			@click="openGallery"
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
					:title="'Gallery'"
					:docUrl="'https://chamaileon.io/sdk/docs/gallery/'"
					:image="'EmailThumbnailIllustration.svg'"
				>
					<p>
						The Gallery plugin shows stored image assets to choose from and insert into emails during creation.
						Out of the box supports some basic editing features like cropping and resizing, but 
						with 3rd party image-editor, you can extend it's capability.
						<br>
						<br>
						After set up, open the Gallery from the editor with editing an image element. 
					</p>
				</Description>
			</div>
			<div class="section" id="folder">
				<FolderTree />
			</div>
			<div class="section" id="settings">
				<Settings />
			</div>
			
		</SectionObserver>
		<Footer
			:previous="'Email Editor'"
			:prevTo="'/emaileditor'"
			:next="'Variable Editor'"
			:nextTo="'/variableeditor'"
		/>
	</div>
</template>

<script>
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import FolderTree from "../components/FolderTree";
import Settings from "../components/Settings.vue";

import { mapActions } from "vuex";

export default {
	components: {
		SectionObserver,
		FolderTree,
		Footer,
		Description,
		Settings,
	},
	data() {
		return {
			section: null
		}
	},
	created() {
		this.section = this.$route.hash
	},
	mounted() {
		this.$store.dispatch("updateSDK");
	},
	destroyed() {
		window.chamaileonSdk.destroy;
	},
	methods: {
		...mapActions({
			openGallery: "openGallery"
		})
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
