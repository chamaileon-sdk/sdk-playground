<template>
  <div>
    <h1>Block Libraries</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore atque
      assumenda a, alias nobis beatae! Aut, eaque velit, adipisci reprehenderit
      rerum blanditiis dolorem quos placeat ullam nam sapiente quam deserunt.
    </p>
    <h2>Your Libraries</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quas modi
      esse obcaecati eligendi veniam. Cumque molestiae quasi incidunt tempore,
      sit inventore pariatur maxime. Modi doloribus fugiat ex veritatis cum!
    </p>
    <OptionWrapper>
      <template>
        <v-row align="center" justify="end" class="ma-0">
          <v-btn depressed color="success" @click="addBlockLibs">
            <v-icon left>
              mdi-plus
            </v-icon>
            New Library
          </v-btn>
        </v-row>
      </template>
      <v-card
        v-if="blockLibsArr.length > 0"
        class="mx-auto mt-7"
        elevation="0"
        max-height="400"
        style="overflow-y: auto;"
      >
        <draggable v-model="blockLibsArr">
          <div v-for="b in blockLibsArr" :key="b.id">
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
                <v-row class="px-6">
                  <v-col cols="3" align-self="center">
                    <v-text-field
                      dense
                      hide-details="true"
                      label="ID"
                      :value="b.id"
                      :rules="[rules.required, rules.unique]"
                      @blur="updateID($event.target.value)"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col cols="3" align-self="center">
                    <v-text-field
                      dense
                      hide-details="true"
                      label="Label"
                      :value="b.label"
                      @input="updateBlockLibs({ id: b.id, label: $event })"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" align-self="center">
                    <v-select
                      dense
                      hide-details="true"
                      class="ma-0 pa-0"
                      label="Access"
                      :value="b.accessLevel"
                      :items="['readOnly', 'readWrite']"
                      @change="
                        updateBlockLibs({ id: b.id, accessLevel: $event })
                      "
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col cols="3" align-self="center" class="ml-auto">
                    <v-btn
                      depressed
                      color="red white--text"
                      width="100%"
                      @click="removeBlockLibs(b.id)"
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
          </div>
        </draggable>
      </v-card>
    </OptionWrapper>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import OptionWrapper from '../optionWrapper.vue';
import { mapMutations } from 'vuex';

export default {
  components: {
    draggable,
    OptionWrapper,
  },
  methods: {
    ...mapMutations([
      'updateBlockLibsOrder',
      'updateBlockLibs',
      'addBlockLibs',
      'removeBlockLibs',
    ]),
    updateID(val, id) {
      if (!this.$store.state.editorConfig.blIDArr.includes(val) && val)
        this.updateBlockLibs({ id: id, newID: val });
    },
  },
  computed: {
    blockLibsArr: {
      get() {
        return this.$store.getters.getBlockLibs;
      },
      set(value) {
        this.updateBlockLibsOrder(value);
      },
    },
  },
  data() {
    return {
      rules: {
        required: value => !!value || 'Required.',
        unique: value =>
          !this.$store.state.editorConfig.blIDArr.includes(value),
      },
    };
  },
};
</script>

<style></style>
