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

    <h1>Preview Buttons</h1>
    <v-btn @click="openPreview">test</v-btn>
  </div>
</template>

<script>
import OptionWrapper from '../optionWrapper.vue';
import Header from './PreviewHeaderPreview.vue';

export default {
  components: {
    OptionWrapper,
    Header,
  },
  methods: {
    openPreview() {
      this.$store.state.sdk.previewEmail({
        document: { title: 'Default title', body: {}, variables: [] }, // email JSON - required
      });
    },
  },
};
</script>

<style></style>
