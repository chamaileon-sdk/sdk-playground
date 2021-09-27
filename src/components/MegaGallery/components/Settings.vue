<template>
	<div>
		<h2>Other settings</h2>
		<p>
			You can also set the maximum size of images that your users still can upload to your server. 
			The Gallery uses infinite scrolling to show the images. You can set the number of pictures to load with a request.
		</p>
		<OptionsWrapper>
			<v-row
				elevation="0"
				class="d-flex white rounded justify-center align-center pa-4"
			>
				<v-col cols="12" md="6" class="pa-0 ma-0">
					<v-text-field
						dense
						v-model.lazy="fileSize"
						class="rounded mr-2"
						hide-details="true"
						label="Maximum File Size"
						outlined
						suffix="MBs"
					></v-text-field>
				</v-col>
				<v-col cols="12" md="6" class="pa-0 ma-0">
					<v-text-field
						dense
						v-model.lazy="imagePerPage"
						class="rounded ml-2 mr-xl-2"
						hide-details="true"
						label="Number of Image Loaded Per Request"
						outlined
					></v-text-field>
				</v-col>
			</v-row>
		</OptionsWrapper>
	</div>
</template>

<script>
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapState, mapMutations } from "vuex";

export default {
	components: {
		OptionsWrapper,
	},
	computed: {
		...mapState({
			maxFileSize: (state) => state.megaGalleryConfig.settings.maxFileSize,
			maxImagePerPage: (state) => state.megaGalleryConfig.settings.maxImagePerPage
		}),
		fileSize: {
			get() {
				return this.maxFileSize;
			},
			set(value) {
				this.setMaxFileSize(value)
			}
		},
		imagePerPage: {
			get() {
				return this.maxImagePerPage
			},
			set(value) {
				this.setMaxImagePerPage(value)
			}
		},
		
	},
	methods: {
		...mapMutations({
			setMaxFileSize: "setMaxFileSize",
			setMaxImagePerPage: "setMaxImagePerPage",
		}),
	},
};
</script>

<style></style>
