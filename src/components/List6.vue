<template>
	<v-card
		v-show="buttonsArr.length > 0"
		class="mx-auto mt-8 flex flex-column list6 rounded"
		elevation="0"
		max-height="257"
		color="transparent"
		style="overflow-y: overlay"
	>
		<draggable v-model="buttonsArr" handle=".dtrigger">
			<div v-for="(b, i) in buttonsArr" :key="i">
				<v-card class="ma-0 pa-2 d-flex align-center" elevation="0" tile>
					<v-list-item-icon class="align-self-center ma-0 ml-3 mr-3">
						<v-icon class="dtrigger">mdi-menu</v-icon>
					</v-list-item-icon>
					<v-list-item-content class="ma-0 pa-0">
						<v-row class="ma-0 pa-0">
							<v-col
								class="pa-2"
								cols="4"
								align-self="center"
								v-show="!b.items"
							>
								<v-text-field
									dense
									hide-details="true"
									label="ID"
									:value="b.id"
									@blur="updateID($event.target.value, i)"
									outlined
								></v-text-field>
							</v-col>

							<v-col class="pa-2" cols="4" align-self="center">
								<v-select
									dense
									hide-details="true"
									class="ma-0 pa-0"
									label="Style"
									:items="['text', 'filled', 'depressed', 'outlined']"
									:value="b.style"
									@change="updateStyle($event, i)"
									outlined
								></v-select>
							</v-col>

							<v-col class="pa-2" cols="4" align-self="center" v-show="b.items">
								<v-btn depressed outlined width="100%" @click="addDDBtn(i)">
									<v-icon left> mdi-plus </v-icon>
									Add Button
								</v-btn>
							</v-col>

							<v-col class="pa-2" cols="4" align-self="center">
								<DeleteButton @click="deleteBtn(i)"></DeleteButton>
							</v-col>
						</v-row>
						<v-row class="ma-0 pa-0">
							<v-col class="pa-2" cols="4" align-self="center">
								<v-text-field
									dense
									hide-details="true"
									label="Icon"
									:value="b.icon"
									@input="updateIcon($event, i)"
									outlined
								></v-text-field>
							</v-col>
							<v-col class="pa-2" cols="4">
								<ColorPicker
									:key="i"
									class="pa-0"
									:value="b.color"
									:label="'Color'"
									@colorChange="updateColor($event, i)"
								/>
							</v-col>

							<v-col class="pa-2" cols="4" align-self="center">
								<v-text-field
									dense
									hide-details="true"
									label="Label"
									:value="b.label"
									@input="updateLabel($event, i)"
									outlined
								></v-text-field>
							</v-col>
						</v-row>
					</v-list-item-content>
				</v-card>
				<v-divider
					v-show="
						i !== buttonsArr.length - 1 ||
						(i === buttonsArr.length - 1 && b.items)
					"
				></v-divider>
				<draggable
					handle=".dtrigger"
					v-show="b.items"
					:value="b.items"
					@input="updateDDBtnOrder({ parentIndex: i, newArr: $event })"
				>
					<div v-for="(item, bi) in b.items" :key="bi">
						<v-card
							class="ma-0 pa-0 d-flex align-center mx-auto"
							elevation="0"
							width="90%"
							tile
							style="overflow-y: hidden"
						>
							<v-list-item-icon class="align-self-center ma-0 ml-6">
								<v-icon class="dtrigger">mdi-menu</v-icon>
							</v-list-item-icon>
							<v-row class="px-6 ma-0">
								<v-col cols="3" align-self="center">
									<v-text-field
										dense
										hide-details="true"
										label="ID"
										:value="item.id"
										outlined
										@blur="updateDDID($event.target.value, i, bi)"
									></v-text-field>
								</v-col>

								<v-col cols="3" align-self="center">
									<v-text-field
										dense
										hide-details="true"
										label="Icon"
										:value="item.icon"
										outlined
										@input="
											updateDDBtn({
												parentIndex: i,
												obj: { index: bi, icon: $event },
											})
										"
									></v-text-field>
								</v-col>

								<v-col cols="3" align-self="center">
									<v-text-field
										dense
										hide-details="true"
										label="Label"
										:value="item.label"
										outlined
										@input="
											updateDDBtn({
												parentIndex: i,
												obj: { index: bi, label: $event },
											})
										"
									></v-text-field>
								</v-col>

								<v-col cols="3" align-self="center" class="ml-auto">
									<DeleteButton
										@click="
											deleteDDBtn({
												parentIndex: i,
												obj: { index: bi },
											})
										"
										class=""
									></DeleteButton>
								</v-col>
							</v-row>
						</v-card>
						<v-divider
							style="width: 90%; margin-left: 5%"
							v-show="bi !== b.items.length - 1"
						></v-divider>
					</div>
				</draggable>
			</div>
		</draggable>
	</v-card>
</template>

<script>
import DeleteButton from "./DeleteButton.vue";
import draggable from "vuedraggable";
import ColorPicker from "./EmailEditor/ColorPicker.vue";

export default {
	props: {
		section: {
			type: String,
			required: true,
			validator: function (value) {
				// The value must match one of these strings
				return ["Editor", "Preview"].indexOf(value) !== -1;
			},
		},
	},
	components: {
		DeleteButton,
		draggable,
		ColorPicker,
	},
	methods: {
		updateLabel(val, index) {
			this.$store.commit(`update${this.section}Btn`, {
				index: index,
				label: val,
			});
		},
		updateColor(val, index) {
			this.$store.commit(`update${this.section}Btn`, {
				index: index,
				color: val,
			});
		},
		updateIcon(val, index) {
			this.$store.commit(`update${this.section}Btn`, {
				index: index,
				icon: val,
			});
		},
		updateStyle(val, index) {
			this.$store.commit(`update${this.section}Btn`, {
				index: index,
				style: val,
			});
		},
		updateID(val, index) {
			this.$store.commit(`update${this.section}Btn`, { index: index, id: val });
		},
		updateDDID(val, parentIndex, index) {
			this.$store.commit(`update${this.section}DropdownBtn`, {
				parentIndex: parentIndex,
				obj: { index: index, id: val },
			});
		},
		updateDDBtn(payload) {
			this.$store.commit(`update${this.section}DropdownBtn`, payload);
		},
		addDDBtn(payload) {
			this.$store.commit(`add${this.section}DropdownBtn`, payload);
		},
		deleteDDBtn(payload) {
			this.$store.commit(`remove${this.section}DropdownBtn`, payload);
		},
		updateDDBtnOrder(payload) {
			this.$store.commit(`update${this.section}DropdownBtnOrder`, payload);
		},
		deleteBtn(payload) {
			this.$store.commit(`remove${this.section}Btn`, payload);
		},
	},
	computed: {
		buttonsArr: {
			get() {
				return this.$store.state[this.section.toLowerCase() + "Config"].settings
					.buttons.header;
			},
			set(value) {
				this.$store.commit(`update${this.section}BtnOrder`, value);
			},
		},
		ddArrById: {
			get(parentId) {
				return this.$store.state[this.section.toLowerCase() + "Config"].settings
					.buttons.header[parentId].items;
			},
			set(parentId, newArr) {
				this.$store.commit(`update${this.section}DropdownBtnOrder`, {
					parentId: parentId,
					newArr: newArr,
				});
			},
		},
	},
};
</script>

<style>
.list6::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.list6::-webkit-scrollbar-thumb {
	background: #e0e0e0;
	border-radius: 99999px;
}
.list6::-webkit-scrollbar-thumb:hover {
	background: #bdbdbd;
}
.list6::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 99999px;
}
</style>
