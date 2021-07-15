<template>
  <v-card
    color="transparent"
    v-show="buttonsArr.length > 0"
    class="mx-auto mt-7 "
    elevation="0"
    max-height="360"
    style="overflow-y: overlay;"
  >
    <RecycleScroller
      :items="buttonsArr"
      :item-size="120"
      key-field="id"
      v-slot="{ item }"
      :buffer="300"
    >
      <v-card class="ma-0 pa-0 d-flex align-center" outlined elevation="0" tile>
        <v-list-item-icon class="align-self-center ma-0 ml-6">
          <v-icon>mdi-menu</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-row class="px-6 pt-3">
            <v-col
              class="py-0"
              cols="4"
              align-self="center"
              v-show="!item.items"
            >
              <v-text-field
                dense
                hide-details="true"
                label="ID"
                :value="item.id"
                @blur="updateID($event.target.value, item.id)"
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
                v-model="item.style"
                outlined
              ></v-select>
            </v-col>

            <v-col
              class="py-0"
              cols="4"
              align-self="center"
              v-show="item.items"
            >
              <v-btn depressed outlined width="100%" @click="addDDBtn(item.id)">
                <v-icon left>
                  mdi-plus
                </v-icon>
                Add Button
              </v-btn>
            </v-col>

            <v-col class="py-0" cols="4" align-self="center">
              <DeleteButton @click="deleteBtn(item.id)"></DeleteButton>
            </v-col>
          </v-row>
          <v-row class="px-6 pb-3">
            <v-col class="py-0" cols="4" align-self="center">
              <v-text-field
                dense
                hide-details="true"
                label="Icon"
                :value="item.icon"
                @input="updateIcon($event, item.id)"
                outlined
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="4">
              <ColorPicker
                class="pa-0"
                :value="item.color"
                :label="'Color'"
                :index="0"
                @colorChange="updateColor($event, item.id)"
              />
            </v-col>

            <v-col class="py-0" cols="4" align-self="center">
              <v-text-field
                dense
                hide-details="true"
                label="Label"
                :value="item.label"
                @input="updateLabel($event, item.id)"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-card>
      <draggable v-show="item.items" v-model="item.items">
        <v-card
          v-for="i in item.items"
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
                @blur="updateDDID($event.target.value, item.id, i.id)"
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
                    id: item.id,
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
                    id: item.id,
                    obj: { id: i.id, label: $event },
                  })
                "
              ></v-text-field>
            </v-col>

            <v-col cols="3" align-self="center" class="ml-auto">
              <DeleteButton
                @click="
                  deleteDDBtn({
                    id: item.id,
                    obj: { id: i.id },
                  })
                "
                class=""
              ></DeleteButton>
            </v-col>
          </v-row>
        </v-card>
      </draggable>
    </RecycleScroller>

    <!--<draggable v-model="buttonsArr">
      <div v-for="(b, i) in buttonsArr" :key="item.id">
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
                v-show="!item.items"
              >
                <v-text-field
                  dense
                  hide-details="true"
                  label="ID"
                  :value="item.id"
                  @blur="updateID($event.target.value, item.id)"
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
                  v-model="item.style"
                  outlined
                ></v-select>
              </v-col>

              <v-col class="py-0" cols="4" align-self="center" v-show="item.items">
                <v-btn depressed outlined width="100%" @click="addDDBtn(item.id)">
                  <v-icon left>
                    mdi-plus
                  </v-icon>
                  Add Button
                </v-btn>
              </v-col>

              <v-col class="py-0" cols="4" align-self="center">
                <DeleteButton @click="deleteBtn(item.id)"></DeleteButton>
              </v-col>
            </v-row>
            <v-row class="px-6 pb-3">
              <v-col class="py-0" cols="4" align-self="center">
                <v-text-field
                  dense
                  hide-details="true"
                  label="Icon"
                  :value="item.icon"
                  @input="updateIcon($event, item.id)"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="4">
                <ColorPicker
                  class="pa-0"
                  :value="item.color"
                  :label="'Color'"
                  :index="i"
                  @colorChange="updateColor($event, item.id)"
                />
              </v-col>

              <v-col class="py-0" cols="4" align-self="center">
                <v-text-field
                  dense
                  hide-details="true"
                  label="Label"
                  :value="item.label"
                  @input="updateLabel($event, item.id)"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-card>
        <draggable v-show="item.items" v-model="item.items">
          <v-card
            v-for="i in item.items"
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
                  @blur="updateDDID($event.target.value, item.id, i.id)"
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
                      id: item.id,
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
                      id: item.id,
                      obj: { id: i.id, label: $event },
                    })
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="3" align-self="center" class="ml-auto">
                <DeleteButton
                  @click="
                    deleteDDBtn({
                      id: item.id,
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
    </draggable>-->
  </v-card>
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
