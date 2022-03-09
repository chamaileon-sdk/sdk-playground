<template>
	<div>
		<h2>Block Libraries</h2>
		<p>
			It's possible to provide block libraries to your users, which is a great
			way to reuse sections of an email that are already designed.
		</p>
		<h3>Your Libraries</h3>
		<p>
			You can set up different block libraries, set up the access level of the
			current user to them (save, rename, delete). This allows you to provide a
			way to your users to be able to create their own block libraries.
		</p>
		<OptionWrapper>
			<template>
				<v-row
					align="center"
					justify="end"
					class="ma-0"
				>
					<AddButton @click="addBlockLibararies">
						New Library
					</AddButton>
				</v-row>
			</template>
			<v-card
				v-if="blockLibsArr.length > 0"
				class="mx-auto mt-8 list3 rounded"
				elevation="0"
				max-height="396"
				style="overflow-y: auto"
			>
				<Draggable v-model="blockLibsArr" handle=".dtrigger">
					<div v-for="(b, ind) in blockLibsArr" :key="ind">
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
										cols="6"
										xl="3"
										class="pa-2"
										align-self="center"
									>
										<v-text-field
											dense
											hide-details="true"
											label="ID"
											:rules="[noEmpty, noMatching(ind)]"
											:value="b.id"
											outlined
											@input="updateID(ind, $event)"
										/>
									</v-col>

									<v-col
										v-if="breakpoint.lgAndDown"
										cols="6"
										xl="3"
										align-self="center"
										class="ml-auto pa-2"
									>
										<DeleteButton
											@click="removeBlockLibararies(ind, b.id)"
										/>
									</v-col>

									<v-col
										cols="6"
										xl="3"
										class="pa-2"
										align-self="center"
									>
										<v-text-field
											dense
											hide-details="true"
											label="Label"
											:value="b.label"
											outlined
											@input="updateBlockLibs({ index: ind, label: $event })"
										/>
									</v-col>
									<v-col
										cols="6"
										xl="3"
										class="pa-2"
										align-self="center"
									>
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
												<v-icon
													size="25"
												>
													mdi-delete{{
														!b.canDeleteBlock ? "-outline" : ""
													}}
												</v-icon>
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
												<v-icon
													size="25"
												>
													mdi-pencil{{
														!b.canRenameBlock ? "-outline" : ""
													}}
												</v-icon>
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
												<v-icon
													size="25"
												>
													mdi-content-save{{
														!b.canSaveBlock ? "-outline" : ""
													}}
												</v-icon>
											</v-btn>
										</v-card>
									</v-col>

									<v-col
										v-if="!breakpoint.lgAndDown"
										cols="6"
										xl="3"
										align-self="center"
										class="ml-auto pa-2"
									>
										<DeleteButton
											@click="removeBlockLibararies(ind, b.id)"
										/>
									</v-col>
								</v-row>
							</v-list-item-content>
						</v-card>

						<v-divider v-show="ind !== blockLibsArr.length - 1" />
					</div>
				</Draggable>
			</v-card>
		</OptionWrapper>
	</div>
</template>

<script>
import DeleteButton from "../../ViewUtilities/components/DeleteButton.vue";
import AddButton from "../../ViewUtilities/components/AddButton.vue";
import Draggable from "vuedraggable";
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapMutations } from "vuex";

export default {
	components: {
		DeleteButton,
		AddButton,
		Draggable,
		OptionWrapper,
	},
	computed: {
		breakpoint() {
			return this.$vuetify.breakpoint;
		},
		blockLibsArr: {
			get() {
				return this.$store.getters.getBlockLibs;
			},
			set(value) {
				this.updateBlockLibsOrder(value);
			},
		},
	},
	methods: {
		...mapMutations([
			"updateBlockLibsOrder",
			"updateBlockLibs",
			"addBlockLibs",
			"removeBlockLibs",
		]),

		addBlockLibararies() {
			this.addBlockLibs();
			this.$store.commit(
				"createBlockLibData",
				this.blockLibsArr[this.blockLibsArr.length - 1].id,
			);
		},

		removeBlockLibararies(ind, id) {
			this.removeBlockLibs(ind);
			this.$store.commit("deleteBlockLibData", id);
		},

		updateID(index, id) {
			if (!this.noEmpty(id) || !this.noMatching(index)(id)) return;

			this.$store.commit("moveBlockLibData", {
				oldLibId: this.blockLibsArr[index].id,
				newLibId: id,
			});
			this.updateBlockLibs({ index, id });
		},
		noEmpty(e) {
			return e.length !== 0;
		},
		noMatching(ind) {
			return function (e) {
				let i = 0;
				const arr = this.$store.state.editorConfig.settings.blockLibraries;

				while (i < arr.length && !(arr[i].id === e && i !== ind)) {
					i++;
				}

				return i === arr.length;
			}.bind(this);
		},
	},
};
</script>

<style></style>
