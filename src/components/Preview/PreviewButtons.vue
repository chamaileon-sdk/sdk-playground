<template>
  <div>
    <h1>Preview Buttons</h1>
    <v-btn @click="openPreview">test</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    openPreview() {
      this.$store.state.sdk.previewEmail({
        document: {}, // email JSON - required
      });
    },
  },
};
</script>

<style></style>
