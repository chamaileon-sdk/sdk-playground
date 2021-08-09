<template>
	<v-card
		elevation="0"
		class="pa-8 grey lighten-3 rounded"
		style="margin-bottom: 23px"
	>
		<v-lazy :options="{ rootMargin: '1000px 0px' }">
			<div>
				<slot />
			</div>
		</v-lazy>
	</v-card>
</template>

<script>
export default {};
</script>

<style></style>
