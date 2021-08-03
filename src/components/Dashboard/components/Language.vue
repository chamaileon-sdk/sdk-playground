<template>
	<v-app>
		<h1>Language</h1>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
			velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
			cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
			est laborum.
		</p>
		<OptionsWrapper>
			<LocaleSelector />
		</OptionsWrapper>
	</v-app>
</template>

<script>
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import LocaleSelector from "./Language/LocaleSelector.vue";

export default {
	components: {
		LocaleSelector,
		OptionsWrapper,
	},
};
</script>

<style></style>
