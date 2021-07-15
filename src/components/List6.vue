<template>
  <v-lazy>
    <v-card
      color="transparent"
      v-show="buttonsArr.length > 0"
      class="mx-auto mt-7 flex flex-column"
      elevation="0"
      max-height="360"
      style="overflow-y: overlay;"
    >
      <draggable v-model="buttonsArr">
        <div v-for="(b, i) in buttonsArr" :key="b.id">
          <v-card
            class="ma-0 pa-0 d-flex align-center"
            outlined
            elevation="0"
            tile
          >
            <v-list-item-icon class="align-self-center ma-0 ml-6">
              <v-icon>mdi-menu</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-row class="px-6 pt-3">
                <v-col
                  class="py-0"
                  cols="4"
                  align-self="center"
                  v-show="!b.items"
                >
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

                <v-col
                  class="py-0"
                  cols="4"
                  align-self="center"
                  v-show="b.items"
                >
                  <v-btn
                    depressed
                    outlined
                    width="100%"
                    @click="addDDBtn(b.id)"
                  >
                    <v-icon left>
                      mdi-plus
                    </v-icon>
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
                <v-icon>mdi-menu</v-icon>
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
        </div>
      </draggable>
    </v-card>
  </v-lazy>
</template>

<script>
import DeleteButton from './DeleteButton.vue';
import draggable from 'vuedraggable';
import ColorPicker from './EmailEditor/ColorPicker.vue';

export default {
  props: {
    section: {
      type: String,
      required: true,
      validator: function(value) {
        // The value must match one of these strings
        return ['Editor', 'Preview'].indexOf(value) !== -1;
      },
    },
  },
  components: {
    DeleteButton,
    draggable,
    ColorPicker,
  },
  methods: {
    updateLabel(val, id) {
      this.$store.commit(`update${this.section}Btn`, { id: id, label: val });
    },
    updateColor(val, id) {
      this.$store.commit(`update${this.section}Btn`, { id: id, color: val });
    },
    updateIcon(val, id) {
      this.$store.commit(`update${this.section}Btn`, { id: id, icon: val });
    },
    updateID(val, id) {
      this.$store.commit(`update${this.section}Btn`, { id: id, newID: val });
    },
    updateDDID(val, pid, id) {
      this.$store.commit(`update${this.section}DropdownBtn`, {
        id: pid,
        obj: { id: id, newID: val },
      });
    },
    updateDDBtn(payload) {
      this.$store.commit(`update${this.section}DropdownBtn`, payload);
    },
    addDDBtn(payload) {
      this.$store.commit(`add${this.section}DropdownBtn`, payload);
    },
    deleteDDBtn(payload) {
      this.$store.commit(`remove${this.section}DropdownBtn`, payload);
    },
    deleteBtn(payload) {
      this.$store.commit(`remove${this.section}Btn`, payload);
    },
  },
  computed: {
    buttonsArr: {
      get() {
        return this.$store.state[this.section.toLowerCase() + 'Config'].settings
          .buttons.header;
      },
      set(value) {
        this.$store.commit(`update${this.section}BtnOrder`, value);
      },
    },
  },
};
</script>

<style></style>
