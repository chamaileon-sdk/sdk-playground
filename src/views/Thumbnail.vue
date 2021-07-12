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
  components: {
    Menu,
  },
  data() {
    return {
      editors: [
        {
          title: 'Settings',
          icon: 'cog-outline',
        },
      ],
    };
  },
};
</script>

<style></style>
