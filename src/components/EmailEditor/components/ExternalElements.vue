<template>
	<div>
		<h2>External Elements</h2>
		<p>
			You can set up custom elements that shows up as a normal element on the left panel. You can drag & drop it, modify it on drop and also use custom toolboxes with it.
		</p>

		<OptionWrapper>
			<v-row
				align="center"
				justify="end"
				class="ma-0"
			>
				<AddButton
					@click="newExternalElement"
				>
					New External Element
				</AddButton>
			</v-row>
			<v-card
				v-if="externalElements.length > 0"
				class="mx-auto mt-8 list3 rounded"
				elevation="0"
				max-height="600"
				style="overflow-y: auto"
			>
				<div v-for="(eE, ind) in externalElements" :key="ind">
					<v-card
						class="ma-0 pa-2 d-flex flex-column align-center"
						elevation="0"
						tile
					>
						<ListItem3
							:id="eE.id"
							:title="eE.title"
							:icon="eE.icon"
							:visible="true"
							:disable-id="false"
							:hide-delete="false"
							:hide-drag="true"
							:show-visible="false"
							:show-title="true"
							:hide-label="true"
							:hide-icon="false"
							@idChange="updateExternalElement({
								index: ind,
								id: $event,
							})"
							@titleChange="updateExternalElement({
								index: ind,
								title: $event,
							})"
							@iconChange="updateExternalElement({
								index: ind,
								icon: $event,
							})"
							@deleteClicked="deleteExternalElement(ind)"
						/>
						<v-textarea
							class="pa-0 px-4"
							background-color="white"
							color="primary"
							outlined
							style="width:100%"
							label="Default JSON"
							hide-details="true"
							placeholder="Default JSON"
							:value="JSON.stringify(eE.defaultJson, null, '\t')"
							@change="updateDefaultJson({
								index: ind,
								defaultJson: $event,
							})"
						/>
						<v-row class="ma-0 pa-0 mt-2 px-2" style="width:100%">
							<v-col
								class="pa-2 ma-0"
								:cols="breakpoint.lgAndDown ? 6 : 3"
								align-self="center"
							>
								<v-select
									:value="eE.toolbox.type"
									hide-details="true"
									dense
									:items="['contentDialog', 'iframe']"
									outlined
									label="Toolbox type"
									@change="switchExternalElementToolboxType({
										index: ind,
										toolboxType: $event,
									})"
								/>
							</v-col>

							<v-col
								v-show="eE.toolbox.type === 'iframe'"
								class="pa-2 ma-0"
								:cols="breakpoint.lgAndDown ? 6 : 3"
								align-self="center"
							>
								<v-text-field
									dense
									:value="eE.toolbox?.url || ''"
									hide-details="true"
									label="Toolbox url"
									outlined
									@input="
										(e) => {

										}
									"
								/>
							</v-col>
						</v-row>
						<div
							v-show="eE.toolbox.type === 'contentDialog'"
							style="width:100%;"
							class="px-4 py-4"
						>
							<div style="width:100%;background-color:rgba(0,0,0,.1); border-radius:5px;" class="pa-2">
								<p>Button Config</p>
								<v-row align="center" class="ma-0 justify-begin">
									<AddButton class="ml-auto ml-xl-0" @click="addNewExternalElementButton(ind)">
										New Button
									</AddButton>
								</v-row>
								<div
									v-if="eE.toolbox?.buttonConfig?.length > 0"
									class="mt-8 list3 rounded"
									style="max-height: 257px; overflow-y: auto"
								>
									<Draggable v-model="eE.toolbox.buttonConfig" handle=".dtrigger">
										<div v-for="(item, idx) in eE.toolbox.buttonConfig" :key="idx">
											<ListItem6
												:id="item.id"
												:icon="item.icon"
												:label="item.label"
												:item-style="item.style"
												:color="item.color"
												:split="true"
												@idChange="
													updateExternalElementButton({
														elemIndex: ind,
														index: idx,
														id: $event,
													})
												"
												@labelChange="
													updateExternalElementButton({
														elemIndex: ind,
														index: idx,
														label: $event,
													})
												"
												@iconChange="
													updateExternalElementButton({
														elemIndex: ind,
														index: idx,
														icon: $event,
													})
												"
												@colorChange="
													updateExternalElementButton({
														elemIndex: ind,
														index: idx,
														color: $event,
													})
												"
												@styleChange="
													updateExternalElementButton({
														elemIndex: ind,
														index: idx,
														style: $event,
													})
												"
												@deleteClicked="deleteExternalButton({ elemIndex: ind, index: idx })"
											/>
											<v-divider v-show="ind !== eE.toolbox.buttonConfig.length - 1" />
										</div>
									</Draggable>
								</div>
							</div>
						</div>
					</v-card>
					<v-divider v-show="ind !== externalElements.length - 1" />
				</div>
			</v-card>
		</OptionWrapper>
	</div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import AddButton from "../../ViewUtilities/components/AddButton.vue";
import ListItem3 from "../../Lists/components/ListItem3.vue";
import ListItem6 from "../../Lists/components/ListItem6.vue";
import Draggable from "vuedraggable";

export default {
	components: {
		OptionWrapper,
		AddButton,
		ListItem3,
		ListItem6,
		Draggable,
	},
	data() {
		return {};
	},
	computed: {
		breakpoint() {
			return this.$vuetify.breakpoint;
		},
		externalElements() {
			return this.$store.state.editorConfig.settings.externalElements;
		},
	},
	methods: {
		...mapMutations([
			"addExternalElement",
			"updateEditorExternalElement",
			"deleteEditorExternalElement",
			"overrideEditorExternalElementToolbox",
			"addEditorExternalElementButton",
			"updateEditorExternalElementButton",
			"deleteEditorExternalElementButton",

		]),
		...mapActions({
			updateEditorSettings: "updateEditorSettings",
		}),
		addNewExternalElementButton(elemIndex) {
			this.addEditorExternalElementButton(elemIndex);
			this.updateEditorSettings();
		},
		updateExternalElementButton(data) {
			this.updateEditorExternalElementButton(data);
			this.updateEditorSettings();
		},
		deleteExternalButton(data) {
			this.deleteEditorExternalElementButton(data);
			this.updateEditorSettings();
		},
		newExternalElement() {
			this.addExternalElement({
				id: "",
				title: "",
				icon: "",
				toolbox: {
					type: "contentDialog",
					buttonConfig: [],
				},
				defaultJson: {
					type: "",
					attrs: {},
					style: {},
				},
			});
			this.updateEditorSettings();
		},
		updateDefaultJson(data) {
			try {
				const defaultJson = JSON.parse(data.defaultJson);

				this.updateExternalElement({ ...data, defaultJson });
			} catch (err) {
				console.error("Cannot parse defaultJson into object");
			}
		},
		switchExternalElementToolboxType(data) {
			this.overrideEditorExternalElementToolbox(data);
			this.updateEditorSettings();
		},
		updateExternalElement(data) {
			this.updateEditorExternalElement(data);
			this.updateEditorSettings();
		},
		deleteExternalElement(data) {
			this.deleteEditorExternalElement(data);
			this.updateEditorSettings();
		},
	},
};
</script>
