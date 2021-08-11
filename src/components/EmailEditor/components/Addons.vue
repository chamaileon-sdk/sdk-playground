<template>
	<div>
		<h2>Addons</h2>
		<p>
			There are some addons that you can use within the editor, depending on
			your subscription. If you have access to these addons, then you can decide
			if you want to enable them, disable them or even fully hide them. It lets
			you differentiate between the functionality that you want to provide to
			different segments of your users.
		</p>
		<OptionWrapper>
			<div v-for="(item, name, ind) in addonArr" :key="item.id">
				<v-card
					flat
					class="rounded-0 d-flex pa-4"
					:class="
						ind === 0
							? 'rounded-t'
							: ind === addonArrLength - 1
							? 'rounded-b'
							: ''
					"
				>
					<v-row>
						<v-col class="align-self-center">
							<v-card-title
								class="ma-0 pa-0 text-subtitle-1"
								style="margin-bottom: -3px !important"
							>
								{{ item.id }}
							</v-card-title>
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
				<v-divider v-show="ind !== addonArrLength - 1"></v-divider>
			</div>
		</OptionWrapper>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";

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

		addonArrLength() {
			return Object.keys(this.addonArr).length;
		},
	},
};
</script>

<style></style>
