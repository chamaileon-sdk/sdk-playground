<template>
	<div>
		<SectionObserver>
			<div class="section" id="home">
				<EmailEditorDescription />
			</div>

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
	</div>
</template>

<script>
import OpenButton from "../components/BaseOpenButton.vue";
import Footer from "../components/Footer.vue";
import SectionObserver from "../components/SectionObserver.vue";
import Header from "../components/EmailEditor/Header";
import Elements from "../components/EmailEditor/Elements";
import BlockLibraries from "../components/EmailEditor/BlockLibraries";
import TextInsert from "../components/EmailEditor/TextInsert";
import Addons from "../components/EmailEditor/Addons";
import Settings from "../components/EmailEditor/Settings";
import EmailEditorDescription from "../components/EmailEditorDescription.vue";

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
		EmailEditorDescription,
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
