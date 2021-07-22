<template>
	<div>
		<h1>Variables To Edit</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic id possimus a
			maxime quo voluptas commodi natus libero soluta provident laudantium, amet
			fugit aliquid consequuntur voluptatem obcaecati fugiat dolorum dolores.
		</p>
		<OptionWrapper>
			<v-card class="pa-2" width="100%" min-height="64px" flat>
				<v-chip
					color="primary"
					class="ma-2"
					v-for="(v, i) in varsArray"
					:key="i"
					:outlined="!v.edit"
					@click="toggleVariableToEdit(i)"
				>
					{{ v.name }}
				</v-chip>
			</v-card>
		</OptionWrapper>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import OptionWrapper from "../optionWrapper.vue";

export default {
	mounted() {
		this.resetVariablesToEditArray(this.$store.state.document.variables);
	},

	methods: {
		...mapMutations(["resetVariablesToEditArray", "toggleVariableToEdit"]),
	},

	computed: {
		varsArray() {
			return this.$store.state.variableEditorConfig.settings.variablesToEdit;
		},
	},

	components: {
		OptionWrapper,
	},
};
</script>

<style></style>
