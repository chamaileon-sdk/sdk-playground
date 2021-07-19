<template>
  <v-app>
    <h1>Header</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quasi
      exercitationem porro quaerat iusto reiciendis vero accusamus nam libero
      ipsum, vitae non a distinctio beatae! Libero pariatur voluptate commodi
      sapiente?
    </p>
    <OptionWrapper>
      <HeaderPreview />
    </OptionWrapper>

    <h3>Buttons</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium optio
      quae esse repudiandae minus eligendi perferendis nesciunt eos vitae quis.
      At commodi quam provident, praesentium asperiores architecto est rerum
      aliquam!
    </p>
    <OptionWrapper>
      <SplitList :section="'Header'" />
    </OptionWrapper>

    <v-btn @click="OpenEditor">teszt</v-btn>
  </v-app>
</template>

<script>
import OptionWrapper from '../optionWrapper.vue';
import HeaderPreview from './HeaderPreview.vue';
import SplitList from './SplitList.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    SplitList,
    OptionWrapper,
    HeaderPreview,
  },
  methods: {
    OpenEditor() {
      this.$store.state.sdk.editVariables({
        ...this.getVariableEditorConfigObject,
        hooks: {},
      });
    },
  },
  computed: {
    ...mapGetters(['getVariableEditorConfigObject']),
  },
};
</script>

<style></style>
