<template>
	<div>
		<h2>Language</h2>
		<p>
			The Chamaileon SDK is localized. Currently, it only supports English and
			Hungarian. More localizations might be added in the future, in the
			meantime feel free to contact us if you need a localization to your
			language.
		</p>
		<OptionsWrapper>
			<LocaleSelector />
		</OptionsWrapper>
	</div>
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
