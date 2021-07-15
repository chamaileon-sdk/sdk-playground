<template>
  <v-card class="ma-0 pa-0 d-flex align-center" outlined elevation="0" tile>
    <v-list-item-icon class="align-self-center ma-0 ml-6">
      <v-icon>mdi-menu</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-row class="px-6 py-2">
        <v-col class="pa-2" :cols="split ? 6 : 3" align-self="center">
          <v-text-field
            dense
            :value="id"
            hide-details="true"
            label="ID"
            outlined
            @change="e => this.$emit('idChange', e)"
          ></v-text-field>
        </v-col>

        <!-- If split: delete button will be rendered as 2nd element -->
        <v-col
          v-if="split"
          class="pa-2 ma-0"
          :cols="split ? 6 : 3"
          align-self="center"
        >
          <v-btn
            depressed
            color="red white--text"
            width="100%"
            @click="() => this.$emit('deleteClicked')"
          >
            <v-icon left>
              mdi-close
            </v-icon>
            delete
          </v-btn>
        </v-col>

        <v-col class="pa-2" :cols="split ? 6 : 3" align-self="center">
          <v-text-field
            dense
            :value="label"
            hide-details="true"
            outlined
            @input="
              e => {
                this.$emit('labelChange', e);
              }
            "
            label="Label"
          ></v-text-field>
        </v-col>

        <v-col class="pa-2" :cols="split ? 6 : 3" align-self="center">
          <v-text-field
            dense
            :value="icon"
            @input="e => this.$emit('iconChange', e)"
            hide-details="true"
            label="Icon"
            outlined
          ></v-text-field>
        </v-col>

        <!-- If split: delete button will be rendered as 4th element -->
        <v-col
          class="pa-2"
          v-if="!split"
          :cols="split ? 6 : 3"
          align-self="center"
        >
          <v-btn
            depressed
            color="red white--text"
            width="100%"
            @click="() => this.$emit('deleteClicked')"
          >
            <v-icon left>
              mdi-close
            </v-icon>
            delete
          </v-btn>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-card>
</template>

<script>
export default {
  props: {
    split: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
