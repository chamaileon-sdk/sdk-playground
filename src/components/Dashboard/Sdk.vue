<template>
  <v-app>
    <h1>SDK</h1>
    <p class="my-3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <h1>Logo</h1>
    <p class="my-3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <v-card elevation="0">
      <v-tabs height="auto" color="primary" show-arrows>
        <v-tab class="pa-0 mr-3">
          <v-card
            outlined
            elevation="0"
            class="pa-5 d-flex"
            height="100px"
            width="220px"
            :style="
              `fill: ${this.$vuetify.presets.framework.theme.themes.light.primary}`
            "
            v-chamaileonLogo
          ></v-card>
        </v-tab>
        <v-tab v-for="(l, i) in logos" :key="i" class="pa-0 mx-3">
          <v-card
            class="pa-5"
            height="100px"
            width="220px"
            elevation="0"
            outlined
          >
            <div style="position: relative; height: 100%">
              <div
                style="position: absolute; top: 0; left: 0; width:100%; height:100%;z-index:2"
              ></div>
              <iframe
                width="100%"
                height="100%"
                style="z-index:1; top: 0; left: 0; position: relative;"
                :srcdoc="processScript(l.url)"
                frameborder="0"
              ></iframe>
            </div>
          </v-card>
        </v-tab>
      </v-tabs>
    </v-card>

    <h1>Splash Screen</h1>
    <p class="my-3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <v-card elevation="0">
      <v-tabs height="auto" color="primary" show-arrows slider-size="3">
        <v-tab class="pa-0 mr-3">
          <v-card
            class="rounded-lg  primary pa-5"
            style="fill: white;"
            height="240px"
            width="320px"
            elevation="0"
            outlined
            @mouseenter="
              hoverOnSplashContainer(
                $event,
                'https://plugins.chamaileon.io/mega-spa/3.2.2/splashScreen.html'
              )
            "
            v-chamaileonLogoNoText
          >
          </v-card>
        </v-tab>
        <v-tab v-for="(l, i) in splashs" :key="i" class="pa-0 mx-3">
          <v-card
            class="rounded-lg"
            height="240px"
            width="320px"
            elevation="0"
            outlined
            @mouseenter="hoverOnSplashContainer($event, l.url)"
          >
            <div style="position: relative; height: 100%">
              <div
                style="position: absolute; top: 0; left: 0; width:100%; height:100%;z-index:1"
              ></div>
              <iframe
                class="rounded-lg"
                width="100%"
                height="100%"
                style="z-index:0; top: 0; left: 0; position: relative;"
                :src="l.url"
                frameborder="0"
              ></iframe>
            </div>
          </v-card>
        </v-tab>
      </v-tabs>
    </v-card>
  </v-app>
</template>

<script>
const chamaileonLogo = require('chamaileon-logo');

export default {
  directives: {
    chamaileonLogo: {
      inserted: function(el) {
        el.appendChild(chamaileonLogo({ withText: true }));
      },
    },
    chamaileonLogoNoText: {
      inserted: function(el) {
        let logo = chamaileonLogo();
        logo.style.height = '100%';
        el.appendChild(logo);
      },
    },
  },
  methods: {
    hoverOnSplashContainer(e, url) {
      let x = e.target;
      let y = x.querySelector('iframe');
      y.src = url;
    },
    processScript: function(url) {
      const importScript = document.createElement('script');
      importScript.src = url;
      importScript.type = 'text/javascript';
      importScript.async = false;

      const runScript = document.createElement('script');
      runScript.innerText =
        'document.getElementById("container").appendChild(createLogo());';

      const html = `<html><head></head><body style="margin: 0"><div id="container" style="display: flex; height: 100vh; align-items: center; margin: 0; padding: 0; justify-content: center;">
      ${importScript.outerHTML}${runScript.outerHTML}
      </div></body></html>`;
      return html;
    },
  },
  computed: {
    border() {
      return `box-sizing: border-box; border: 4px solid ${this.$vuetify.presets.framework.theme.themes.light.primary}; border-radius: 12px;`;
    },
  },
  data() {
    return {
      html: '',
      tab: null,
      logos: [
        {
          url:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js',
        },
      ],

      splashs: [
        {
          url:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/splashScreen.html',
        },
      ],
    };
  },
};
</script>

<style></style>
