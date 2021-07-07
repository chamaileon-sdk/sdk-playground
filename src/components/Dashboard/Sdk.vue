<template>
  <v-app>
    <h1>SDK</h1>
    <v-card elevation="0">
      <v-tabs height="auto" color="primary" show-arrows>
        <v-tab class="pa-0">
          <v-card
            class="pa-5"
            height="100px"
            width="200px"
            :style="
              `fill: ${this.$vuetify.presets.framework.theme.themes.light.primary}`
            "
            v-chamaileonLogo
          ></v-card>
        </v-tab>
        <v-tab v-for="(l, i) in logos" :key="i" class="pa-0">
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
    <!--<v-list>
      <v-row>
        <v-col style="height:200px" v-chamaileonLogo> </v-col>
        <v-col v-for="(l, i) in logos" :key="i" style="height:200px">
          <div style="position: relative; height: 200px">
            <div
              style="position: absolute; top: 0; left: 0; width:100%; height:100%;z-index:2"
            ></div>
            <iframe style="z-index:1" :srcdoc="processScript(l.url)"></iframe>
          </div>
        </v-col>
      </v-row>
    </v-list>-->

    <h1>Splash Screen</h1>
    <v-row>
      <div>
        <iframe
          width="50%"
          height="50%"
          seamless
          :srcdoc="
            processScript(
              'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js'
            )
          "
          frameborder="0"
        ></iframe>
      </div>
    </v-row>
  </v-app>
</template>

<script>
const chamaileonLogo = require('chamaileon-logo');

export default {
  mounted() {},

  directives: {
    chamaileonLogo: {
      inserted: function(el) {
        el.appendChild(chamaileonLogo({ withText: true }));
      },
    },
  },
  methods: {
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
  data() {
    return {
      tab: null,
      logos: [
        {
          url:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js',
        },
        {
          url:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js',
        },
        {
          url:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js',
        },
        {
          url:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js',
        },
        {
          url:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js',
        },
        {
          url:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/createLogo.js',
        },
      ],

      splashs: [{}],
    };
  },
};
</script>

<style></style>
