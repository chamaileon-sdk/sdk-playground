<template>
	<v-row>
		<v-col cols="6">
			<template>
				<v-row align="center" class="ma-0 justify-begin">
					<AddButton @click="addLeftButton"> New Button </AddButton>
				</v-row>
			</template>
			<div
				v-if="buttonsLeft.length > 0"
				class="mt-8 list3"
				style="max-height: 260px; overflow-y: auto"
			>
				<draggable v-model="buttonsLeft">
					<ListItem3
						v-for="item in buttonsLeft"
						:key="item.id"
						:id="item.id"
						:icon="item.icon"
						:label="item.label"
						@idChange="
							updateLeftButton({
								id: item.id,
								newID: $event,
							})
						"
						@labelChange="
							updateLeftButton({
								id: item.id,
								label: $event,
							})
						"
						@iconChange="
							updateLeftButton({
								id: item.id,
								icon: $event,
							})
						"
						@deleteClicked="deleteLeftButton(item.id)"
						:split="true"
					/>
				</draggable>
			</div>
		</v-col>
		<v-col cols="6">
			<template>
				<v-row align="center" class="ma-0 justify-end">
					<AddButton @click="addRightButton"> New Button</AddButton>
				</v-row>
			</template>
			<div
				v-if="buttonsRight.length > 0"
				class="mt-8 list3"
				style="max-height: 260px; overflow-y: auto"
			>
				<draggable v-model="buttonsRight">
					<ListItem3
						v-for="item in buttonsRight"
						:key="item.id"
						:id="item.id"
						:icon="item.icon"
						:label="item.label"
						@idChange="
							updateRightButton({
								id: item.id,
								newID: $event,
							})
						"
						@labelChange="
							updateRightButton({
								id: item.id,
								label: $event,
							})
						"
						@iconChange="
							updateRightButton({
								id: item.id,
								icon: $event,
							})
						"
						@deleteClicked="deleteRightButton(item.id)"
						:split="true"
					/>
				</draggable>
			</div>
		</v-col>
	</v-row>
</template>

<script>
import AddButton from "../AddButton.vue";
import draggable from "vuedraggable";
import ListItem3 from "../ListItem3.vue";

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
