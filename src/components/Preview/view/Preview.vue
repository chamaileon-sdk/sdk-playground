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
					:title="'Email Preview'"
					:docUrl="'https://chamaileon.io/sdk/docs/email-preview/'"
					:image="'EmailPreviewIllustration.svg'"
				>
					<p>
						This plugin helps you to show your customers how an email looks like
						on different devices.<br />
						You can fully customize and extend the functionality of this plugin
						by adding different buttons to the header and defining how each
						button behaves, through a hook.
					</p>
				</Description>
			</div>
			<div class="section" id="header">
				<Header />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email Thumbnail'"
			:prevTo="'/emailthumbnail'"
			:next="'Email Editor'"
			:nextTo="'/emaileditor'"
		/>
	</div>
</template>

<script>
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Header from "../components/Header.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";

export default {
	components: {
		Header,
		Footer,
		SectionObserver,
		Description,
	},
	data() {
		return {
			section: null
		}
	},
	created() {
		this.section = this.$route.hash
	},
	methods: {
		openEditor() {
			this.$store.state.sdk.previewEmail({
				...this.$store.getters.getPreviewConfigObject,
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
