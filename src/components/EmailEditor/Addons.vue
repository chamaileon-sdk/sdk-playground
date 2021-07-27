<template>
	<div>
		<h1>Addons</h1>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum autem,
			saepe optio officia laudantium sunt architecto quis praesentium explicabo
			quo veniam ducimus atque deleniti asperiores cupiditate molestiae et.
			Recusandae, cum!
		</p>
		<OptionWrapper>
			<v-card
				v-for="item in addonArr"
				:key="item.id"
				elevation="0"
				class="rounded-lg d-flex pa-4"
				:class="
					Object.values(addonArr)[Object.values(addonArr).length - 1].id !==
					item.id
						? 'mb-8'
						: ''
				"
			>
				<v-row>
					<v-col class="align-self-center">
						<h3 class="ma-0" style="margin-bottom: -3px !important">
							{{ item.id }}
						</h3>
						<!--<p class="ma-0">{{ item.description }}</p>-->
					</v-col>

					<v-col class="align-self-center" cols="2">
						<v-card flat class="d-flex justify-end align-center">
							<v-btn
								class="ml-3"
								icon
								small
								:ripple="false"
								:color="item.state === 'enabled' ? 'primary' : ''"
								@click="updateAddonState({ id: item.id, state: 'enabled' })"
							>
								<v-icon size="25"
									>mdi-check-circle{{
										item.state !== "enabled" ? "-outline" : ""
									}}
								</v-icon>
							</v-btn>

							<v-btn
								class="ml-3"
								icon
								small
								:ripple="false"
								:color="item.state === 'disabled' ? 'primary' : ''"
								@click="updateAddonState({ id: item.id, state: 'disabled' })"
							>
								<v-icon size="25"
									>mdi-close-circle{{
										item.state !== "disabled" ? "-outline" : ""
									}}
								</v-icon>
							</v-btn>

							<v-btn
								class="ml-3"
								icon
								small
								:ripple="false"
								:color="item.state === 'hidden' ? 'primary' : ''"
								@click="updateAddonState({ id: item.id, state: 'hidden' })"
							>
								<v-icon size="25"
									>mdi-eye-off{{ item.state !== "hidden" ? "-outline" : "" }}
								</v-icon>
							</v-btn>
						</v-card>
					</v-col>
				</v-row>
			</v-card>
		</OptionWrapper>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import OptionWrapper from "../optionWrapper.vue";

export default {
	components: {
		OptionWrapper,
	},
	methods: {
		...mapMutations(["updateAddonState"]),
	},
	computed: {
		...mapGetters(["getAddonStateById"]),
		addonArr() {
			return this.$store.state.editorConfig.addons;
		},
	},
};
</script>

<style></style>
