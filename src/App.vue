<template>
  <v-app>
    <MenuReworked />

    <v-main>
      <v-row class="pa-0 ma-0">
        <v-col class="px-16 py-0" cols="8">
          <div class="px-16">
            <router-view />
          </div>
        </v-col>
        <v-col class="pa-0" cols="4">
          <v-card
            style="position: fixed"
            class="rounded-0"
            width="100%"
            height="100%"
            dark
            flat
          >
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import MenuReworked from './components/MenuReworked.vue';

export default {
  components: {
    MenuReworked,
  },
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
