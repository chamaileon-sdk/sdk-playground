<template>
	<div>
		<h2>Developer settings</h2>
		<p>
			This example project is only for demo and testing purposes, and it stores your API key in the localStorage. 
			You should NEVER store your API key on the client side in real life. 
			You should store it on your backend and create a route on your side that generates the access token. 
			Then your client side can use that route to fetch an access token. 
			Make sure, that the domain you are trying this example on, is enabled in your environment associated to your API key.
		</p>
		<OptionsWrapper>
			<ApiBackendSelector />
		</OptionsWrapper>
	</div>
</template>

<script>
import OptionsWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import ApiBackendSelector from "./Developer/ApiBackendSelector.vue";

export default {
	components: {
		ApiBackendSelector,
		OptionsWrapper,
	},
};
</script>

<style></style>

