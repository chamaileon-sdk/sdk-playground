<template>
  <v-app>
    <SectionObserver>
      <div class="section" id="settings">
        <Settings />
      </div>
    </SectionObserver>
  </v-app>
</template>

<script>
import SectionObserver from '../components/SectionObserver.vue';
import Settings from '../components/Thumbnail/ThumbnailSettings.vue';

export default {
  mounted() {
    this.$store.dispatch('updateSDK');
  },
  destroyed() {
    window.chamaileonSdk.destroy;
  },
  components: {
    Settings,
    SectionObserver,
  },
};
</script>

<style></style>
