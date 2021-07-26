<template>
	<v-menu
		v-model="colorPickerModal"
		offset-y
		top
		min-width="200"
		:close-on-content-click="false"
	>
		<template v-slot:activator="{ on: onVMenu }">
			<div class="d-flex align-center" outlined>
				<v-text-field
					v-on="onVMenu"
					dense
					outlined
					:value="value"
					:label="label"
					:placeholder="value"
					hide-details="true"
					@blur="emitTarVal"
					@keyup.enter="emitTarVal"
				>
					<template v-slot:prepend-inner>
						<div
							v-on="onVMenu"
							class="pa-3 mr-1 rounded-circle d-inline-block"
							:style="`background-color: ${value}`"
						/>
					</template>
				</v-text-field>
			</div>
		</template>

		<sketch-picker :value="value" @input="emitHex" />
	</v-menu>
</template>

<script>
import { Sketch } from "vue-color";

export default {
	name: "ColorPickerInput",
	components: {
		"sketch-picker": Sketch,
	},
	props: {
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
	},

	methods: {
		emitTarVal(e) {
			this.$emit("colorChange", e.target.value);
		},

		emitHex(e) {
			this.$emit("colorChange", e.hex);
		},
	},
	data() {
		return {
			colorPresets: [],
			colorPickerModal: false,
		};
	},
};

/*
@blur="this.value = $event.target.value"
					@keyup.enter="this.value = $event.target.value"
*/
</script>
