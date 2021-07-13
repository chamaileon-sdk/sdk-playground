<template>
  <v-app>
    <MenuReworked />

    <!--<v-main class="pa-16">
      <v-container class="py-8 px-16" fluid>
        <v-row>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  -->
    <v-main>
      <v-row>
        <v-col class="pa-16" cols="8">
          <div class="py-8 px-16">
            <router-view />
          </div>
        </v-col>
        <v-col cols="4">
          <v-card style="position: fixed" width="100%" height="100%" dark flat>
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
