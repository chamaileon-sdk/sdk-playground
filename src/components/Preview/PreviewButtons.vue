<template>
  <div>
    <h1>Preview</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quos
      pariatur saepe voluptas mollitia delectus nobis quia officia, cum est
      tempore nesciunt sapiente itaque quidem similique accusamus, accusantium
      repellendus dolorem!
    </p>
    <OptionWrapper>
      <Header />
    </OptionWrapper>

    <h3>Buttons</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis hic
      earum, molestiae voluptatum ullam ut quae ratione ducimus, illum aperiam
      eligendi voluptatibus? Quia doloremque, quisquam ipsa veritatis unde eos.
      Facilis!
    </p>
    <OptionWrapper>
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
      <List6 :section="'Preview'" />
    </OptionWrapper>
    <v-btn @click="openPreview">test</v-btn>
  </div>
</template>

<script>
import List6 from '../List6.vue';
import OptionWrapper from '../optionWrapper.vue';
import Header from './PreviewHeaderPreview.vue';

import { mapMutations } from 'vuex';

export default {
  components: {
    List6,
    OptionWrapper,
    Header,
  },
  methods: {
    openPreview() {
      console.log(this.$store.state.previewConfig);
      this.$store.state.sdk.previewEmail({
        ...this.$store.state.previewConfig,
        document: { title: 'Default title', body: {}, variables: [] }, // email JSON - required
      });
    },

    ...mapMutations({
      addBtn: 'addPreviewBtn',
      addDD: 'addPreviewDropdown',
    }),
  },

  data() {
    return {
      rules: {
        required: value => !!value || 'Required.',
        unique: value => !this.$store.state.editorConfig.idArr.includes(value),
      },
    };
  },
};
</script>

<style></style>
