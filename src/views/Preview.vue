<template>
  <v-app>
    <Menu :items="editors" />

    <v-main class="pa-16">
      <v-container class="py-8 px-16" fluid>
        <v-row>
          <v-col>
            <router-view :actLogoCreator="this.creatorFunction" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from '../components/Menu.vue';

export default {
  mounted() {
    this.$store.dispatch('updateSDK');
  },

  destroyed() {
    window.chamaileonSdk.destroy;
  },

  components: {
    Menu,
  },
  data() {
    return {
      creatorFunction: window.createLogo,
      editors: [
        {
          title: 'Header',
          icon: 'cog-outline',
        },
      ],
    };
  },
};
</script>

<style></style>
