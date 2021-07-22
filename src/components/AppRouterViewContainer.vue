<template>
	<v-row class="pa-0 ma-0">
		<v-col class="px-16 pa-0" cols="12">
			<div class="px-16">
				<slot />
			</div>
		</v-col>
		<!--<v-col class="ma-0 pa-0" cols="4">
			<CodeEditor :code="code" />
		</v-col>-->
	</v-row>
</template>

<script>
//import CodeEditor from "../components/AppCodeEditor.vue";

export default {
	components: {
		//CodeEditor,
	},
	props: {
		code: String,
	},
};
</script>

<style></style>
