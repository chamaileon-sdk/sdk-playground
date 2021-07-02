<template>
  <v-app id="inspire">
    <v-navigation-drawer permanent app :style="style">
      <div class="pa-4">
        <Logo />
      </div>

      <v-list dark shaped>
        <v-list-item
          v-for="item in items"
          :key="item.id"
          link
          :to="item.title.toLowerCase().replaceAll(' ', '')"
        >
          <v-list-item-icon class="white--text">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="white--text">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="sdk.editEmail(configObj)">
          <v-list-item-icon class="white--text">
            <v-icon>mdi-at</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="white--text">
            <v-list-item-title>Open Editor</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
import Logo from '../components/Logo.vue';

export default {
  name: 'Home',

  beforeMount() {
    console.log('beforeMount');
    this.activeTab = this.activeTab === -1 ? 0 : this.activeTab;
  },

  methods: {
    menuItemClick(i) {
      this.activeTab = i;
      console.log(this.activeTab);
    },
  },

  components: {
    Logo,
  },

  computed: {
    style() {
      return `background-color: ${this.primaryColor} !important; fill: white;`;
    },
    configObj() {
      return this.$store.getters.getConfigObject;
    },
  },

  async mounted() {
    const accessTokenRequest = await fetch(
      'https://sdk-api.chamaileon.io/api/v1/tokens/generate',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer Y8mbu7S5Qh4cyCqJCVBn`,
        },
      }
    );

    const accessTokenResponse = await accessTokenRequest.json();
    const accessToken = accessTokenResponse.result;

    this.sdk = await window.chamaileonSdk.init({
      mode: 'serverless',
      accessToken: accessToken,
      whitelabel: {
        locale: 'en', // or 'hu'. If you need other languages, please contact us.
        urls: {
          splashScreen:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/splashScreen.html',
          createLogoJS:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js',
        },
        colors: {
          primary: '#2D3291',
          secondary: '#009f4a',
          red: '#ff5546',
          darkBlue: '#2d3291',
          darkGreen: '#00af6e',
          lightGreen: '#50d791',
          weirdGreen: '#50d791',
          pink: '#ff91a0',
          yellow: '#ffd23c',
        },
      },
    });
  },

  data() {
    return {
      sdk: null,
      primaryColor: '#00C0E7',
      activeTab: -1,
      items: [
        { id: 0, title: 'Header', icon: 'mdi-border-top-variant' },
        { id: 1, title: 'Elements', icon: 'mdi-card-plus-outline' },
        { id: 2, title: 'Block Libraries', icon: 'mdi-database-edit-outline' },
        { id: 3, title: 'Text Insert', icon: 'mdi-format-text' },
        { id: 4, title: 'Addons', icon: 'mdi-puzzle-outline' },
        { id: 5, title: 'Settings', icon: 'mdi-cog-outline' },
      ],
      right: null,
    };
  },
};
</script>
