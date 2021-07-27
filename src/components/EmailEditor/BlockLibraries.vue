<template>
	<v-app>
		<h1>Block Libraries</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore atque
			assumenda a, alias nobis beatae! Aut, eaque velit, adipisci reprehenderit
			rerum blanditiis dolorem quos placeat ullam nam sapiente quam deserunt.
		</p>
		<h3>Your Libraries</h3>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas modi
			esse obcaecati eligendi veniam. Cumque molestiae quasi incidunt tempore,
			sit inventore pariatur maxime. Modi doloribus fugiat ex veritatis cum!
		</p>
		<OptionWrapper>
			<template>
				<v-row align="center" justify="end" class="ma-0">
					<AddButton @click="addBlockLibs"> New Library </AddButton>
				</v-row>
			</template>
			<v-card
				v-if="blockLibsArr.length > 0"
				class="mx-auto mt-7 list3 rounded-0"
				elevation="0"
				max-height="396"
				style="overflow-y: auto"
			>
				<draggable handle=".dtrigger" v-model="blockLibsArr">
					<div v-for="(b, ind) in blockLibsArr" :key="ind">
						<v-card
							class="ma-0 pa-2 d-flex align-center"
							outlined
							elevation="0"
							tile
						>
							<v-list-item-icon class="align-self-center ma-0 mx-3">
								<v-icon class="dtrigger">mdi-menu</v-icon>
							</v-list-item-icon>
							<v-list-item-content class="ma-0 pa-0">
								<v-row class="ma-0 pa-0">
									<v-col cols="3" class="pa-2" align-self="center">
										<v-text-field
											dense
											hide-details="true"
											label="ID"
											:rules="[noEmpty, noMatching(ind)]"
											:value="b.id"
											@input="updateID(ind, $event)"
											outlined
										></v-text-field>
									</v-col>

									<v-col cols="3" class="pa-2" align-self="center">
										<v-text-field
											dense
											hide-details="true"
											label="Label"
											:value="b.label"
											@input="updateBlockLibs({ index: ind, label: $event })"
											outlined
										></v-text-field>
									</v-col>
									<v-col cols="3" class="pa-2" align-self="center">
										<v-card flat class="d-flex justify-space-between">
											<v-btn
												icon
												small
												:color="b.canDeleteBlock ? 'primary' : ''"
												:value="b.canDeleteBlock"
												:ripple="false"
												@click="
													updateBlockLibs({
														index: ind,
														canDeleteBlock: !b.canDeleteBlock,
													})
												"
											>
												<v-icon size="25"
													>mdi-delete{{
														!b.canDeleteBlock ? "-outline" : ""
													}}</v-icon
												>
											</v-btn>
											<v-btn
												icon
												small
												:color="b.canRenameBlock ? 'primary' : ''"
												:value="b.canRenameBlock"
												:ripple="false"
												@click="
													updateBlockLibs({
														index: ind,
														canRenameBlock: !b.canRenameBlock,
													})
												"
											>
												<v-icon size="25"
													>mdi-pencil{{
														!b.canRenameBlock ? "-outline" : ""
													}}</v-icon
												>
											</v-btn>
											<v-btn
												icon
												small
												:color="b.canSaveBlock ? 'primary' : ''"
												:value="b.canSaveBlock"
												:ripple="false"
												@click="
													updateBlockLibs({
														index: ind,
														canSaveBlock: !b.canSaveBlock,
													})
												"
											>
												<v-icon size="25"
													>mdi-content-save{{
														!b.canSaveBlock ? "-outline" : ""
													}}</v-icon
												>
											</v-btn>
										</v-card>
									</v-col>

									<v-col cols="3" align-self="center" class="ml-auto pa-2">
										<DeleteButton @click="removeBlockLibs(ind)"></DeleteButton>
									</v-col>
								</v-row>
							</v-list-item-content>
						</v-card>
					</div>
				</draggable>
			</v-card>
		</OptionWrapper>
	</v-app>
</template>

<script>
import DeleteButton from "../DeleteButton.vue";
import AddButton from "../AddButton.vue";
import draggable from "vuedraggable";
import OptionWrapper from "../optionWrapper.vue";
import { mapMutations } from "vuex";

export default {
	components: {
		DeleteButton,
		AddButton,
		draggable,
		OptionWrapper,
	},
	methods: {
		...mapMutations([
			"updateBlockLibsOrder",
			"updateBlockLibs",
			"addBlockLibs",
			"removeBlockLibs",
		]),
		updateID(index, id) {
			if (!this.noEmpty(id) || !this.noMatching(index)(id)) return;

			this.updateBlockLibs({ index: index, id: id });
		},
		noEmpty(e) {
			return e.length !== 0;
		},
		noMatching(ind) {
			return function (e) {
				let i = 0;
				let arr = this.$store.state.editorConfig.blockLibraries;

				while (i < arr.length && !(arr[i].id === e && i !== ind)) {
					i++;
				}

				return i === arr.length;
			}.bind(this);
		},
	},
	computed: {
		blockLibsArr: {
			get() {
				return this.$store.getters.getBlockLibs;
			},
			set(value) {
				this.updateBlockLibsOrder(value);
			},
		},
	},
};
</script>

<style></style>
