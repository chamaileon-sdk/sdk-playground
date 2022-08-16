<template>
	<div>
		<h2>Settings</h2>
		<p>
			You can choose between the following options to make our plugin better fit you needs.
		</p>
		<h3>Replace images</h3>
		<p>
			You can import images from your HTML to your gallery, and replace them in the template. This parameter sets the default behaviour.
		</p>
		<OptionWrapper>
			<div>
				<v-card
					min-height="72px"
					flat
					class="rounded-0 d-flex pa-4"
					:class="'rounded-t'"
				>
					<v-row>
						<v-col class="align-self-center">
							<v-card-title
								class="ma-0 pa-0 text-subtitle-1"
								style="margin-bottom: -3px !important"
							>
								replaceImages
							</v-card-title>
						</v-col>

						<v-col
							class="align-self-center"
							cols="3"
							lg="2"
						>
							<v-card flat class="ma-0 pa-0 d-flex justify-end align-center">
								<v-switch
									class="ma-0 pa-0 mr-n3"
									color="primary"
									flat
									inset
									:hide-details="true"
									:ripple="false"
									:input-value="replaceImages"
									@change="
										updateSettings({
											key: 'replaceImages',
											value: $event,
										})
									"
								/>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
				<v-divider />
			</div>
		</OptionWrapper>
		<h3>Show Replace Images switch</h3>
		<p>
			You can hide or show the possibility to change the replace image behaviour in the plugin.
		</p>
		<OptionWrapper>
			<div>
				<v-card
					min-height="72px"
					flat
					class="rounded-0 d-flex pa-4"
					:class="'rounded-t'"
				>
					<v-row>
						<v-col class="align-self-center">
							<v-card-title
								class="ma-0 pa-0 text-subtitle-1"
								style="margin-bottom: -3px !important"
							>
								showReplaceSwitch
							</v-card-title>
						</v-col>

						<v-col
							class="align-self-center"
							cols="3"
							lg="2"
						>
							<v-card flat class="ma-0 pa-0 d-flex justify-end align-center">
								<v-switch
									class="ma-0 pa-0 mr-n3"
									color="primary"
									flat
									inset
									:hide-details="true"
									:ripple="false"
									:input-value="showReplaceSwitch"
									@change="
										updateSettings({
											key: 'showReplaceSwitch',
											value: $event,
										})
									"
								/>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
				<v-divider />
			</div>
		</OptionWrapper>
		<h3>Replace switch label</h3>
		<p>
			You can overwrite the default replace switch label with your own.
		</p>
		<OptionWrapper>
			<div>
				<div
					class="font-weight-medium ma-0 pa-0 text-subtitle-1"
					style="margin-bottom: -3px !important"
				>
					replaceImagesMessage
				</div>
				<v-card
					min-height="72px"
					flat
					class="rounded-0 d-flex pa-4"
					:class="'rounded-t'"
				>
					<v-row>
						<v-col>
							<v-text-field
								v-model="replaceImagesMessage"
							/>
						</v-col>
					</v-row>
				</v-card>
				<v-divider />
			</div>
		</OptionWrapper>
	</div>
</template>

<script>
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
	components: {
		OptionWrapper,
	},
	data() {
		return {
			debounce: null,
		};
	},
	computed: {
		...mapGetters({
			settings: "getImportSettings",
		}),
		settingsLength() {
			return 2;
		},
		replaceImages: {
			get() {
				return this.$store.state.importConfig.settings.replaceImages;
			},
			set(val) {
				this.updateImportSettings({ replaceImages: val });
				this.updateImportPluginSettings();
			},
		},
		replaceImagesMessage: {
			get() {
				return this.$store.state.importConfig.settings.replaceImagesMessage;
			},
			set(val) {
				clearTimeout(this.debounce);
				this.debounce = setTimeout(() => {
					this.updateImportSettings({ key: "replaceImagesMessage", value: val });
					this.updateImportPluginSettings();
				}, 600);
			},
		},
		showReplaceSwitch: {
			get() {
				return this.$store.state.importConfig.settings.showReplaceSwitch;
			},
			set(val) {
				this.updateImportSettings({ showReplaceSwitch: val });
				this.updateImportPluginSettings();
			},
		},
	},
	methods: {
		...mapMutations([ "updateImportSettings" ]),
		...mapActions([ "updateImportPluginSettings" ]),

		updateSettings(obj) {
			this.updateImportSettings(obj);
			this.updateImportPluginSettings();
		},
	},
};
</script>

<style scoped>
.right-input >>> input {
	text-align: right;
}
</style>
