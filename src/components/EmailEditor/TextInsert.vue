<template>
  <v-app>
    <h1>Preview</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias natus
      expedita ipsa ipsam ea nobis facere tenetur debitis magni, adipisci error,
      illo deleniti sint laborum incidunt distinctio? Quaerat, ratione hic.
    </p>
    <OptionWrapper>
      <HeaderPreview />
    </OptionWrapper>
    <h1>Buttons</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
      tempora hic delectus culpa natus dicta adipisci eius aliquam officiis
      reiciendis? Officia fuga saepe nam? Iure corporis molestias commodi saepe
      ipsum.
    </p>
    <div>
      <draggable v-model="btnArr">
        <v-card
          class="ma-0 pa-0 d-flex align-center"
          outlined
          elevation="0"
          tile
          v-for="item in btnArr"
          :key="item.id"
        >
          <v-list-item-icon class="align-self-center ma-0 ml-6">
            <v-icon>mdi-menu</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-row class="px-6">
              <v-col cols="2" align-self="center">
                <v-text-field
                  dense
                  :value="item.id"
                  hide-details="true"
                  label="ID"
                  outlined
                  @change="
                    updateTextInsertButton({
                      id: item.id,
                      newID: $event,
                    })
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-text-field
                  dense
                  :value="item.label"
                  hide-details="true"
                  label="Label"
                  outlined
                  @change="
                    updateTextInsertButton({
                      id: item.id,
                      label: $event,
                    })
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="2" align-self="center">
                <v-text-field
                  dense
                  :value="item.icon"
                  @change="
                    updateTextInsertButton({
                      id: item.id,
                      icon: $event,
                    })
                  "
                  hide-details="true"
                  label="Icon"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="2" align-self="center">
                <v-btn
                  depressed
                  color="red white--text"
                  width="100%"
                  @click="deleteTextInsertButton(item.id)"
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
      </draggable>

      <template>
        <v-row align="center" justify="end" class="ma-0 mt-7">
          <v-btn depressed color="success" @click="addTextInsertButton">
            <v-icon left>
              mdi-plus
            </v-icon>
            New Button
          </v-btn>
        </v-row>
      </template>
    </div>
  </v-app>
</template>

<script>
import OptionWrapper from '../optionWrapper.vue';
import HeaderPreview from './HeaderPreview.vue';
import draggable from 'vuedraggable';
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
      'addTextInsertButton',
      'deleteTextInsertButton',
      'updateTextInsertOrder',
      'updateTextInsertButton',
    ]),
  },
  computed: {
    btnArr: {
      get() {
        return this.$store.state.editorConfig.settings.buttons.textInsert;
      },
      set(val) {
        this.updateTextInsertOrder(val);
      },
    },
  },
  components: {
    OptionWrapper,
    HeaderPreview,
    draggable,
  },
};
</script>

<style></style>
