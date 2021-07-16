<template functional>
  <v-card class="ma-0 pa-0 d-flex align-center" outlined elevation="0" tile>
    <v-list-item-icon class="align-self-center ma-0 ml-6">
      <v-icon>mdi-menu</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-row class="px-6 py-2">
        <v-col class="pa-2" :cols="props.split ? 6 : 3" align-self="center">
          <v-text-field
            dense
            :value="props.id"
            hide-details="true"
            label="ID"
            outlined
            @input="listeners['idChange']($event)"
          ></v-text-field>
        </v-col>

        <!-- If split: delete button will be rendered as 2nd element -->
        <v-col
          v-show="props.split"
          class="pa-2 ma-0"
          :cols="props.split ? 6 : 3"
          align-self="center"
        >
          <DeleteButton @click="listeners['deleteClicked']()"></DeleteButton>
        </v-col>

        <v-col class="pa-2" :cols="props.split ? 6 : 3" align-self="center">
          <v-text-field
            dense
            :value="props.label"
            hide-details="true"
            outlined
            @input="listeners['labelChange']($event)"
            label="Label"
          ></v-text-field>
        </v-col>

        <v-col class="pa-2" :cols="props.split ? 6 : 3" align-self="center">
          <v-text-field
            dense
            :value="props.icon"
            @input="listeners['iconChange']($event)"
            hide-details="true"
            label="Icon"
            outlined
          ></v-text-field>
        </v-col>

        <!-- If split: delete button will be rendered as 4th element -->
        <v-col
          class="pa-2"
          v-show="!props.split"
          :cols="props.split ? 6 : 3"
          align-self="center"
        >
          <DeleteButton @click="listeners['deleteClicked']()"></DeleteButton>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-card>
</template>

<script>
import Vue from 'vue';
import {
  VRow,
  VCol,
  VCard,
  VListItemIcon,
  VListItemContent,
  VTextField,
  VIcon,
} from 'vuetify/lib';
import DeleteButton from './DeleteButton.vue';

Vue.component('v-col', VCol);
Vue.component('v-row', VRow);
Vue.component('v-card', VCard);
Vue.component('v-list-item-icon', VListItemIcon);
Vue.component('v-list-item-content', VListItemContent);
Vue.component('v-text-field', VTextField);
Vue.component('v-icon', VIcon);
Vue.component('DeleteButton', DeleteButton);

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
