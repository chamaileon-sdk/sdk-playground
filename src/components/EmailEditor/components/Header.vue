<template>
	<div>
		<h2>Header</h2>
		<p>
			You can add buttons and dropdowns to the right of the header. It is a
			great way to interact with your application from this plugin. Whenever you
			click on a button or a dropdown item, a hook will be called with the ID of
			that button. This allows you to attach any custom functionality to each
			button.
		</p>
		<OptionsWrapper>
			<HeaderPreview />
		</OptionsWrapper>

		<div>
			<h3>Inline Header Buttons</h3>
			<p>
				Hardcoded inline buttons are always visible in the header.
			</p>

			<OptionsWrapper>
				<div
					class="mt-8 list3 rounded"
					style="max-height: 218px; overflow-y: auto"
				>
					<div v-for="(item, ind) in inlineHeaderBtnArr" :key="ind">
						<ListItem3
							:id="ind"
							:title="item.title"
							:visible="item.visible"
							:disable-id="true"
							:hide-delete="true"
							:hide-drag="true"
							:show-visible="true"
							:show-title="true"
							:hide-label="true"
							:hide-icon="true"
							@titleChange="
								updateInlineHeaderButton({
									key: ind,
									target: 'title',
									content: $event,
								});
								updateEditorSettings();
							"
							@visibilityChange="
								updateInlineHeaderButton({
									key: ind,
									target: 'visible',
									content: !item.visible,
								});
								updateEditorSettings();
							"
						/>
						<v-divider v-show="ind !== inlineHeaderBtnArr.length - 1" />
					</div>
				</div>
			</OptionsWrapper>
		</div>

		<h3>Your Buttons and Dropdowns</h3>
		<p>
			You can add and customize your buttons and dropdowns below. The icon is
			required to be a <br>
			<a
				href="https://pictogrammers.github.io/@mdi/font/6.5.95/"
				target="_blank"
			>Material Design Icon</a>
			without <em>mdi-</em> prefix. Keep in mind that the header can only store
			a limited amount of buttons.
		</p>
		<OptionsWrapper>
			<v-container>
				<v-row
					align="center"
					justify="end"
					class="ma-0"
				>
					<AddButton class="mr-lg-6" @click="addBtn(); updateEditorSettings();">
						New Button
					</AddButton>
					<AddButton class="mt-6 mt-lg-0" @click="addDD(); updateEditorSettings();">
						New DropDown
					</AddButton>
				</v-row>
			</v-container>
			<List6 :section="'Editor'" />
		</OptionsWrapper>
	</div>
</template>

<script>
import AddButton from "../../ViewUtilities/components/AddButton.vue";
import HeaderPreview from "./Header/HeaderPreview.vue";
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import List6 from "../../Lists/components/List6.vue";
import ListItem3 from "../../Lists/components/ListItem3.vue";
import { mapMutations, mapActions } from "vuex";

export default {
	components: {
		AddButton,
		HeaderPreview,
		OptionsWrapper,
		List6,
		ListItem3,
	},
	data() {
		return {
			rules: {
				required: value => !!value || "Required.",
				unique: value => !this.$store.state.editorConfig.idArr.includes(value),
			},
		};
	},
	computed: {
		inlineHeaderBtnArr: {
			get() {
				return this.$store.state.editorConfig.settings.buttons.inlineHeader;
			},
			set(val) {
				this.updateInlineHeaderButton(val);
			},
		},
	},
	methods: {
		...mapMutations({
			addBtn: "addEditorBtn",
			addDD: "addEditorDropdown",
			updateInlineHeaderButton: "updateInlineHeaderButton",
		}),
		...mapActions({
			updateEditorSettings: "updateEditorSettings",
		}),
	},
};
</script>

<style></style>
