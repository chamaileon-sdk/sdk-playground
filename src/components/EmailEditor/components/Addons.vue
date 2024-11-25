<template>
	<div>
		<h2>Addons</h2>
		<p>
			There are some addons that you can use within the editor, depending on
			your subscription. If you have access to these addons, then you can decide
			if you want to enable them, disable them or even fully hide them. It lets
			you differentiate between the functionality that you want to provide to
			different segments of your users.
		</p>
		<OptionWrapper>
			<div v-for="(item, name, ind) in addonArr" :key="item.id">
				<v-card
					flat
					class="rounded-0 pa-4"
					:class="
						ind === 0
							? 'rounded-t'
							: ind === addonArrLength - 1
								? 'rounded-b'
								: ''
					"
				>
					<v-row>
						<v-col class="align-self-center">
							<v-card-title
								class="ma-0 pa-0 text-subtitle-1"
								style="margin-bottom: -3px !important"
							>
								{{ item.id }}
							</v-card-title>
						</v-col>
						<v-col
							v-if="item.state === 'disabled'"
							class="align-content-right"
						>
							<v-text-field
								:value="getDisabledReason(name)"
								hide-details="true"
								dense
								outlined
								label="disabledReason"
								@input="setDisabledReason(name, $event)"
							/>
						</v-col>
						<v-col
							v-if="item.state === 'enabled' && item.behavior"
							class="align-content-right"
						>
							<v-select
								:value="currentComponentBehavior"
								hide-details="true"
								:items="componentBehaviors"
								label="behavior"
								@input="updateAddonState({ id: item.id, key: 'behavior', value: $event }); updateEditorSettings()"
							/>
						</v-col>
						<v-col class="align-self-center">
							<v-card flat class="d-flex justify-end align-center">
								<v-btn
									class="ml-3"
									icon
									small
									:ripple="false"
									:color="item.state === 'enabled' ? 'primary' : ''"
									@click="updateAddonState({ id: item.id, key: 'state', value: 'enabled' }); updateEditorSettings();"
								>
									<v-icon
										size="25"
									>
										mdi-check-circle{{
											item.state !== "enabled" ? "-outline" : ""
										}}
									</v-icon>
								</v-btn>

								<v-btn
									class="ml-3"
									icon
									small
									:ripple="false"
									:color="item.state === 'disabled' ? 'primary' : ''"
									@click="updateAddonState({ id: item.id, key: 'state', value: 'disabled' }); updateEditorSettings();"
								>
									<v-icon
										size="25"
									>
										mdi-close-circle{{
											item.state !== "disabled" ? "-outline" : ""
										}}
									</v-icon>
								</v-btn>

								<v-btn
									class="ml-3"
									icon
									small
									:ripple="false"
									:color="item.state === 'hidden' ? 'primary' : ''"
									@click="updateAddonState({ id: item.id, key: 'state', value: 'hidden' }); updateEditorSettings();"
								>
									<v-icon
										size="25"
									>
										mdi-eye-off{{ item.state !== "hidden" ? "-outline" : "" }}
									</v-icon>
								</v-btn>
							</v-card>
						</v-col>
					</v-row>
					<v-row>
						<v-text-field
							v-if="'behaviorDescription' in item && (item.state === 'enabled') && currentComponentBehavior === 'both'"
							dense
							hide-details
							outlined
							class="ma-4"
							:value="behaviorDescription"
							label="behaviorDescription"
							@input="setComponentBehaviorDescription(item.id, $event)"
						/>
					</v-row>
				</v-card>
				<v-divider v-show="ind !== addonArrLength - 1" />
			</div>
		</OptionWrapper>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";

export default {
	components: {
		OptionWrapper,
	},
	data() {
		return {
			componentBehaviors: ["nested", "unique", "both"],
		};
	},
	computed: {
		...mapGetters([ "getAddonStateById" ]),
		addonArr() {
			return this.$store.state.editorConfig.settings.addons;
		},
		addonArrLength() {
			return Object.keys(this.addonArr).length;
		},
		behaviorDescription() {
			return this.$store.state.editorConfig.settings.addons.componentSystem.behaviorDescription;
		},
		currentComponentBehavior() {
			return this.$store.state.editorConfig.settings.addons.componentSystem.behavior;
		},
	},
	methods: {
		...mapMutations([
			"updateAddonState",
			"updateAddonDisabledState",
		]),
		...mapActions({
			updateEditorSettings: "updateEditorSettings",
		}),
		getDisabledReason(name) {
			return this.$store.state.editorConfig.settings.addons[name].disabledReason;
		},
		setDisabledReason(name, value) {
			this.updateAddonDisabledState({ name, value });
			this.updateEditorSettings();
		},
		setComponentBehaviorDescription(id, $event) {
			this.updateAddonState({ id, key: "behaviorDescription", value: $event });
			this.updateEditorSettings();
		},
	},

};
</script>

<style></style>
