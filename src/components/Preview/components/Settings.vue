<template>
	<div>
		<h2>Other settings</h2>
		<p>
			You can also select the default view tab of the Email Preview.
		</p>
		<OptionWrapper>
			<v-row
				elevation="0"
				class="d-flex white rounded justify-center align-center pa-4"
			>
				<v-col
					cols="12"
					md="6"
					class="pa-0 ma-0"
				>
					Default view
				</v-col>
				<v-col
					cols="12"
					md="6"
					class="pa-0 ma-0"
				>
					<v-select
						v-model="defaultViewValue"
						class="right-input"
						dense
						outlined
						label="View tab"
						:items="['mobile', 'desktop']"
						:hide-details="true"
					/>
				</v-col>
			</v-row>
			<v-row
				elevation="0"
				class="d-flex white rounded justify-center align-center pa-4 mt-4"
			>
				<v-col
					cols="12"
					md="6"
					class="pa-0 ma-0"
				>
					Proxy Images
				</v-col>
				<v-col
					cols="12"
					md="6"
					class="pa-0 ma-0"
				>
					<v-select
						v-model="proxyImagesValue"
						class="right-input"
						dense
						outlined
						label="Should proxy?"
						:items="[true, false]"
						:hide-details="true"
					/>
				</v-col>
			</v-row>
		</OptionWrapper>
	</div>
</template>

<script>
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
	components: {
		OptionWrapper,
	},
	computed: {
		...mapState({
			defaultView: state => state.previewConfig.settings.defaultView,
			proxyImages: state => state.previewConfig.settings.proxyImages,
		}),
		defaultViewValue: {
			get() {
				return this.defaultView;
			},
			set(value) {
				this.setDefaultView(value);
				this.updatePreviewSettings();
			},
		},
		proxyImagesValue: {
			get() {
				return this.proxyImages;
			},
			set(value) {
				this.setProxyImagesOnPreview(value);
				this.updatePreviewSettings();
			},
		},
	},
	methods: {
		...mapMutations({
			setDefaultView: "setDefaultView",
			setProxyImagesOnPreview: "setProxyImagesOnPreview",
		}),
		...mapActions({
			updatePreviewSettings: "updatePreviewSettings",
		}),
	},
};
</script>

<style></style>
