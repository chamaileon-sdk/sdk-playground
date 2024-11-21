<template>
	<div>
		<h2>Other settings</h2>
		<p>
			You can also set the maximum size (in Megabytes) of the images that your users still can upload to your server.
			The Gallery uses infinite scrolling to show the images. You can set the number of pictures to load with a single request.
		</p>
		<OptionsWrapper>
			<v-row
				elevation="0"
				class="d-flex white rounded justify-center align-center pa-4"
			>
				<v-col
					cols="12"
					md="6"
					class="pa-0 ma-0"
				>
					<v-text-field
						v-model.lazy="fileSize"
						dense
						class="rounded mr-2"
						hide-details="true"
						label="Maximum File Size"
						outlined
						suffix="MBs"
					/>
				</v-col>
				<v-col
					cols="12"
					md="6"
					class="pa-0 ma-0"
				>
					<v-text-field
						v-model.lazy="imagePerPage"
						dense
						class="rounded ml-2 mr-xl-2"
						hide-details="true"
						label="Number of Image Loaded Per Request"
						outlined
					/>
				</v-col>
			</v-row>
		</OptionsWrapper>

		<h3>Panels</h3>
		<p>
			You can control what panels are visible for the users.
		</p>
		<OptionsWrapper>
			<v-card elevation="0" class="d-flex px-2">
				<v-card
					min-height="72px"
					flat
					class="rounded-0 rounded-t d-flex pa-4"
					width="100%"
				>
					<v-row>
						<v-col
							v-for="(value, name) in panels"
							:key="name"
							cols="6"
							class="d-flex justify-space-between align-center"
						>
							<v-card-title
								class="ma-0 pa-0 text-subtitle-1"
								style="margin-bottom: -3px !important"
							>
								{{ name }}
							</v-card-title>
							<v-switch
								:input-value="panels[name]"
								class="ma-0 pa-0"
								color="primary"
								hide-details
								:true-value="true"
								@change="updatePanel($event, name)"
							/>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</OptionsWrapper>

		<h3>Upload options</h3>
		<p>
			You can control what upload options are visible for the users.
		</p>
		<OptionsWrapper>
			<v-card elevation="0" class="d-flex px-2">
				<v-card
					min-height="72px"
					flat
					class="rounded-0 rounded-t d-flex pa-4"
					width="100%"
				>
					<v-row>
						<v-col
							v-for="(value, name) in uploadOptions"
							:key="name"
							cols="6"
							class="d-flex justify-space-between align-center"
						>
							<v-card-title
								class="ma-0 pa-0 text-subtitle-1"
								style="margin-bottom: -3px !important"
							>
								{{ name }}
							</v-card-title>
							<v-switch
								:input-value="uploadOptions[name]"
								class="ma-0 pa-0"
								color="primary"
								hide-details
								:true-value="true"
								@change="updateUploadOption($event, name)"
							/>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</OptionsWrapper>
	</div>
</template>

<script>
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
	components: {
		OptionsWrapper,
	},
	computed: {
		...mapState({
			maxFileSize: state => state.megaGalleryConfig.settings.maxFileSize,
			maxImagePerPage: state => state.megaGalleryConfig.settings.maxImagePerPage,
		}),
		fileSize: {
			get() {
				return this.maxFileSize;
			},
			set(value) {
				this.setMaxFileSize(value);
				this.updateGallerySettings();
			},
		},
		imagePerPage: {
			get() {
				return this.maxImagePerPage;
			},
			set(value) {
				this.setMaxImagePerPage(value);
				this.updateGallerySettings();
			},
		},
		panels() {
			return this.$store.state.megaGalleryConfig.settings.panels;
		},
		uploadOptions() {
			return this.$store.state.megaGalleryConfig.settings.uploadOptions;
		},

	},
	methods: {
		...mapMutations({
			setMaxFileSize: "setMaxFileSize",
			setMaxImagePerPage: "setMaxImagePerPage",
			updateGalleryUploadOption: "updateGalleryUploadOption",
			updateGalleryPanel: "updateGalleryPanel",
		}),
		...mapActions({
			updateGallerySettings: "updateGallerySettings",
		}),
		updatePanel(value, name) {
			this.updateGalleryPanel({ [name]: !!value });
			this.updateGallerySettings();
		},
		updateUploadOption(value, name) {
			this.updateGalleryUploadOption({ [name]: !!value });
			this.updateGallerySettings();
		},
	},
};
</script>

<style></style>
