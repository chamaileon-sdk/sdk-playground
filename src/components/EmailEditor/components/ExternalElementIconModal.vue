<!-- eslint-disable vue/no-v-html -->
<template>
	<v-dialog
		v-model="getShowExternalElementIconModal"
		style="z-index: 5000;"
		max-width="600"
		persistent
		@click:outside="close"
	>
		<v-sheet
			class="pa-4"
			elevation="0"
			tile
		>
			<h4 class="text-h6">
				Icons
			</h4>
			<v-row no-gutters class="mb-2">
				<v-col cols="12">
					<v-text-field
						v-model="iconName"
						class="mr-6"
						outlined
						dense
						placeholder="Search icon by name"
						hide-details
						type="text"
						@input="iconName = $event"
					/>
				</v-col>
			</v-row>
			<v-row no-gutters class="mb-2 d-flex align-center">
				<v-col cols="6">
					<span class="font-weight-medium text-caption">Icon Type</span>
					<v-select
						v-model="iconType"
						style="max-width: 232px;"
						outlined
						dense
						hide-details
						:items="iconOptions"
						item-text="name"
						item-value="type"
						placeholder="Select icon type"
						@change="changeIconType"
					/>
				</v-col>
				<v-col cols="6">
					<span class="font-weight-medium text-caption">
						Icon Size {{ iconSize }}px
					</span>
					<v-slider
						v-model="iconSize"
						class="mr-6"
						hide-details
						:thumb-size="32"
						:max="parentWidth"
						:min="1"
						@change="iconSize = String(iconSize)"
					/>
				</v-col>
			</v-row>
			<v-row
				no-gutters
				class="mb-2"
			>
				<v-col cols="6">
					<v-select
						v-model="iconStyle"
						class="mr-6"
						hide-details
						:items="iconType === 'mdiIcons' ? mdiIconStylesArr : peepsIconStylesArr"
						item-text="label"
						item-value="value"
						input-label="Icon Style"
						placeholder="Select Icon Style"
						@change="iconStyle = $event"
					/>
				</v-col>
				<v-col
					cols="6"
					class="d-flex flex-column"
				>
					<span class="font-weight-medium text-caption">
						Icon Color
					</span>
					<v-tooltip
						:disabled="!hasNoVariables"
						top
						:max-width="500"
					>
						<template #activator="{ on: onTooltip, attrs: tooltipAttrs }">
							<v-col
								class="pa-0 ma-0"
								v-bind="tooltipAttrs"
								v-on="onTooltip"
							>
								<v-menu
									v-model="variableMenuVisible"
									offset-y
									:disabled="hasNoVariables"
									:close-on-content-click="true"
								>
									<template #activator="{ on, attrs }">
										<v-text-field
											class="mr-6"
											v-bind="attrs"
											placeholder="Select Icon Color"
											readonly
											outlined
											dense
											:disabled="hasNoVariables"
											hide-details
											:value="(iconColorName ? iconColorName : 'Default') + (displayIconColor ? ` (${displayIconColor})` : '')"
											v-on="on"
										>
											<template #prepend-inner>
												<span
													:style="`left:0 !important; background-color: ${displayIconColor || defaultColor}; width: 24px; height: 24px; border-radius: 50%`"
													class="mr-2"
												/>
											</template>
											<template #append>
												<v-icon :disabled="hasNoVariables" @click="variableMenuVisible = !variableMenuVisible">
													mdi-pencil-ruler
												</v-icon>
											</template>
										</v-text-field>
									</template>

									<v-list>
										<v-list-item
											v-for="(item, index) in colorVariables.filter(v => v.type === 'color')"
											:key="index"
											dense
											class="px-2 ma-0"
											@click="selectVariable(item)"
										>
											<div
												:style="`background-color: ${item.value}; width: 24px; height: 24px; border-radius: 50%`"
												class="mr-2"
											/>
											<v-list-item-content class="pa-0 ma-0">
												{{ item.name }}
											</v-list-item-content>
											<span class="text--secondary text-caption">
												({{ item.value }})
											</span>
										</v-list-item>
									</v-list>
								</v-menu>
							</v-col>
						</template>
						<span>Variable missing</span>
					</v-tooltip>
				</v-col>
			</v-row>
			<v-row
				no-gutters
				class="mb-2"
				:class="{ 'disabled': true }"
			>
				<h6 class="text-h6 mb-2" style="width: 100%;">
					Icon list to select from:
				</h6>
			</v-row>
			<v-row
				v-if="isIconsLoading"
				no-gutters
				class="d-flex align-center justify-center"
			>
				<v-progress-circular
					v-if="isIconsLoading"
					indeterminate
					color="primary"
					class="ma-4"
				/>
			</v-row>
			<div
				v-else
				ref="scrollContainer"
				class="d-flex flex-wrap overflow-y-auto"
				:style="{
					maxHeight: '300px',
					border: notSelectedErr ? '2px solid red' : 'none',
				}"
				@scroll="onScroll"
			>
				<v-row v-if="iconType === 'mdiIcons'" no-gutters>
					<div
						v-for="(icon) in visibleMdiIcons"
						:key="icon"
						@click="selectIcon(icon)"
					>
						<v-tooltip top>
							<template #activator="{ on: onTooltip, attrs: tooltipAttrs }">
								<span
									v-bind="tooltipAttrs"
									:class="iconStyle && iconStyle !== 'filled' ? `material-icons-${iconStyle}` : 'material-icons'"
									:style="{
										border: selectedIcon === icon ? '2px solid green' : '2px solid transparent',
										cursor: 'pointer',
										fontSize: '40px',
										color: iconStyle === 'two-tone' ? 'transparent' : iconColor,
										backgroundColor: iconStyle === 'two-tone' ? iconColor : 'transparent',
										backgroundClip: 'text',
									}"
									v-on="onTooltip"
								>
									{{ icon }}
								</span>
							</template>
							<span>{{ icon }}</span>
						</v-tooltip>
					</div>
				</v-row>
				<v-row v-if="iconType === 'openPeepsIcons' && !isIconsLoading" no-gutters>
					<div
						v-for="(icon, index) in visiblePeepsIcons"
						:key="icon.name + index"
						class="pa-1"
						@click="selectIcon(icon.name)"
					>
						<v-tooltip top>
							<template #activator="{ on: onTooltip, attrs: tooltipAttrs }">
								<div
									class="d-flex align-center justify-center"
									v-bind="tooltipAttrs"
									:style="{
										border: selectedIcon === icon.name ? '2px solid green' : '2px solid transparent',
										cursor: 'pointer',
										color: iconColor,
									}"
									v-on="onTooltip"
									v-html="icon.content"
								/>
							</template>
							<span>{{ icon.name }}</span>
						</v-tooltip>
					</div>
				</v-row>
				<v-row v-if="iconType === 'humaaans' && !isIconsLoading" no-gutters>
					<div
						v-for="(icon, index) in visibleHumaaansIcons"
						:key="icon.name + index"
						class="pa-1"
						@click="selectIcon(icon.name)"
					>
						<v-tooltip top>
							<template #activator="{ on: onTooltip, attrs: tooltipAttrs }">
								<div
									class="d-flex align-center justify-center"
									v-bind="tooltipAttrs"
									:style="{
										border: selectedIcon === icon.name ? '2px solid green' : '2px solid transparent',
										cursor: 'pointer',
										color: iconColor,
									}"
									v-on="onTooltip"
									v-html="icon.content"
								/>
							</template>
							<span>{{ icon.name }}</span>
						</v-tooltip>
					</div>
				</v-row>
			</div>
			<div style="min-height: 40px;" class="text-center py-2">
				{{ loading ? "Loading..." : "" }}
			</div>
			<div class="d-flex justify-end">
				<v-btn @click="close">
					Close
				</v-btn>
				<v-btn
					class="ml-2"
					color="primary"
					:disabled="!selectedIcon"
					@click="insertIcon"
				>
					{{ isIconUpdate ? "Update" : "Insert" }}
				</v-btn>
			</div>
		</v-sheet>
	</v-dialog>
