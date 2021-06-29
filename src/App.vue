<template>
  <v-app>
    <v-card height="100%" width="256" app class="drawer elevation-0">
      <v-navigation-drawer permanent :style="style">
        <v-list-item>
          <v-list-item-content>
            <Logo></Logo>
          </v-list-item-content>
        </v-list-item>

        <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon class="white--text">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Logo from './components/Logo.vue';

export default {
  components: {
    Logo,
  },

  computed: {
    style() {
      return `background-color: ${this.primaryColor} !important; fill: white;`;
    },
  },

  data() {
    return {
      primaryColor: '#00C0E7',
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      right: null,
    };
  },
};
</script>
