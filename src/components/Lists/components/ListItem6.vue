<template>
	<v-card
		class="ma-0 pa-2 d-flex align-center"
		elevation="0"
		tile
	>
		<v-list-item-icon class="align-self-center ma-0 mx-3">
			<v-icon class="dtrigger">
				mdi-menu
			</v-icon>
		</v-list-item-icon>
		<v-list-item-content class="ma-0 pa-0">
			<v-row class="ma-0 pa-0">
				<v-col
					class="pa-2"
					:cols="split || breakpoint.lgAndDown ? 6 : 3"
					align-self="center"
				>
					<v-text-field
						dense
						:value="id"
						hide-details="true"
						label="ID"
						outlined
						@input="
							(e) => {
								$emit('idChange', e);
							}
						"
					/>
				</v-col>

				<!-- If split: delete button will be rendered as 2nd element -->
				<v-col
					v-show="split || breakpoint.lgAndDown"
					class="pa-2 ma-0"
					:cols="split || breakpoint.lgAndDown ? 6 : 3"
					align-self="center"
				>
					<DeleteButton
						@click="
							() => {
								$emit('deleteClicked');
							}
						"
					/>
				</v-col>

				<v-col
					class="pa-2"
					:cols="split || breakpoint.lgAndDown ? 6 : 3"
					align-self="center"
				>
					<v-select
						dense
						hide-details="true"
						class="ma-0 pa-0"
						label="Style"
						:items="['text', 'filled', 'depressed', 'outlined']"
						:value="itemStyle"
						outlined
						@change="
							(e) => {
								$emit('styleChange', e);
							}
						"
					/>
				</v-col>

				<v-col
					class="pa-2"
					:cols="split || breakpoint.lgAndDown ? 6 : 3"
					align-self="center"
				>
					<v-text-field
						dense
						:value="icon"
						hide-details="true"
						label="Icon"
						outlined
						@input="
							(e) => {
								$emit('iconChange', e);
							}
						"
					/>
				</v-col>

				<v-col
					class="pa-2"
					:cols="split || breakpoint.lgAndDown ? 6 : 3"
					align-self="center"
				>
					<ColorPicker
						:key="`${id}_color_picker`"
						class="pa-0"
						:value="color"
						:label="'Color'"
						@colorChange="(e) => {
							$emit('colorChange', e);
						}"
					/>
				</v-col>

				<v-col
					class="pa-2"
					:cols="split || breakpoint.lgAndDown ? 6 : 3"
					align-self="center"
				>
					<v-text-field
						dense
						:value="label"
						hide-details="true"
						outlined
						label="Label"
						@input="
							(e) => {
								$emit('labelChange', e);
							}
						"
					/>
				</v-col>

				<!-- If not split: delete button will be rendered as 6th element -->
				<v-col
					v-show="!split && !breakpoint.lgAndDown"
					class="pa-2"
					:cols="split || breakpoint.lgAndDown ? 6 : 3"
					align-self="center"
				>
					<DeleteButton
						@click="
							() => {
								$emit('deleteClicked');
							}
						"
					/>
				</v-col>
			</v-row>
		</v-list-item-content>
	</v-card>
</template>

<script>
/* eslint-disable vue/match-component-file-name */
import Vue from "vue";
import {
	VRow,
	VCol,
	VCard,
	VListItemIcon,
	VListItemContent,
	VTextField,
	VIcon,
} from "vuetify/lib";
import DeleteButton from "../../ViewUtilities/components/DeleteButton.vue";
import ColorPicker from "../../ViewUtilities/components/ColorPicker.vue";

Vue.component("VCol", VCol);
Vue.component("VRow", VRow);
Vue.component("VCard", VCard);
Vue.component("VListItemIcon", VListItemIcon);
Vue.component("VListItemContent", VListItemContent);
Vue.component("VTextField", VTextField);
Vue.component("VIcon", VIcon);
Vue.component("DeleteButton", DeleteButton);
Vue.component("ColorPicker", ColorPicker);

export default {
	props: {
		split: {
			type: Boolean,
			default: false,
		},
		id: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
		itemStyle: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
	},

	computed: {
		breakpoint() {
			return this.$vuetify.breakpoint;
		},
	},
};
</script>

<style></style>
