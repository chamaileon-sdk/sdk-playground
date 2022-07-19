<template>
	<div>
		<h2>Settings</h2>
		<p>
			You can choose between the following options to make our plugin better fit you needs.
		</p>
		<OptionWrapper>
			<div v-for="(item, key, ind) in togglableSettings()" :key="key">
				<v-card
					min-height="72px"
					flat
					class="rounded-0 d-flex pa-4"
					:class="
						ind === 0
							? 'rounded-t'
							: ind === settingsLength - 1
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
								{{ item.displayText }}
							</v-card-title>
							<!--<p class="ma-0">{{ item.description }}</p>-->
						</v-col>

						<v-col
							v-show="typeof item.value !== typeof '000'"
							class="align-self-center"
							cols="3"
							lg="2"
						>
							<v-card flat class="ma-0 pa-0 d-flex justify-end align-center">
								<v-switch
									v-show="typeof item.value === typeof true"
									class="ma-0 pa-0 mr-n3"
									color="primary"
									flat
									inset
									:hide-details="true"
									:ripple="false"
									:value="true"
									:input-value="item.value"
									@change="
										updateSettings({
											key: key,
											value: $event !== null,
										})
									"
								/>
							</v-card>
						</v-col>
						<v-col
							v-show="typeof item.value === typeof '000'"
							class="align-self-center"
							lg="4"
							cols="5"
						>
							<v-card flat class="ma-0 pa-0 d-flex justify-end align-center">
								<v-select
									class="right-input"
									dense
									outlined
									label="Value"
									:items="['handlebars', 'liquid', 'mustache']"
									:hide-details="true"
									:value="item.value"
									@change="updateSettings({ key: key, value: $event })"
								/>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
				<v-divider v-show="ind !== settingsLength - 1" />
			</div>
		</OptionWrapper>
	</div>
</template>

<script>
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
	components: {
		OptionWrapper,
	},

	computed: {
		...mapGetters({ settings: "getImportSettings" }),

		settingsLength() {
			return Object.keys(this.settings).length;
		},
	},

	methods: {
		...mapMutations([ "updateImportSettings" ]),

		updateSettings(obj) {
			this.updateImportSettings(obj);
		},

		togglableSettings() {
			const asArray = Object.entries(this.settings);
			const filtered = asArray.filter(([key, item]) => typeof item.value === 'boolean');
			return Object.fromEntries(filtered);
		}
	},
};
</script>

<style scoped>
.right-input >>> input {
	text-align: right;
}
</style>
