<template>
	<v-app>
		<h1>Settings</h1>
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo vitae
			deserunt ea atque recusandae! Ipsam incidunt suscipit error voluptas
			blanditiis laboriosam, consequuntur accusamus ratione facere ex tempore
			fugit optio non.
		</p>
		<OptionWrapper>
			<div v-for="(item, key, ind) in settings" :key="key">
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

						<v-col class="align-self-center" cols="2">
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
									@change="
										updateSettings({
											key: key,
											value: $event !== null,
										})
									"
									:input-value="item.value"
								></v-switch>

								<v-text-field
									class="right-input"
									v-show="typeof item.value === typeof 0"
									dense
									outlined
									label="Value"
									:hide-details="true"
									:value="item.value"
									@change="updateIntSettings({ key: key, value: $event })"
								></v-text-field>
							</v-card>
						</v-col>
						<v-col
							v-show="typeof item.value === typeof '000'"
							class="align-self-center"
							cols="4"
						>
							<v-card flat class="ma-0 pa-0 d-flex justify-end align-center">
								<v-select
									class="right-input"
									dense
									outlined
									label="Value"
									:items="['handlebars', 'liquid', 'mustage']"
									:hide-details="true"
									@change="updateSettings({ key: key, value: $event })"
									:value="item.value"
								></v-select>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
				<v-divider v-show="ind !== settingsLength - 1"></v-divider>
			</div>
		</OptionWrapper>
	</v-app>
</template>

<script>
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
	components: {
		OptionWrapper,
	},

	computed: {
		...mapGetters({ settings: "getHtmlGeneratorSettings" }),

		settingsLength() {
			return Object.keys(this.settings).length;
		},
	},

	methods: {
		...mapMutations(["updateHtmlGeneratorSettings", "updateInt"]),

		updateSettings(obj) {
			this.$store.dispatch("fetchHtml");
			this.updateHtmlGeneratorSettings(obj);
		},

		updateIntSettings(obj) {
			this.$store.dispatch("fetchHtml");
			this.updateInt(obj);
		},
	},
};
</script>

<style scoped>
.right-input >>> input {
	text-align: right;
}
</style>
