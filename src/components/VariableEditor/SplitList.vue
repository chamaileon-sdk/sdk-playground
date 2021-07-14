<template>
  <v-row>
    <v-col cols="6">
      <template>
        <v-row align="center" class="ma-0 justify-begin">
          <v-btn depressed color="success" @click="addLeftButton">
            <v-icon left>
              mdi-plus
            </v-icon>
            New Button
          </v-btn>
        </v-row>
      </template>
      <div
        v-if="buttonsLeft.length > 0"
        class="mt-8"
        style="max-height: 400px; overflow-y: auto;"
      >
        <draggable v-model="buttonsLeft">
          <v-card
            class="ma-0 pa-0 d-flex align-center"
            outlined
            elevation="0"
            tile
            v-for="item in buttonsLeft"
            :key="item.id"
          >
            <v-list-item-icon class="align-self-center ma-0 ml-6">
              <v-icon>mdi-menu</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-row class="px-6">
                <v-col cols="6" align-self="center">
                  <v-text-field
                    dense
                    :value="item.id"
                    hide-details="true"
                    label="ID"
                    outlined
                    @change="
                      updateLeftButton({
                        id: item.id,
                        newID: $event,
                      })
                    "
                  ></v-text-field>
                </v-col>

                <v-col cols="6" align-self="center">
                  <v-btn
                    depressed
                    color="red white--text"
                    width="100%"
                    @click="deleteLeftButton(item.id)"
                  >
                    <v-icon left>
                      mdi-close
                    </v-icon>
                    delete
                  </v-btn>
                </v-col>

                <v-col cols="6" align-self="center">
                  <v-text-field
                    dense
                    :value="item.label"
                    hide-details="true"
                    label="Label"
                    outlined
                    @change="
                      updateLeftButton({
                        id: item.id,
                        label: $event,
                      })
                    "
                  ></v-text-field>
                </v-col>
                <v-col cols="6" align-self="center">
                  <v-text-field
                    dense
                    :value="item.icon"
                    @change="
                      updateLeftButton({
                        id: item.id,
                        icon: $event,
                      })
                    "
                    hide-details="true"
                    label="Icon"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-card>
        </draggable>
      </div>
    </v-col>
    <v-col cols="6">
      <template>
        <v-row align="center" class="ma-0 justify-end">
          <v-btn depressed color="success" @click="addRightButton">
            <v-icon left>
              mdi-plus
            </v-icon>
            New Button
          </v-btn>
        </v-row>
      </template>
      <div
        v-if="buttonsRight.length > 0"
        class="mt-8"
        style="max-height: 400px; overflow-y: auto;"
      >
        <draggable v-model="buttonsRight">
          <v-card
            class="ma-0 pa-0 d-flex align-center"
            outlined
            elevation="0"
            tile
            v-for="item in buttonsRight"
            :key="item.id"
          >
            <v-list-item-icon class="align-self-center ma-0 ml-6">
              <v-icon>mdi-menu</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-row class="px-6">
                <v-col cols="6" align-self="center">
                  <v-text-field
                    dense
                    :value="item.id"
                    hide-details="true"
                    label="ID"
                    outlined
                    @change="
                      updateRightButton({
                        id: item.id,
                        newID: $event,
                      })
                    "
                  ></v-text-field>
                </v-col>

                <v-col cols="6" align-self="center">
                  <v-btn
                    depressed
                    color="red white--text"
                    width="100%"
                    @click="deleteRightButton(item.id)"
                  >
                    <v-icon left>
                      mdi-close
                    </v-icon>
                    delete
                  </v-btn>
                </v-col>

                <v-col cols="6" align-self="center">
                  <v-text-field
                    dense
                    :value="item.label"
                    hide-details="true"
                    label="Label"
                    outlined
                    @change="
                      updateRightButton({
                        id: item.id,
                        label: $event,
                      })
                    "
                  ></v-text-field>
                </v-col>
                <v-col cols="6" align-self="center">
                  <v-text-field
                    dense
                    :value="item.icon"
                    @change="
                      updateRightButton({
                        id: item.id,
                        icon: $event,
                      })
                    "
                    hide-details="true"
                    label="Icon"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-card>
        </draggable>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  props: {
    section: {
      type: String,
      required: true,
      validator: function(value) {
        // The value must match one of these strings
        return ['Header', 'Footer'].indexOf(value) !== -1;
      },
    },
  },
  methods: {
    addLeftButton() {
      this.$store.commit(`addVariableEditor${this.section}LeftButton`);
    },

    updateLeftButton(payload) {
      this.$store.commit(
        `updateVariableEditor${this.section}LeftButton`,
        payload
      );
    },

    deleteLeftButton(payload) {
      this.$store.commit(
        `deleteVariableEditor${this.section}LeftButton`,
        payload
      );
    },

    addRightButton() {
      this.$store.commit(`addVariableEditor${this.section}RightButton`);
    },

    updateRightButton(payload) {
      this.$store.commit(
        `updateVariableEditor${this.section}RightButton`,
        payload
      );
    },

    deleteRightButton(payload) {
      this.$store.commit(
        `deleteVariableEditor${this.section}RightButton`,
        payload
      );
    },
  },

  computed: {
    buttonsLeft: {
      get() {
        return this.$store.state.variableEditorConfig.settings.buttons[
          this.section.toLowerCase()
        ].left;
      },
      set(value) {
        this.$store.commit(
          `updateVariableEditor${this.section}LeftOrder`,
          value
        );
      },
    },

    buttonsRight: {
      get() {
        return this.$store.state.variableEditorConfig.settings.buttons[
          this.section.toLowerCase()
        ].right;
      },
      set(value) {
        this.$store.commit(
          `updateVariableEditor${this.section}RightOrder`,
          value
        );
      },
    },
  },

  components: {
    draggable,
  },
};
</script>

<style></style>
