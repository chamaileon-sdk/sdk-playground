<template>
	<div>
		<h2>Elements</h2>
		<p>
			You can turn on and off basic draggable elements. You can even disable all
			the elements, which is useful if you want your users to be only be able to
			use blocks from predefined block libraries.
		</p>

		<h3>Content</h3>
		<OptionWrapper>
			<v-row class="ma-0 pa-0 mx-n3 mb-n6 mb-xl-0">
				<v-col
					v-for="(element, index) in contentElements"
					:key="index"
					class="my-0 py-2 mb-6 mb-xl-0"
					cols="4"
					xl="2"
				>
					<v-tooltip bottom :disabled="!disableTextElements(element.type)">
						<template #activator="{ on, attrs }">
							<div v-on="on">
								<v-btn
									depressed
									class="pa-0 d-flex"
									height="100%"
									width="100%"
									:attrs="attrs"
									:color="elementsArr.content[element.type] ? 'primary' : 'white'"
									:disabled="disableTextElements(element.type)"
									@click="toggleElement({ type: 'content', element: element.type }); updateEditorSettings();"
								>
									<v-responsive :aspect-ratio="1">
										<div
											class="d-flex flex-column justify-space-around"
											style="height: 100%"
										>
											<div>
												<v-icon x-large>
													{{ element.icon }}
												</v-icon>
												<div v-if="element.alt">
													{{ element.alt }}
												</div>
												<div v-else class="element-break-word">
													{{ element.type }}
												</div>
											</div>
										</div>
									</v-responsive>
								</v-btn>
							</div>
						</template>
						<span>{{ getDisabledTooltipText(element.type) }}</span>
					</v-tooltip>
				</v-col>
			</v-row>
		</OptionWrapper>

		<h3>Structure</h3>
		<OptionWrapper>
			<v-row class="ma-0 pa-0 mx-n3 mb-n6 mb-xl-0">
				<v-col
					v-for="(element, index) in structureElements"
					:key="index"
					class="my-0 py-2 mb-6 mb-xl-0"
					cols="4"
					xl="2"
					@click="toggleElement({ type: 'structure', element: element.type }); updateEditorSettings();"
				>
					<v-btn
						depressed
						class="pa-0 d-flex"
						height="100%"
						width="100%"
						:color="elementsArr.structure[element.type] ? 'primary' : 'white'"
					>
						<v-responsive :aspect-ratio="1">
							<div
								class="d-flex flex-column justify-space-around"
								style="height: 100%"
							>
								<div>
									<v-icon x-large>
										{{ element.icon }}
									</v-icon>
									<div v-if="element.alt">
										{{ element.alt }}
									</div>
									<div v-else class="element-break-word">
										{{ element.type }}
									</div>
								</div>
							</div>
						</v-responsive>
					</v-btn>
				</v-col>
			</v-row>
		</OptionWrapper>

		<h3>Advanced</h3>
		<OptionWrapper>
			<v-row class="ma-0 pa-0 mx-n3 mb-n6 mb-xl-0">
				<v-col
					v-for="(element, index) in advancedElements"
					:key="index"
					class="my-0 py-2 mb-6 mb-xl-0"
					cols="4"
					xl="2"
					@click="toggleElement({ type: 'advanced', element: element.type }); updateEditorSettings();"
				>
					<v-btn
						depressed
						class="pa-0 d-flex"
						height="100%"
						width="100%"
						:color="elementsArr.advanced[element.type] ? 'primary' : 'white'"
					>
						<v-responsive :aspect-ratio="1">
							<div
								class="d-flex flex-column justify-space-around"
								style="height: 100%"
							>
								<div>
									<v-icon x-large>
										{{ element.icon }}
									</v-icon>
									<div v-if="element.alt">
										{{ element.alt }}
									</div>
									<div v-else class="element-break-word">
										{{ element.type }}
									</div>
								</div>
							</div>
						</v-responsive>
					</v-btn>
				</v-col>
			</v-row>
		</OptionWrapper>

		<h2 class="pt-6">
			Element defaults
		</h2>
		<OptionWrapper>
			<v-card
				flat
				class="rounded-0 d-flex pa-4 rounded-t"
			>
				<v-row>
					<v-col class="align-self-center">
						<v-card-title
							class="ma-0 pa-0 text-subtitle-1"
							style="margin-bottom: -3px !important"
						>
							Text element default text
						</v-card-title>
					</v-col>

					<v-col
						class="align-content-right"
						cols="6"
					>
						<v-text-field
							v-model="textElementDefaultText"
							hide-details="true"
							dense
							outlined
							label="text"
						/>
					</v-col>
				</v-row>
			</v-card>
			<v-divider />
			<v-card
				flat
				class="rounded-0 d-flex pa-4 rounded-b"
			>
				<v-row>
					<v-col class="align-self-center">
						<v-card-title
							class="ma-0 pa-0 text-subtitle-1"
							style="margin-bottom: -3px !important"
						>
							Button element default text
						</v-card-title>
					</v-col>

					<v-col
						class="align-content-right"
						cols="6"
					>
						<v-text-field
							v-model="buttonElementDefaultText"
							hide-details="true"
							dense
							outlined
							label="text"
						/>
					</v-col>
				</v-row>
			</v-card>
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
			contentElements: [
				{
					type: "title",
					icon: "mdi-format-header-1",
				},
				{
					type: "list",
					icon: "mdi-format-list-bulleted",
				},
				{
					type: "paragraph",
					icon: "mdi-format-paragraph",
				},
				{
					type: "text",
					icon: "mdi-format-text",
				},
				{
					type: "image",
					icon: "mdi-image",
				},
				{
					type: "button",
					icon: "mdi-card",
				},
				{
					type: "divider",
					icon: "mdi-arrow-split-horizontal",
				},
				{
					type: "social",
					icon: "mdi-account-multiple",
				},
				{
					type: "video",
					icon: "mdi-video-outline",
				},
			],
			structureElements: [
				{
					alt: "Block",
					type: "fullWidth",
					icon: "mdi-window-maximize",
				},
				/* {
						type: 'column',
						icon: 'view_column',
					},*/
				{
					type: "box",
					icon: "mdi-checkbox-blank-outline",
				},
				{
					alt: "columns",
					type: "multiColumn",
					icon: "mdi-view-column",
				},
			],
			advancedElements: [
				{
					type: "code",
					icon: "mdi-code-tags",
				},
				{
					type: "loop",
					icon: "mdi-refresh",
				},
				{
					alt: "cond",
					type: "conditional",
					icon: "mdi-call-split",
				},
				{
					alt: "dyn img",
					type: "dynamicImage",
					icon: "mdi-folder-multiple-image",
				},
				{
					alt: "block-lvl cond",
					type: "blockLevelConditional",
					icon: "mdi-call-split",
				},
				{
					alt: "block-lvl loop",
					type: "blockLevelLoop",
					icon: "mdi-refresh",
				},
			],
		};
	},
	computed: {
		...mapGetters({
			elementsArr: "getElements",
		}),
		textElementDefaultText: {
			get() {
				return this.$store.state.editorConfig.settings.elementDefaults.attrs.text.text;
			},
			set(val) {
				this.updateTextElementDefaultText(val);
				this.updateEditorSettings();
			},
		},
		buttonElementDefaultText: {
			get() {
				return this.$store.state.editorConfig.settings.elementDefaults.attrs.button.text;
			},
			set(val) {
				this.updateButtonElementDefaultText(val);
				this.updateEditorSettings();
			},
		},
	},
	methods: {
		...mapMutations([
			"toggleElement",
			"updateTextElementDefaultText",
			"updateButtonElementDefaultText",
		]),
		...mapActions({
			updateEditorSettings: "updateEditorSettings",
		}),
		disableTextElements(type) {
			if (["title", "paragraph", "list"].includes(type) && this.elementsArr.content.text) {
				return true;
			} else if (type === "text" && this.$store.state.editorConfig.settings.addons.componentSystem.state !== "hidden") {
				return true;
			} else if (type === "text" && (this.elementsArr.content.title || this.elementsArr.content.paragraph || this.elementsArr.content.list)) {
				return true;
			} else {
				return false;
			}
		},
		getDisabledTooltipText(type) {
			const returnArray = [];
			if (["title", "paragraph", "list"].includes(type) && this.elementsArr.content.text) {
				returnArray.push("disable the 'text' element");
			}
			if (type === "text" && (this.elementsArr.content.title || this.elementsArr.content.paragraph || this.elementsArr.content.list)) {
				returnArray.push("disable the 'title', 'list' and 'paragraph' elements");
			}
			if (type === "text" && this.$store.state.editorConfig.settings.addons.componentSystem.state !== "hidden") {
				returnArray.push("disable the 'componentSystem' addon");
			}

			return `To enable this element ${returnArray.join(" and ")}`;
		},
	},
};
</script>

<style>
.element-break-word {
	word-break: break-word;
}
</style>
