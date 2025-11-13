<!-- eslint-disable vue/no-v-html -->
<template>
	<v-dialog
		v-model="getShowExternalElementSocialMediaEmbedModal"
		style="z-index: 5000;"
		max-width="600"
		persistent
		@click:outside="close"
	>
		<v-sheet
			class="pa-4"
			elevation="0"
			tile
		>
			<h4 class="text-h6">
				Social Media Post Embed
			</h4>
			<v-row no-gutters class="mb-4">
				<v-text-field
					v-model="sourceUrl"
					style="width: 100%;"
					outlined
					dense
					:error-messages="socialBrandUrlErrors"
					:error="socialBrandUrlErrors.length > 0"
					append-icon="mdi-link"
					input-label="Paste a public post URL (Facebook, X, Instagram). An image snapshot will be inserted automatically."
					placeholder="Enter social media post URL"
					@input="updateSourceUrl($event)"
				/>
			</v-row>
			<v-row no-gutters class="mb-4">
				<v-col cols="6">
					<span class="font-weight-medium text-caption">
						Image size {{ imageWidth }}px
					</span>
					<v-slider
						v-model="imageWidth"
						class="mr-6"
						hide-details
						:thumb-size="32"
						:max="parentWidth"
						:min="32"
						@change="imageWidth = String(imageWidth)"
					/>
				</v-col>
				<v-col cols="6">
					<span class="font-weight-medium text-caption">
						Theme (available for Twitter/X embeds)</span>
					<v-select
						v-model="theme"
						style="max-width: 232px;"
						outlined
						dense
						:disabled="platform !== 'twitter' && platform !== 'x' ? true : false"
						hide-details
						:items="[
							{ name: 'Light', value: 'light' },
							{ name: 'Dark', value: 'dark' },
						]"
						item-text="name"
						item-value="value"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters class="mb-4">
				<v-col>
					Example URLs:
					<ul class="pl-4 mb-0">
						<li>https://www.facebook.com/photo.php?fbid=1330737925764891&set=pb.100064860875397.-2207520000</li>
						<li>https://www.instagram.com/p/DO1GNJykZx6/</li>
						<li>https://www.instagram.com/reel/DQcbuR5Efs-/</li>
						<li>https://x.com/X/status/1955345054547038520</li>
					</ul>
				</v-col>
			</v-row>
			<div class="d-flex justify-end">
				<v-btn @click="close">
					Close
				</v-btn>
				<v-btn
					class="ml-2"
					color="primary"
					:disabled="notValid"
					@click="insertImage"
				>
					Insert
				</v-btn>
			</div>
		</v-sheet>
	</v-dialog>
</template>

<script>

import { mapGetters, mapMutations } from "vuex";
export default {
	data() {
		return {
			socialBrandUrlErrors: [],
			socialMediaPatterns: {
				facebook: /^(?:https?:\/\/)?(?:www\.)?(?:facebook|fb)\.com\/(?:[^\/]+\/videos|reel\/(\d+)|photo(?:\.php|\/)?\?fbid=(\d+))/i,
				twitter: /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/([A-Za-z0-9_]+)\/status\/(\d+)(?:[/?].*)?$/i,
				x: /^(?:https?:\/\/)?(?:www\.)?x\.com\/([A-Za-z0-9_]+)\/status\/(\d+)(?:[/?].*)?$/i,
				instagram: /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/i,
			},
			timeoutId: null,
			sourceUrl: "",
			platform: "",
			postId: "",
			theme: "light",
			imageWidth: 500,
			page: "",
		};
	},
	computed: {
		...mapGetters([
			"getShowExternalElementSocialMediaEmbedModal",
			"getExternalElementJson",
		]),
		externalElementJson() {
			return this.getExternalElementJson;
		},
		parentWidth() {
			return this.externalElementJson.parentWidth;
		},
		notValid() {
			return this.socialBrandUrlErrors.length > 0 || this.sourceUrl === "";
		},
	},
	methods: {
		...mapMutations([
			"updateExternalElementSocialImageData",
		]),
		updateSourceUrl(url) {
			clearTimeout(this.timeoutId);
			const trimmedUrl = url.trim();
			this.timeoutId = setTimeout(() => {
				this.sourceUrl = trimmedUrl;
				this.validateSocialBrandUrl(trimmedUrl);
			}, 500);
		},
		validateSocialBrandUrl(url) {
			this.socialBrandUrlErrors = [];
			if (!url) {
				this.socialBrandUrlErrors.push("This field cannot be empty.");
				return;
			}
			for (const [brand, pattern] of Object.entries(this.socialMediaPatterns)) {
				if (!url.includes(brand) || !pattern.test(url)) {
					this.socialBrandUrlErrors.push("Invalid URL format.");
					continue;
				}
				this.socialBrandUrlErrors = [];
				this.page = "";
				if (brand === "facebook") {
					this.platform = "facebook";
					if (url.includes("/videos/")) {
						this.page = (url.match(/facebook\.com\/([^\/]+)\/videos\/\d+/i) || [])[1];
						this.postId = (url.match(/videos\/(\d+)/i) || [])[1];
					} else if (url.includes("/reel/")) {
						this.page = "reel";
						this.postId = (url.match(/reel\/(\d+)/i) || [])[1];
					} else {
						this.postId = (url.match(/fbid=(\d+)/) || [])[1];
					}
				}
				if (brand === "instagram") {
					this.postId = (url.match(/\/(?:p|reel)\/([a-zA-Z0-9_-]+)/) || [])[1];
					this.platform = "instagram";
				}
				if (brand === "twitter" || brand === "x") {
					this.postId = (url.match(/status\/(\d+)/) || [])[1];
					this.platform = brand;
				}
				return;
			}
		},
		insertImage() {
			if (!this.sourceUrl
				|| this.socialBrandUrlErrors.length > 0
				|| !this.postId) return;
			this.$store.dispatch("fetchSocialEmbedImage", {
				sourceUrl: this.sourceUrl,
				platform: this.platform,
				postId: this.postId,
				imageWidth: this.imageWidth,
				theme: this.theme,
				page: this.page,
			});
			this.close();
		},
		close() {
			this.$store.commit("setShowExternalElementSocialMediaEmbedModal", false);
			this.$store.commit("setPromiseResolver", null);
			this.$store.commit("setPromiseRejecter", null);
			this.sourceUrl = "";
			this.socialBrandUrlErrors = [];
			this.platform = "";
			this.postId = "";
			this.page = "";
		},
	},
};
</script>
