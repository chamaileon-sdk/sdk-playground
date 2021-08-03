<template>
	<v-app>
		<h2>Language</h2>
		<p>
			The Chamaileon SDK is localized. Select from the languages below to try it out.
		</p>
		<p>
			If you need another language, please contact us.
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
