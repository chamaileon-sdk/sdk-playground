<template>
	<v-app>
		<h1>Text Insert</h1>
		<p>
			Similarly to the email editor, you can configure buttons that will insert predefined texts to a text element. This is a great way to provide merge tags to your users.
		</p>
		<OptionWrapper>
			<TextInsertPreview />
		</OptionWrapper>

		<h3>Buttons</h3>
		<p>
			In case of these buttons, the icons are not from material design icons. They are simple images that you will have to host somewhere.
		</p>
		<OptionWrapper>
			<v-row align="center" justify="end" class="ma-0">
				<AddButton @click="addVETextInsertButton"> New Button</AddButton>
			</v-row>
			<div
				v-show="btnArr.length > 0"
				class="mt-8 list3 rounded"
				style="max-height: 218px; overflow-y: auto"
			>
				<draggable handle=".dtrigger" v-model.lazy="btnArr">
					<div v-for="(item, ind) in btnArr" :key="ind">
						<ListItem3
							:id="item.id"
							:icon="item.icon"
							:label="item.label"
							@idChange="
								updateVETextInsertButton({
									index: ind,
									id: $event,
								})
							"
							@labelChange="
								updateVETextInsertButton({
									index: ind,
									label: $event,
								})
							"
							@iconChange="
								updateVETextInsertButton({
									index: ind,
									icon: $event,
								})
							"
							@deleteClicked="deleteVETextInsertButton(ind)"
						/>
						<v-divider v-show="ind !== btnArr.length - 1"></v-divider>
					</div>
				</draggable>
			</div>
		</OptionWrapper>
	</v-app>
</template>

<script>
import AddButton from "../../ViewUtilities/components/AddButton.vue";
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import ListItem3 from "../../Lists/components/ListItem3.vue";

import TextInsertPreview from "./TextInsert/TextInsertPreview.vue";
import draggable from "vuedraggable";
import { mapMutations } from "vuex";

export default {
	methods: {
		...mapMutations([
			"addVETextInsertButton",
			"deleteVETextInsertButton",
			"updateVETextInsertOrder",
			"updateVETextInsertButton",
		]),
	},
	computed: {
		btnArr: {
			get() {
				return this.$store.state.variableEditorConfig.settings.buttons
					.textInsertPlugin;
			},
			set(val) {
				this.updateVETextInsertOrder(val);
			},
		},
	},
	components: {
		AddButton,
		OptionWrapper,
		draggable,
		TextInsertPreview,
		ListItem3,
	},
};
</script>

<style></style>
