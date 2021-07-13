<template>
  <v-app>
    <Menu :items="items" />

    <v-main class="pa-16">
      <v-container class="py-8 px-16" fluid>
        <v-row>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>

      <v-fab-transition>
        <v-btn
          color="primary rounded-pill"
          large
          fab
          bottom
          right
          class="v-btn--example"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-main>
  </v-app>
</template>

<script>
import Menu from '../components/Menu.vue';

export default {
  async mounted() {
    await this.$store.dispatch('updateSDK');
  },
  destroyed() {
    window.chamaileonSdk.destroy;
  },
  components: {
    Menu,
  },

  data() {
    return {
      items: [
        { title: 'Header', icon: 'border-top-variant' },
        { title: 'Elements', icon: 'card-plus-outline' },
        { title: 'Block Libraries', icon: 'database-edit-outline' },
        { title: 'Text Insert', icon: 'format-text' },
        { title: 'Addons', icon: 'puzzle-outline' },
        { title: 'Settings', icon: 'cog-outline' },
      ],
    };
  },
};
</script>

<style>
.v-btn--example {
  position: fixed;
  bottom: 0;
  right: 31%;
  margin-bottom: 64px;
}

body {
  overflow: hidden !important;
}
iframe {
  position: fixed;
}
</style>
