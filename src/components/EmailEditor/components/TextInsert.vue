<template>
	<div>
		<h2>Text Insert</h2>
		<p>
			If you want to provide predefined merge tags to your customers, text
			insert buttons are a great solution. They work similarly to any other
			configurable buttons in the SDK, whenever a user clicks on them, the
			onTextInsertPluginButtonClicked hook is invoked with a buttonId as a
			parameter.
		</p>
		<OptionWrapper>
			<TextInsertPreview :btn-arr="txtInsertBtnArr" />
		</OptionWrapper>

		<h3>Your Buttons</h3>
		<p>
			In case of these buttons, the icon field expects a URL to an image. You
			can either display the label of the button or the icon, but not both at
			the same time.
		</p>
		<OptionWrapper>
			<div>
				<v-row
					align="center"
					justify="end"
					class="ma-0"
				>
					<AddButton @click="addTextInsertButton(); updateEditorSettings();">
						New Button
					</AddButton>
				</v-row>
			</div>
			<div
				v-if="txtInsertBtnArr.length > 0"
				class="mt-8 list3 rounded"
				style="max-height: 218px; overflow-y: auto"
			>
				<Draggable v-model="txtInsertBtnArr" handle=".dtrigger">
					<div v-for="(item, ind) in txtInsertBtnArr" :key="ind">
						<ListItem3
							:id="item.id"
							:icon="item.icon"
							:label="item.label"
							@idChange="
								updateTextInsertButton({
									index: ind,
									id: $event,
								}); updateEditorSettings();
							"
							@labelChange="
								updateTextInsertButton({
									index: ind,
									label: $event,
								}); updateEditorSettings();
							"
							@iconChange="
								updateTextInsertButton({
									index: ind,
									icon: $event,
								});
								updateEditorSettings();
							"
							@deleteClicked="deleteTextInsertButton(ind); updateEditorSettings();"
						/>
						<v-divider v-show="ind !== txtInsertBtnArr.length - 1" />
					</div>
				</Draggable>
			</div>
		</OptionWrapper>

		<div v-if="txtInsertBtnArr.length > 0">
			<h3>Inline Buttons</h3>
			<p>
				Hardcoded inline buttons that will be visible when at least one or more text insert button is present in the config.
				The icon is
				required to be a <br>
				<a
					href="https://pictogrammers.github.io/@mdi/font/6.5.95/"
					target="_blank"
				>Material Design Icon</a>
				without <em>mdi-</em> prefix.
			</p>
			<OptionWrapper>
				<TextInsertPreview
					:btn-arr="inlineTxtInsertBtnArrFiltered"
					:show-hover="true"
				/>
			</OptionWrapper>

			<OptionWrapper>
				<div
					class="mt-8 list3 rounded"
					style="max-height: 218px; overflow-y: auto"
				>
					<div v-for="(item, ind) in inlineTxtInsertBtnArr" :key="ind">
						<ListItem3
							:id="item.id"
							:icon="item.icon"
							:title="item.title"
							:visible="item.visible"
							:disable-id="true"
							:hide-delete="true"
							:hide-drag="true"
							:show-visible="true"
							:show-title="true"
							:hide-label="true"
							@titleChange="
								updateInlineTextInsertButton({
									key: ind,
									target: 'title',
									content: $event,
								});
								updateEditorSettings();
							"
							@iconChange="
								updateInlineTextInsertButton({
									key: ind,
									target: 'icon',
									content: $event,
								});
								updateEditorSettings();
							"
							@visibilityChange="
								updateInlineTextInsertButton({
									key: ind,
									target: 'visible',
									content: !item.visible,
								});
								updateEditorSettings();
							"
						/>
						<v-divider v-show="ind !== inlineTxtInsertBtnArr.length - 1" />
					</div>
				</div>
			</OptionWrapper>
		</div>

		<div v-if="txtInsertBtnArr.length > 0">
			<h3>CKEditor Buttons</h3>
			<p>
				Hardcoded CKEditor buttons that will be visible when at least one or more text insert button is present in the config.
			</p>
			<OptionWrapper>
				<TextInsertPreview
					:btn-arr="inlineCkTxtInsertBtnArrFiltered"
					:show-hover="true"
				/>
			</OptionWrapper>

			<OptionWrapper>
				<div
					class="mt-8 list3 rounded"
					style="max-height: 218px; overflow-y: auto"
				>
					<div v-for="(item, ind) in inlineCkTxtInsertBtnArr" :key="ind">
						<ListItem3
							:id="item.id"
							:title="item.title"
							:label="item.label"
							:visible="item.visible"
							:disable-id="true"
							:hide-delete="true"
							:hide-drag="true"
							:hide-icon="true"
							:show-title="true"
							:show-visible="true"
							@labelChange="
								updateCKEditorTextInsertButton({
									key: ind,
									target: 'label',
									content: $event,
								}); updateEditorSettings();
							"
							@titleChange="
								updateCKEditorTextInsertButton({
									key: ind,
									target: 'title',
									content: $event,
								});
								updateEditorSettings();
							"
							@visibilityChange="
								updateCKEditorTextInsertButton({
									key: ind,
									target: 'visible',
									content: !item.visible,
								});
								updateEditorSettings();
							"
						/>
						<v-divider v-show="ind !== inlineCkTxtInsertBtnArr.length - 1" />
					</div>
				</div>
			</OptionWrapper>
		</div>
	</div>
</template>

<script>
import AddButton from "../../ViewUtilities/components/AddButton.vue";
import ListItem3 from "../../Lists/components/ListItem3.vue";
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
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
		txtInsertBtnArr: {
			get() {
				return this.$store.state.editorConfig.settings.buttons.textInsert;
			},
			set(val) {
				this.updateTextInsertOrder(val);
			},
		},
		inlineTxtInsertBtnArr: {
			get() {
				return this.$store.state.editorConfig.settings.buttons.inlineTextInsert;
			},
			set(val) {
				this.updateInlineTextInsertButton(val);
			},
		},
		inlineTxtInsertBtnArrFiltered: {
			get() {
				const buttons = this.$store.state.editorConfig.settings.buttons.inlineTextInsert;
				return Object.keys(buttons)
					.filter(key => buttons[key].visible)
					.map((key) => {
						return {
							id: buttons[key].id,
							title: buttons[key].title,
							icon: buttons[key].icon,
							visible: buttons[key].visible,
						};
					});
			},
			set(val) {
				this.updateInlineTextInsertButton(val);
			},
		},
		inlineCkTxtInsertBtnArr: {
			get() {
				return this.$store.state.editorConfig.settings.buttons.cKEditorTextInsert;
			},
			set(val) {
				this.updateCKEditorTextInsertButton(val);
			},
		},
		inlineCkTxtInsertBtnArrFiltered: {
			get() {
				const buttons = this.$store.state.editorConfig.settings.buttons.cKEditorTextInsert;
				return Object.keys(buttons)
					.filter(key => buttons[key].visible)
					.map((key) => {
						return {
							id: buttons[key].id,
							label: buttons[key].label,
							title: buttons[key].title,
							visible: buttons[key].visible,
						};
					});
			},
			set(val) {
				this.updateCKEditorTextInsertButton(val);
			},
		},
	},
	methods: {
		...mapMutations([
			"addTextInsertButton",
			"deleteTextInsertButton",
			"updateTextInsertOrder",
			"updateTextInsertButton",
			"updateInlineTextInsertButton",
			"updateCKEditorTextInsertButton",
		]),
		...mapActions({
			updateEditorSettings: "updateEditorSettings",
		}),

	},
};
</script>

<style></style>
