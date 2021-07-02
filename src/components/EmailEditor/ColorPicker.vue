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
          :value="color.hex"
          :label="label"
          :placeholder="color.hex"
          hide-details="true"
          @blur="color = $event.target.value"
          @keyup.enter="color = $event.target.value"
        >
          <template v-slot:prepend-inner>
            <div
              v-on="onVMenu"
              class="pa-3 mr-1 rounded-circle d-inline-block"
              :style="`background-color: ${color.hex}`"
            />
          </template>
        </v-text-field>
      </div>
    </template>

    <sketch-picker v-model="color" @input="this.input" />
  </v-menu>
</template>

<script>
import { Sketch } from 'vue-color';

export default {
  name: 'ColorPickerInput',
  components: {
    'sketch-picker': Sketch,
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
    index: {
      required: true,
      type: Number,
    },
  },
  methods: {
    input() {
      this.$emit('colorChange', this.color.hex);
    },
  },
  mounted() {
    this.color.hex = this.value;
  },
  data() {
    return {
      color: {
        hex: '#194d33e',
      },
      colorPresets: [],
      colorPickerModal: false,
    };
  },
};
</script>
