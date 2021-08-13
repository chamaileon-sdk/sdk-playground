<template>
	<v-row>
		<v-col cols="12" xl="6">
			<template>
				<v-row align="center" class="ma-0 justify-begin">
					<AddButton class="ml-auto ml-xl-0" @click="addLeftButton">
						New Button
					</AddButton>
				</v-row>
			</template>
			<div
				v-if="buttonsLeft.length > 0"
				class="mt-8 list3 rounded"
				style="max-height: 257px; overflow-y: auto"
			>
				<draggable handle=".dtrigger" v-model="buttonsLeft">
					<div v-for="(item, ind) in buttonsLeft" :key="ind">
						<ListItem3
							:id="item.id"
							:icon="item.icon"
							:label="item.label"
							@idChange="
								updateLeftButton({
									index: ind,
									id: $event,
								})
							"
							@labelChange="
								updateLeftButton({
									index: ind,
									label: $event,
								})
							"
							@iconChange="
								updateLeftButton({
									index: ind,
									icon: $event,
								})
							"
							@deleteClicked="deleteLeftButton(ind)"
							:split="true"
						/>
						<v-divider v-show="ind !== buttonsLeft.length - 1"></v-divider>
					</div>
				</draggable>
			</div>
		</v-col>
		<v-col cols="12" xl="6" class="mt-2 mt-xl-0">
			<template>
				<v-row align="center" class="ma-0 justify-end">
					<AddButton @click="addRightButton"> New Button</AddButton>
				</v-row>
			</template>
			<div
				v-if="buttonsRight.length > 0"
				class="mt-8 list3 rounded"
				style="max-height: 257px; overflow-y: auto"
			>
				<draggable handle=".dtrigger" v-model="buttonsRight">
					<div v-for="(item, ind) in buttonsRight" :key="ind">
						<ListItem3
							:id="item.id"
							:icon="item.icon"
							:label="item.label"
							@idChange="
								updateRightButton({
									index: ind,
									id: $event,
								})
							"
							@labelChange="
								updateRightButton({
									index: ind,
									label: $event,
								})
							"
							@iconChange="
								updateRightButton({
									index: ind,
									icon: $event,
								})
							"
							@deleteClicked="deleteRightButton(ind)"
							:split="true"
						/>
						<v-divider v-show="ind !== buttonsRight.length - 1"></v-divider>
					</div>
				</draggable>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import AddButton from "../../ViewUtilities/components/AddButton.vue";
import draggable from "vuedraggable";
import ListItem3 from "./ListItem3.vue";

export default {
	components: {
		AddButton,
		draggable,
		ListItem3,
	},

	props: {
		section: {
			type: String,
			required: true,
			validator: function (value) {
				// The value must match one of these strings
				return ["Header", "Footer"].indexOf(value) !== -1;
			},
		},
	},
	methods: {
		addLeftButton() {
			this.$store.commit(`addVariableEditor${this.section}LeftButton`);
		},

		updateLeftButton(payload) {
			this.$store.commit(
				`updateVariableEditor${this.section}LeftButton`,
				payload
			);
		},

		deleteLeftButton(payload) {
			this.$store.commit(
				`deleteVariableEditor${this.section}LeftButton`,
				payload
			);
		},

		addRightButton() {
			this.$store.commit(`addVariableEditor${this.section}RightButton`);
		},

		updateRightButton(payload) {
			this.$store.commit(
				`updateVariableEditor${this.section}RightButton`,
				payload
			);
		},

		deleteRightButton(payload) {
			this.$store.commit(
				`deleteVariableEditor${this.section}RightButton`,
				payload
			);
		},
	},

	computed: {
		buttonsLeft: {
			get() {
				return this.$store.state.variableEditorConfig.settings.buttons[
					this.section.toLowerCase()
				].left;
			},
			set(value) {
				this.$store.commit(
					`updateVariableEditor${this.section}LeftOrder`,
					value
				);
			},
		},

		buttonsRight: {
			get() {
				return this.$store.state.variableEditorConfig.settings.buttons[
					this.section.toLowerCase()
				].right;
			},
			set(value) {
				this.$store.commit(
					`updateVariableEditor${this.section}RightOrder`,
					value
				);
			},
		},
	},
};
</script>

<style></style>
