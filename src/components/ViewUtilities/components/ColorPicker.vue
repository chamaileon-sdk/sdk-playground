<template>
	<v-menu
		v-model="colorPickerModal"
		offset-y
		top
		min-width="200"
		:close-on-content-click="false"
	>
		<template #activator="{ on: onVMenu }">
			<div class="d-flex align-center" outlined>
				<v-text-field
					dense
					outlined
					:disabled="readonly"
					:value="value"
					:label="label"
					:placeholder="value"
					hide-details="true"
					v-on="onVMenu"
					@blur="emitTarVal"
					@keyup.enter="emitTarVal"
				>
					<template #prepend-inner>
						<div
							class="pa-3 mr-1 rounded-circle d-inline-block"
							:style="`background-color: ${value}`"
							v-on="onVMenu"
						/>
					</template>
				</v-text-field>
			</div>
		</template>

		<SketchPicker :value="value" @input="emitHex" />
	</v-menu>
</template>

<script>
import { Sketch } from "vue-color";

export default {
	name: "ColorPicker",
	components: {
		SketchPicker: Sketch,
	},
	props: {
		// eslint-disable-next-line vue/require-prop-types
		value: {
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		disableVariables: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	data() {
		return {
			colorPresets: [],
			colorPickerModal: false,
		};
	},

	methods: {
		emitTarVal(e) {
			if (this.readonly) return;
			this.$emit("colorChange", e.target.value);
		},

		emitHex(e) {
			if (this.readonly) return;
			this.$emit("colorChange", e.hex);
		},
	},
};

/*
@blur="this.value = $event.target.value"
					@keyup.enter="this.value = $event.target.value"
*/
</script>
