<template>
  <v-app>
    <SectionObserver>
      <div class="section" id="header">
        <Header :actLogoCreator="this.creatorFunction" />
      </div>
    </SectionObserver>
  </v-app>
</template>

<script>
import SectionObserver from '../components/SectionObserver.vue';
import Header from '../components/Preview/PreviewButtons.vue';

export default {
  components: {
    Header,
    SectionObserver,
  },
  mounted() {
    this.$store.dispatch('updateSDK');
  },

  destroyed() {
    window.chamaileonSdk.destroy;
  },
};
</script>

<style></style>
