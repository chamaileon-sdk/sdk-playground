<template>
	<div>
		<v-card class="white rounded-lg pa-3 mb-3" flat>
			<div class="d-flex flex-nowrap">
				<v-btn
					v-if="btnArr.length === 0"
					disabled
					depressed
					style="background-color: rgba(1, 1, 1, 0) !important"
				/>
				<div
					v-for="(item, ind) in btnArr"
					:key="ind"
				>
					<v-tooltip :disabled="!showHover" bottom>
						<template #activator="{ on, attrs }">
							<v-btn
								text
								v-bind="attrs"
								:icon="typeof item.icon === 'string' && item.icon.length !== 0"
								v-on="on"
							>
								<img
									v-if="item.icon && typeof item.icon === 'string' && item.icon.includes('http')"
									style="max-width: 30px"
									:src="item.icon"
								>
								<v-icon v-else-if="item.icon">
									mdi-{{ item.icon }}
								</v-icon>
								<div v-else>
									{{ item.label }}
								</div>
							</v-btn>
						</template>
						<span>{{ item.title && item.title.length > 0 ? item.title : "Add a merge tag" }}</span>
					</v-tooltip>
				</div>
			</div>
		</v-card>
		<v-card
			class="mb-3 grey lighten-1 rounded-0 rounded-sm"
			height="12px"
			flat
		/>
		<v-card
			class="mb-3 grey lighten-1 rounded-0 rounded-sm"
			height="12px"
			flat
		/>
		<v-card
			class="grey lighten-1 rounded-0 rounded-sm"
			height="12px"
			width="61.78%"
			flat
		/>
	</div>
</template>

<script>
export default {
	props: {
		btnArr: {
			type: Array,
			required: true,
		},
		showHover: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style></style>
