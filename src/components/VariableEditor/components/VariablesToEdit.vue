<template>
	<div>
		<h2>Variables To Edit</h2>
		<p>
			You can configure which variables will the user be able to edit. You can
			re-configure these settings on the fly (for example on a click of a
			button), and that way you can enable your users to change different sets
			of variables in each step.
		</p>
		<OptionWrapper>
			<v-chip
				color="primary"
				:style="!v.edit ? 'background-color: white !important' : ''"
				class="mx-2 rounded"
				:class="!v.edit ? 'primary--text' : ''"
				v-for="(v, i) in varsArray"
				:key="i"
				@click="toggleVariableToEdit(i)"
			>
				{{ v.name }}
			</v-chip>
		</OptionWrapper>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";

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
