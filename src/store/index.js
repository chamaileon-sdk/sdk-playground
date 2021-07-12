import Vue from 'vue';
import Vuex from 'vuex';

import editorConfig from './modules/emailEditorConfig';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    editorConfig,
  },
  state: {
    apiKey: 'Y8mbu7S5Qh4cyCqJCVBn',
    logoCreatorFunction: undefined,
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
    changeLogoFunction(state, fn) {
      state.logoCreatorFunction = fn;
    },
    addSDK(state, sdk) {
      state.sdk = sdk;
    },

    updateSDKConfig(state, payload) {
      state.sdkConfig = { ...state.sdkConfig, ...payload };
    },
  },
  actions: {
    async initSDK({ commit, state }) {
      const accessTokenRequest = await fetch(
        'https://sdk-api.chamaileon.io/api/v1/tokens/generate',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${state.apiKey}`,
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
      commit('changeLogoFunction', window.createLogo);
    },
    async updateSDK({ dispatch }) {
      window.chamaileonSdk.destroy();

      let elems = document.head.getElementsByTagName('script');
      let links = document.head.getElementsByTagName('link');
      links[links.length - 1].remove();

      let styles = document.head.getElementsByTagName('style');
      let i = styles.length - 1;
      while (
        i >= 0 &&
        styles[i].innerHTML.includes('chamaileon-plugin-wrapper iframe')
      )
        i--;

      console.log(styles[i]);

      i = elems.length;

      while (i--) {
        elems[i].remove();
      }

      dispatch('initSDK');
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

      //Addons processing
      let addons = x.addons;
      for (const key in addons) {
        switch (addons[key].state) {
          case 'enabled':
            addons[key] = { enabled: true };
            break;
          case 'disabled':
            addons[key] = { enabled: false };
            break;
          case 'hidden':
            addons[key] = false;
            break;
          default:
            break;
        }
      }
      x.settings.addons = addons;

      //User processing
      if (!x.user.enabled) x.user = false;

      return x;
    },
  },
});
