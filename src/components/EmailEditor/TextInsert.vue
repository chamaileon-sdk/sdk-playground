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
      <template>
        <v-row align="center" justify="end" class="ma-0">
          <AddButton @click="addTextInsertButton"> New Button </AddButton>
        </v-row>
      </template>
      <div
        v-if="btnArr.length > 0"
        class="mt-8"
        style="max-height: 400px; overflow-y: auto;"
      >
        <draggable v-model="btnArr">
          <ListItem3
            v-for="item in btnArr"
            :key="item.id"
            :id="item.id"
            :icon="item.icon"
            :label="item.label"
            @idChange="
              updateTextInsertButton({
                id: item.id,
                newID: $event,
              })
            "
            @labelChange="
              updateTextInsertButton({
                id: item.id,
                label: $event,
              })
            "
            @iconChange="
              updateTextInsertButton({
                id: item.id,
                icon: $event,
              })
            "
            @deleteClicked="deleteTextInsertButton(item.id)"
          />
        </draggable>
      </div>
    </OptionWrapper>
  </div>
</template>

<script>
import AddButton from '../AddButton.vue';
import ListItem3 from '../ListItem3.vue';
import OptionWrapper from '../optionWrapper.vue';
import TextInsertPreview from './TextInsertPreview.vue';
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
    AddButton,
    OptionWrapper,
    draggable,
    TextInsertPreview,
    ListItem3,
  },
};
</script>

<style></style>