</template>

<script>
import iconNamesArray from "@/utils/iconNamesArray.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
	data() {
		return {
			defaultColor: "#00C0E7",
			defaultSize: "32",
			variableMenuVisible: false,
			mdiIconStylesArr: [
				"filled", "outlined", "round", "sharp", "two-tone",
			],
			peepsIconStylesArr: [
				"monochromatic",
				"multicolor",
			],
			notSelectedErr: false,
			iconsPerLoad: 100,
			loading: false,
			isIconsLoading: false,
			page: 0,
		};
	},
	computed: {
		...mapGetters([
			"getShowExternalElementIconModal",
			"getExternalElementJson",
		]),
		isIconUpdate() {
			return this.$store.state.editorConfig.externalElementIconData.isIconUpdate;
		},
		selectedIcon: {
			get() {
				return this.$store.state.editorConfig.externalElementIconData.selectedIcon;
			},
			set(value) {
				this.updateExternalElementIconData({ selectedIcon: value });
			},
		},
		iconOptions() {
			return [
				{
					type: "mdiIcons",
					name: "Material Design Icons",
				},
				{
					type: "openPeepsIcons",
					name: "Open Peeps",
				},
				{
					type: "humaaans",
					name: "Humaaans",
				},
			];
		},
		iconName: {
			get() {
				return this.$store.state.editorConfig.externalElementIconData.iconName;
			},
			set(value) {
				this.updateExternalElementIconData({ iconName: value.toLowerCase() });
			},
		},
		iconSize: {
			get() {
				return this.$store.state.editorConfig.externalElementIconData.iconSize || this.defaultSize;
			},
			set(value) {
				this.updateExternalElementIconData({ iconSize: value });
			},
		},
		iconStyle: {
			get() {
				if (this.iconType === "openPeepsIcons") return this.$store.state.editorConfig.externalElementIconData.iconStyle || "monochromatic";
				if (this.iconType === "mdiIcons") return this.$store.state.editorConfig.externalElementIconData.iconStyle || "filled";
				return "";
			},
			set(value) {
				this.updateExternalElementIconData({ iconStyle: value });
				this.resetSearchModifiers();
			},
		},
		iconType: {
			get() {
				return this.$store.state.editorConfig.externalElementIconData.iconType || "mdiIcons";
			},
			set(value) {
				this.updateExternalElementIconData({ iconType: value });
				this.resetSearchModifiers();
			},
		},
		iconColorName: {
			get() {
				return this.$store.state.editorConfig.externalElementIconData.iconColorName;
			},
			set(value) {
				this.updateExternalElementIconData({ iconColorName: value });
			},
		},
		displayIconColor: {
			get() {
				return this.$store.state.editorConfig.externalElementIconData.displayIconColor || this.defaultColor;
			},
			set(value) {
				this.updateExternalElementIconData({ displayIconColor: value });
			},
		},
		allPeepsIcons: {
			get() {
				if (this.iconStyle === "monochromatic") return this.$store.state.editorConfig.openPeepsIconsArray.monochromatic;
				if (this.iconStyle === "multicolor") return this.$store.state.editorConfig.openPeepsIconsArray.multicolor;
				return [];
			},
			set(value) {
				if (this.iconStyle === "monochromatic") this.updateOpenPeepsIconsArray({ set: "monochromatic", value });
				if (this.iconStyle === "multicolor") this.updateOpenPeepsIconsArray({ set: "multicolor", value });
			},
		},
		allHumaansIcons: {
			get() {
				return this.$store.state.editorConfig.humaansIconsArray;
			},
			set(value) {
				this.updateHumaansIconsArray(value);
			},
		},
		filteredMdiIcons() {
			if (!this.iconName) return iconNamesArray;
			return iconNamesArray.filter(icon => icon.includes(this.iconName));
		},
		filteredPeepsIcons() {
			if (!this.iconName) return this.allPeepsIcons;
			return this.allPeepsIcons.filter(icon => icon.name.includes(this.iconName));
		},
		filteredHumaans() {
			if (!this.iconName) return this.allHumaansIcons;
			return this.allHumaansIcons.filter(icon => icon.name.includes(this.iconName));
		},
		visibleMdiIcons() {
			const end = (this.page + 1) * this.iconsPerLoad;
			return this.filteredMdiIcons.slice(0, end);
		},
		visibleHumaaansIcons() {
			const end = (this.page + 1) * this.iconsPerLoad;
			return this.filteredHumaans.slice(0, end);
		},
		visiblePeepsIcons() {
			const end = (this.page + 1) * this.iconsPerLoad;
			return this.filteredPeepsIcons.slice(0, end);
		},
		iconColor() {
			return this.displayIconColor ?? this.defaultColor;
		},
		externalElementJson() {
			return this.getExternalElementJson;
		},
		colorVariables() {
			return this.externalElementJson?.variables || [];
		},
		hasNoVariables() {
			return this.colorVariables.length === 0;
		},
		parentWidth() {
			return this.externalElementJson.parentWidth;
		},
	},
	methods: {
		...mapMutations([
			"updateExternalElementIconData",
			"updateOpenPeepsIconsArray",
			"updateHumaansIconsArray",
		]),
		...mapActions({
			fetchOpenPeepsIcons: "fetchOpenPeepsIcons",
			fetchHumaansIcons: "fetchHumaansIcons",
		}),
		updateOpenPeepsColors(color) {
			if (!color) return;
			if (this.iconStyle === "monochromatic") {
				this.allPeepsIcons = this.$store.state.editorConfig.openPeepsIconsArray.monochromatic.map((icon) => {
					return {
						name: icon.name,
						content: icon.content.replace(/fill="(?!#ffffff|#FFFFFF|none)(.*?)"/gi, `fill="${color}"`),
					};
				});
			}
		},
		async changeIconType(type) {
			this.iconType = type;
			if (type === "openPeepsIcons") {
				if (this.iconStyle !== "monochromatic" && this.iconStyle !== "multicolor") this.iconStyle = "monochromatic";
				this.isIconsLoading = true;
				await this.fetchOpenPeepsIcons();
				this.isIconsLoading = false;
				this.updateOpenPeepsColors(this.displayIconColor || this.defaultColor);
			}
			if (type === "mdiIcons") {
				this.iconStyle = "filled";
			}
			if (type === "humaaans") {
				this.isIconsLoading = true;
				await this.fetchHumaansIcons();
				this.isIconsLoading = false;
			}
		},
		selectVariable(variable) {
			this.iconColorName = variable.name;
			this.displayIconColor = this.colorVariables.find(v => v.name === variable.name)?.value || null;
			if (this.iconType === "openPeepsIcons" && this.iconStyle === "monochromatic") {
				this.updateOpenPeepsColors(this.displayIconColor || this.defaultColor);
			}
		},
		selectIcon(icon) {
			if (this.selectedIcon === icon) {
				this.selectedIcon = "";
				return;
			}
			this.selectedIcon = icon;
			this.notSelectedErr = false;
		},
		insertIcon() {
			if (!this.selectedIcon) {
				this.notSelectedErr = true;
				return;
			}
			const type = this.iconType;
			this.$store.dispatch("fetchIconImage", {
				iconGroup: type === "mdiIcons" ? "mdiIcons" : type === "openPeepsIcons" ? "openPeepsIcons" : "humaaans",
				iconName: this.selectedIcon,
				iconStyle: type === "humaaans" ? "multicolor" : this.iconStyle,
				iconColor: this.iconColorName ? `@@${this.iconColorName}@@` : this.defaultColor.slice(1),
				iconSize: this.iconSize,
			});
			this.close();
		},
		resetSearchModifiers() {
			this.iconName = "";
			this.page = 0;
			this.selectedIcon = null;
			this.notSelectedErr = false;
		},
		onScroll(e) {
			const el = e.target;
			if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100 && !this.loading) {
				this.loadMore();
			}
		},
		loadMore() {
			if (this.iconType === "mdiIcons" && this.visibleMdiIcons.length >= this.filteredMdiIcons.length) return;
			if (this.iconType === "openPeepsIcons" && this.visiblePeepsIcons.length >= this.filteredPeepsIcons.length) return;
			this.loading = true;
			setTimeout(() => {
				this.page++;
				this.loading = false;
			}, 200);
		},
		close() {
			this.$store.commit("setShowExternalElementIconModal", false);
			this.selectedIcon = "";
			this.iconName = "";
			this.iconSize = "32";
			this.page = 0;
			this.iconStyle = "filled";
		},
	},
};
</script>
