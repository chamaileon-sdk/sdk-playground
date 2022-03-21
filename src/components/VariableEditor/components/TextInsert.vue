<template>
	<div>
		<h2>Text Insert</h2>
		<p>
			Similarly to the email editor, you can configure buttons that will insert
			predefined texts to a text element. This is a great way to provide merge
			tags to your users. Whenever a user clicks on them, the
			onTextInsertPluginButtonClicked hook is invoked with a buttonId as a
			parameter.
		</p>
		<OptionWrapper>
			<TextInsertPreview />
		</OptionWrapper>

		<h3>Buttons</h3>
		<p>
			In case of these buttons, the icon field expects a URL to an image. You
			can either display the label of the button or the icon, but not both at
			the same time.
		</p>
		<OptionWrapper>
			<v-row
				align="center"
				justify="end"
				class="ma-0"
			>
				<AddButton @click="addVETextInsertButton">
					New Button
				</AddButton>
			</v-row>
			<div
				v-show="btnArr.length > 0"
				class="mt-8 list3 rounded"
				style="max-height: 218px; overflow-y: auto"
			>
				<Draggable v-model.lazy="btnArr" handle=".dtrigger">
					<div v-for="(item, ind) in btnArr" :key="ind">
						<ListItem3
							:id="item.id"
							:icon="item.icon"
							:label="item.label"
							@idChange="
								updateVETextInsertButton({
									index: ind,
									id: $event,
								}); updateVariableEditorSettings();
							"
							@labelChange="
								updateVETextInsertButton({
									index: ind,
									label: $event,
								}); updateVariableEditorSettings();
							"
							@iconChange="
								updateVETextInsertButton({
									index: ind,
									icon: $event,
								}); updateVariableEditorSettings();
							"
							@deleteClicked="deleteVETextInsertButton(ind); updateVariableEditorSettings();"
						/>
						<v-divider v-show="ind !== btnArr.length - 1" />
					</div>
				</Draggable>
			</div>
		</OptionWrapper>
	</div>
</template>

<script>
import AddButton from "../../ViewUtilities/components/AddButton.vue";
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import ListItem3 from "../../Lists/components/ListItem3.vue";

import TextInsertPreview from "./TextInsert/TextInsertPreview.vue";
import Draggable from "vuedraggable";
import { mapMutations, mapActions } from "vuex";

export default {
	components: {
		AddButton,
		OptionWrapper,
		Draggable,
		TextInsertPreview,
		ListItem3,
	},
	computed: {
		btnArr: {
			get() {
				return this.$store.state.variableEditorConfig.settings.buttons
					.textInsertPlugin;
			},
			set(val) {
				this.updateVETextInsertOrder(val);
				this.updateVariableEditorSettings();
			},
		},
	},
	methods: {
		...mapMutations([
			"addVETextInsertButton",
			"deleteVETextInsertButton",
			"updateVETextInsertOrder",
			"updateVETextInsertButton",
		]),
		...mapActions({
			updateVariableEditorSettings: "updateVariableEditorSettings",
		}),
	},
};
</script>

<style></style>
