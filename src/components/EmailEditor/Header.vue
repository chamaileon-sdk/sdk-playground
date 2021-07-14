<template>
  <div>
    <h1>Header</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
      laboriosam neque laborum beatae quas, explicabo quaerat aperiam nesciunt
      provident aliquam praesentium nisi magnam nihil debitis, pariatur numquam
      veniam molestiae similique.
    </p>
    <OptionsWrapper>
      <HeaderPreview />
    </OptionsWrapper>

    <h3>Your Buttons</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis hic
      earum, molestiae voluptatum ullam ut quae ratione ducimus, illum aperiam
      eligendi voluptatibus? Quia doloremque, quisquam ipsa veritatis unde eos.
      Facilis!
    </p>
    <OptionsWrapper>
      <template>
        <v-row align="center" justify="end" class="ma-0">
          <v-btn depressed color="success" @click="addBtn" class="mr-6">
            <v-icon left>
              mdi-plus
            </v-icon>
            New Button
          </v-btn>

          <v-btn depressed color="success" @click="addDD">
            <v-icon left>
              mdi-plus
            </v-icon>
            New DropDown
          </v-btn>
        </v-row>
      </template>

      <v-card
        color="transparent"
        v-if="buttonsArr.length > 0"
        class="mx-auto mt-7"
        elevation="0"
        max-height="360"
        style="overflow-y: auto;"
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
                    v-if="!b.items"
                  >
                    <v-text-field
                      dense
                      :rules="[rules.required, rules.unique]"
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
                    v-if="b.items"
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
                    <v-btn
                      depressed
                      color="red white--text"
                      width="100%"
                      @click="deleteBtn(b.id)"
                    >
                      <v-icon left>
                        mdi-close
                      </v-icon>
                      delete
                    </v-btn>
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

            <draggable v-if="b.items" v-model="b.items">
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
                      :rules="[rules.required, rules.unique]"
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
                    <v-btn
                      depressed
                      color="red white--text"
                      @click="
                        deleteDDBtn({
                          id: b.id,
                          obj: { id: i.id },
                        })
                      "
                      width="100%"
                    >
                      <v-icon left>
                        mdi-close
                      </v-icon>
                      delete
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </draggable>
          </div>
        </draggable>
      </v-card>
    </OptionsWrapper>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import ColorPicker from './ColorPicker.vue';
import HeaderPreview from './HeaderPreview.vue';
import OptionsWrapper from '../optionWrapper.vue';
import { mapMutations } from 'vuex';

export default {
  updated() {
    console.log(this.$store.state.editorConfig.idArr);
  },
  components: {
    draggable,
    ColorPicker,
    HeaderPreview,
    OptionsWrapper,
  },
  methods: {
    ...mapMutations({
      addBtn: 'addHeaderBtn',
      deleteBtn: 'removeHeaderBtn',
      updateHeaderBtnOrder: 'updateHeaderBtnOrder',
      updateBtn: 'updateHeaderBtn',
      addDD: 'addHeaderDropdown',
      addDDBtn: 'addHeaderDropdownBtn',
      updateDDBtn: 'updateDropdownBtn',
      deleteDDBtn: 'removeHeaderDropdownBtn',
    }),
    updateLabel(val, id) {
      this.updateBtn({ id: id, label: val });
    },
    updateColor(val, id) {
      this.updateBtn({ id: id, color: val });
    },
    updateIcon(val, id) {
      this.updateBtn({ id: id, icon: val });
    },
    updateID(val, id) {
      if (!this.$store.state.idArr.includes(val) && val)
        this.updateBtn({ id: id, newID: val });
    },
    updateDDID(val, pid, id) {
      if (!this.$store.state.idArr.includes(val) && val)
        this.updateDDBtn({
          id: pid,
          obj: { id: id, newID: val },
        });
    },
  },
  computed: {
    buttonsArr: {
      get() {
        return this.$store.getters.getHeaderBtns;
      },
      set(value) {
        this.updateHeaderBtnOrder(value);
      },
    },
  },
  data() {
    return {
      icon: '',
      id: 3,
      rules: {
        required: value => !!value || 'Required.',
        unique: value => !this.$store.state.editorConfig.idArr.includes(value),
      },
    };
  },
};
</script>

<style></style>
