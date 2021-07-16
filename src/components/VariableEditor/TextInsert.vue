<template>
  <div>
    <h1>Text Insert</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias natus
      expedita ipsa ipsam ea nobis facere tenetur debitis magni, adipisci error,
      illo deleniti sint laborum incidunt distinctio? Quaerat, ratione hic.
    </p>
    <OptionWrapper>
      <TextInsertPreview />
    </OptionWrapper>

    <h3>Buttons</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
      tempora hic delectus culpa natus dicta adipisci eius aliquam officiis
      reiciendis? Officia fuga saepe nam? Iure corporis molestias commodi saepe
      ipsum.
    </p>
    <OptionWrapper>
      <v-row align="center" justify="end" class="ma-0">
        <AddButton @click="addVETextInsertButton"> New Button</AddButton>
      </v-row>
      <div
        v-show="btnArr.length > 0"
        class="mt-8"
        style="max-height: 222px; overflow-y: auto;"
      >
        <draggable v-model.lazy="btnArr">
          <ListItem3
            v-for="item in btnArr"
            :key="item.id"
            :id="item.id"
            :icon="item.icon"
            :label="item.label"
            @idChange="
              updateVETextInsertButton({
                id: item.id,
                newID: $event,
              })
            "
            @labelChange="
              updateVETextInsertButton({
                id: item.id,
                label: $event,
              })
            "
            @iconChange="
              updateVETextInsertButton({
                id: item.id,
                icon: $event,
              })
            "
            @deleteClicked="deleteVETextInsertButton(item.id)"
          />
        </draggable>
      </div>
    </OptionWrapper>
  </div>
</template>

<script>
import AddButton from '../AddButton.vue';
import OptionWrapper from '../optionWrapper.vue';
import ListItem3 from '../ListItem3.vue';

import TextInsertPreview from './TextInsertPreview.vue';
import draggable from 'vuedraggable';
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
      'addVETextInsertButton',
      'deleteVETextInsertButton',
      'updateVETextInsertOrder',
      'updateVETextInsertButton',
    ]),
  },
  computed: {
    btnArr: {
      get() {
        return this.$store.state.variableEditorConfig.settings.buttons
          .textInsertPlugin;
      },
      set(val) {
        this.updateVETextInsertOrder(val);
      },
    },
  },
  components: {
    AddButton,
    OptionWrapper,
    draggable,
    TextInsertPreview,
    ListItem3,
  },
};
</script>

<style></style>
