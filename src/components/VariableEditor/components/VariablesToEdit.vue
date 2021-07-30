<template>
	<v-app>
		<h1>Variables To Edit</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic id possimus a
			maxime quo voluptas commodi natus libero soluta provident laudantium, amet
			fugit aliquid consequuntur voluptatem obcaecati fugiat dolorum dolores.
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
	</v-app>
</template>

<script>
import { mapMutations } from "vuex";
import OptionWrapper from "../../optionWrapper.vue";

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
