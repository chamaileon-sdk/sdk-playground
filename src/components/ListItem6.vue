<template>
  <div>
    <keep-alive>
      <v-card class="ma-0 pa-0 d-flex align-center" outlined flat>
        <v-list-item-icon class="align-self-center ma-0 ml-6">
        </v-list-item-icon>
        <v-list-item-content>
          <v-row class="px-6 pt-3">
            <v-col class="py-0" cols="4" align-self="center" v-show="!b.items">
              <v-text-field
                dense
                hide-details="true"
                label="ID"
                :value="b.id"
                @blur="updateID($event.target.value, b.id)"
                outlined
              ></v-text-field>
            </v-col>

            <v-col class="py-0" cols="4" align-self="center">
              <v-select
                dense
                hide-details="true"
                class="ma-0 pa-0"
                label="Style"
                :items="['text', 'filled', 'depressed', 'outlined']"
                v-model="b.style"
                outlined
              ></v-select>
            </v-col>

            <v-col class="py-0" cols="4" align-self="center" v-show="b.items">
              <v-btn depressed outlined width="100%" @click="addDDBtn(b.id)">
                Add Button
              </v-btn>
            </v-col>

            <v-col class="py-0" cols="4" align-self="center">
              <DeleteButton @click="deleteBtn(b.id)"></DeleteButton>
            </v-col>
          </v-row>
          <v-row class="px-6 pb-3">
            <v-col class="py-0" cols="4" align-self="center">
              <v-text-field
                dense
                hide-details="true"
                label="Icon"
                :value="b.icon"
                @input="updateIcon($event, b.id)"
                outlined
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="4">
              <ColorPicker
                class="pa-0"
                :value="b.color"
                :label="'Color'"
                :index="i"
                @colorChange="updateColor($event, b.id)"
              />
            </v-col>

            <v-col class="py-0" cols="4" align-self="center">
              <v-text-field
                dense
                hide-details="true"
                label="Label"
                :value="b.label"
                @input="updateLabel($event, b.id)"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-card>
      <draggable v-show="b.items" v-model="b.items">
        <v-card
          v-for="i in b.items"
          :key="i.id"
          class="ma-0 pa-0 d-flex align-center mx-auto"
          outlined
          elevation="0"
          width="90%"
          tile
          style="overflow-y: hidden;"
        >
          <v-list-item-icon class="align-self-center ma-0 ml-6">
          </v-list-item-icon>
          <v-row class="px-6 ma-0">
            <v-col cols="3" align-self="center">
              <v-text-field
                dense
                hide-details="true"
                label="ID"
                :value="i.id"
                outlined
                @blur="updateDDID($event.target.value, b.id, i.id)"
              ></v-text-field>
            </v-col>

            <v-col cols="3" align-self="center">
              <v-text-field
                dense
                hide-details="true"
                label="Icon"
                :value="i.icon"
                outlined
                @input="
                  updateDDBtn({
                    id: b.id,
                    obj: { id: i.id, icon: $event },
                  })
                "
              ></v-text-field>
            </v-col>

            <v-col cols="3" align-self="center">
              <v-text-field
                dense
                hide-details="true"
                label="Label"
                :value="i.label"
                outlined
                @input="
                  updateDDBtn({
                    id: b.id,
                    obj: { id: i.id, label: $event },
                  })
                "
              ></v-text-field>
            </v-col>

            <v-col cols="3" align-self="center" class="ml-auto">
              <DeleteButton
                @click="
                  deleteDDBtn({
                    id: b.id,
                    obj: { id: i.id },
                  })
                "
                class=""
              ></DeleteButton>
            </v-col>
          </v-row>
        </v-card>
      </draggable>
    </keep-alive>
  </div>
</template>

<script>
import ColorPicker from './EmailEditor/ColorPicker.vue';
import DeleteButton from './DeleteButton.vue';

export default {
  props: {
    b: Object,
  },
  components: {
    DeleteButton,
    ColorPicker,
  },
};
</script>

<style></style>
