import Vue from 'vue';
import Vuex from 'vuex';

import editorConfig from './modules/emailEditorConfig';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    editorConfig,
  },
  state: {
    sdk: null,

    sdkConfig: {
      locale: 'en',
      urls: {
        splashScreen:
          'https://plugins.chamaileon.io/mega-spa/3.2.2/splashScreen.html',
        createLogoJS:
          'https://plugins.chamaileon.io/mega-spa/3.2.2/createLogoWithText.js',
      },
      colors: {
        primary: '#000000',
        secondary: '#000000',
      },
    },
  },
  mutations: {
    addSDK(state, sdk) {
      state.sdk = sdk;
    },

    updateSDKConfig(state, payload) {
      let elems = document.head.getElementsByTagName('script');

      let i = elems.length;

      while (i--) {
        elems[i].remove();
      }

      console.log(elems);
      state.sdkConfig = { ...state.sdkConfig, ...payload };
      this.dispatch('initSDK', { apiKey: 'Y8mbu7S5Qh4cyCqJCVBn' });
    },
  },
  actions: {
    async initSDK({ commit }, { apiKey }) {
      const accessTokenRequest = await fetch(
        'https://sdk-api.chamaileon.io/api/v1/tokens/generate',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const accessTokenResponse = await accessTokenRequest.json();
      const accessToken = accessTokenResponse.result;

      const chamaileonPlugins = await window.chamaileonSdk.init({
        mode: 'serverless',
        accessToken: accessToken,
        whitelabel: {
          ...this.state.sdkConfig,
        },
      });

      console.log(chamaileonPlugins);
      commit('addSDK', chamaileonPlugins);
    },
  },
  getters: {
    getConfigObject: state => {
      //Deep copy
      let x = JSON.parse(JSON.stringify(state.editorConfig));

      let currentElems = x.settings.elements;
      let keepElementsTab = false;

      for (const key in currentElems) {
        let keep = false;
        let obj = currentElems[key];
        for (const elem in obj) {
          keep = keep || obj[elem];
        }

        if (!keep) currentElems[key] = false;
        keepElementsTab = keepElementsTab || keep;
      }

      x.settings.elements = keepElementsTab ? currentElems : false;

      return x;
    },
  },
});
