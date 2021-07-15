<template>
  <v-card color="transparent" elevation="0">
    <v-tabs
      height="auto"
      color="primary"
      background-color="transparent"
      show-arrows
      slider-size="3"
    >
      <v-tab class="pa-0 mr-3">
        <v-card
          class="rounded-lg  primary pa-5"
          style="fill: white;"
          height="240px"
          width="320px"
          elevation="0"
          outlined
          v-chamaileonLogoNoText
          @click="
            changeSplash(
              'https://plugins.chamaileon.io/mega-spa/3.2.2/splashScreen.html'
            )
          "
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
          @click="changeSplash(l.url)"
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
</template>

<script>
const chamaileonLogo = require('chamaileon-logo');

export default {
  data() {
    return {
      splashs: [
        {
          url:
            'https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/splashScreen.html',
        },
      ],
    };
  },
  directives: {
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

    changeSplash(value) {
      this.$store.commit('updateSDKConfig', {
        urls: { ...this.$store.state.sdkConfig.urls, splashScreen: value },
      });
    },
  },
};
</script>

<style></style>
