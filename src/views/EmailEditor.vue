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
body {
  overflow: hidden !important;
}
iframe {
  position: fixed;
}
</style>
