<template>
	<v-card elevation="0" class="pa-8 my-4 grey lighten-3 rounded-lg">
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
