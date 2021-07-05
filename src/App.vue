<template>
  <v-main>
    <router-view />
  </v-main>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('initSDK', {
      apiKey: 'Y8mbu7S5Qh4cyCqJCVBn',
      logoCtor:
        'https://plugins.chamaileon.io/mega-spa/3.2.2/createLogoWithText.js',
      splashScrn:
        'https://plugins.chamaileon.io/mega-spa/3.2.2/splashScreen.html',
    });
  },

  unmounted() {
    window.chamaileonSdk.destroy();
  },
};
</script>

<style>
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;

  font-family: Roboto, sans-serif;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
