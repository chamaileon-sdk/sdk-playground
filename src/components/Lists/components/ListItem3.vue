<template>
	<v-card class="ma-0 pa-2 d-flex align-center" elevation="0" tile>
		<v-list-item-icon class="align-self-center ma-0 mx-3">
			<v-icon class="dtrigger">mdi-menu</v-icon>
		</v-list-item-icon>
		<v-list-item-content class="ma-0 pa-0">
			<v-row class="ma-0 pa-0">
				<v-col
					class="pa-2"
					:cols="split || breakpoint.mdAndDown ? 6 : 3"
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
								this.$emit('idChange', e);
							}
						"
					></v-text-field>
				</v-col>

				<!-- If split: delete button will be rendered as 2nd element -->
				<v-col
					v-show="split || breakpoint.mdAndDown"
					class="pa-2 ma-0"
					:cols="split || breakpoint.mdAndDown ? 6 : 3"
					align-self="center"
				>
					<DeleteButton
						@click="
							() => {
								this.$emit('deleteClicked');
							}
						"
					></DeleteButton>
				</v-col>

				<v-col
					class="pa-2"
					:cols="split || breakpoint.mdAndDown ? 6 : 3"
					align-self="center"
				>
					<v-text-field
						dense
						:value="label"
						hide-details="true"
						outlined
						@input="
							(e) => {
								this.$emit('labelChange', e);
							}
						"
						label="Label"
					></v-text-field>
				</v-col>

				<v-col
					class="pa-2"
					:cols="split || breakpoint.mdAndDown ? 6 : 3"
					align-self="center"
				>
					<v-text-field
						dense
						:value="icon"
						@input="
							(e) => {
								this.$emit('iconChange', e);
							}
						"
						hide-details="true"
						label="Icon"
						outlined
					></v-text-field>
				</v-col>

				<!-- If not split: delete button will be rendered as 4th element -->
				<v-col
					class="pa-2"
					v-show="!split && !breakpoint.mdAndDown"
					:cols="split || breakpoint.mdAndDown ? 6 : 3"
					align-self="center"
				>
					<DeleteButton
						@click="
							() => {
								this.$emit('deleteClicked');
							}
						"
					></DeleteButton>
				</v-col>
			</v-row>
		</v-list-item-content>
	</v-card>
</template>

<script>
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

Vue.component("v-col", VCol);
Vue.component("v-row", VRow);
Vue.component("v-card", VCard);
Vue.component("v-list-item-icon", VListItemIcon);
Vue.component("v-list-item-content", VListItemContent);
Vue.component("v-text-field", VTextField);
Vue.component("v-icon", VIcon);
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
			required: true,
		},
		icon: {
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
