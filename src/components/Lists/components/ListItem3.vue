<template>
	<v-card
		class="ma-0 pa-2 d-flex align-center"
		elevation="0"
		tile
	>
		<v-list-item-icon v-if="!hideDrag" class="align-self-center ma-0 mx-3">
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
						:disabled="disableId"
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
					v-if="!hideDelete"
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
					v-if="showTitle"
					class="pa-2"
					:cols="split || breakpoint.lgAndDown ? 6 : 3"
					align-self="center"
				>
					<v-text-field
						dense
						:value="title"
						hide-details="true"
						outlined
						label="Title"
						@input="
							(e) => {
								$emit('titleChange', e);
							}
						"
					/>
				</v-col>

				<v-col
					v-if="!hideLabel"
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

				<v-col
					v-if="!hideIcon"
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

				<!-- If not split: delete button will be rendered as 4th element -->
				<v-col
					v-if="!hideDelete"
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

				<v-col
					v-if="showVisible"
					class="pa-2"
					:cols="split || breakpoint.lgAndDown ? 6 : 3"
					align-self="center"
				>
					<v-btn
						icon
						small
						:color="visible ? 'primary' : ''"
						:value="visible"
						:ripple="false"
						@click="
							() => {
								$emit('visibilityChange');
							}
						"
					>
						<v-icon
							size="25"
						>
							mdi-eye
						</v-icon>
					</v-btn>
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

Vue.component("VCol", VCol);
Vue.component("VRow", VRow);
Vue.component("VCard", VCard);
Vue.component("VListItemIcon", VListItemIcon);
Vue.component("VListItemContent", VListItemContent);
Vue.component("VTextField", VTextField);
Vue.component("VIcon", VIcon);
Vue.component("DeleteButton", DeleteButton);

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
			default: "",
		},
		icon: {
			type: String,
			default: "",
		},
		title: {
			type: String,
			default: "",
		},
		visible: {
			type: Boolean,
			default: false,
		},
		showVisible: {
			type: Boolean,
			default: false,
		},
		showTitle: {
			type: Boolean,
			default: false,
		},
		hideDelete: {
			type: Boolean,
			default: false,
		},
		hideLabel: {
			type: Boolean,
			default: false,
		},
		hideDrag: {
			type: Boolean,
			default: false,
		},
		hideIcon: {
			type: Boolean,
			default: false,
		},
		disableId: {
			type: Boolean,
			default: false,
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
