<template>
  <v-app>
    <Menu :items="editors" />

    <v-main class="pa-16">
      <v-container class="py-8 px-16" fluid>
        <v-row>
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
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
      editors: [
        {
          title: 'Header',
          icon: 'cog-outline',
        },
        {
          title: 'Footer',
          icon: 'cog-outline',
        },
        {
          title: 'text insert',
          icon: 'cog-outline',
        },
      ],
    };
  },
};
</script>

<style></style>
