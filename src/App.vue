<template>
  <v-main>
    <v-row>
      <v-col>
        <router-view />
      </v-col>
      <v-col cols="4">
        <v-card width="100%" height="100%" dark flat> </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  created() {
    this.$store.commit('updateSDKConfig', {
      colors: {
        ...this.$store.state.sdkConfig.colors,
        primary: this.$vuetify.presets.framework.theme.themes.light.primary,
        secondary: this.$vuetify.presets.framework.theme.themes.light.secondary,
      },
    });
  },
  mounted() {
    this.$store.dispatch('initSDK', {
      apiKey: 'Y8mbu7S5Qh4cyCqJCVBn',
    });
  },
};
</script>

<style>
html {
  font-family: Roboto, sans-serif;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
