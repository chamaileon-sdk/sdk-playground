<template>
	<v-app>
		<h1>Import HTML</h1>
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo vitae
			deserunt ea atque recusandae! Ipsam incidunt suscipit error voluptas
			blanditiis laboriosam, consequuntur accusamus ratione facere ex tempore
			fugit optio non.
		</p>
		<OptionWrapper>
			<v-row
				align="center"
				justify="end"
				class="ma-0 mb-8"
			>
				<v-btn
					depressed
					color="success"
					@click="importDocument"
				>
					<v-icon v-show="!fetching" left>
						mdi-plus
					</v-icon>
					<v-progress-circular
						v-show="fetching"
						color="white"
						:indeterminate="true"
						:value="0"
						size="20"
						width="3"
						class="mr-3"
					/>
					Import
				</v-btn>
			</v-row>
			<v-card flat class="pa-4">
				<v-textarea
					v-model="value"
					class="customScroll pa-0"
					background-color="white"
					color="primary"
					outlined
					no-resize
					hide-details="true"
					placeholder="Insert HTML here..."
				/>
			</v-card>
		</OptionWrapper>
	</v-app>
</template>

<script>
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapGetters } from "vuex";

export default {

	components: {
		OptionWrapper,
	},
	data() {
		return {
			value: "",
		};
	},

	computed: {
		...mapGetters({ fetching: "getJSONFetchStatus" }),
	},

	methods: {
		importDocument() {
			this.$store.dispatch("fetchJSON", this.value);
		},
	},
};
</script>

<style>
textarea {
	overflow-x: hidden;
	overflow-y: scroll;
	scrollbar-width: thin;
	padding: 0 !important;
	margin: 8px 0 !important;
	margin-right: 8px !important;
}

textarea::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
textarea::-webkit-scrollbar-thumb {
	background: #e0e0e0;
	border-radius: 99999px;
}
textarea::-webkit-scrollbar-thumb:hover {
	background: #bdbdbd;
}
textarea::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 99999px;
}
</style>
