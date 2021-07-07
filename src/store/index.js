import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sdk: null,
    idArr: [],
    blIDArr: [],
    key: 0,
    blKey: 0,
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
    editorConfig: {
      document: {},
      settings: {
        buttons: {
          header: [],
          textInsert: [],
        },
        elements: {
          content: {
            text: true,
            image: true,
            button: true,
            divider: true,
            social: false,
            code: false,
          },
          structure: {
            fullWidth: false,
            box: true,
            multiColumn: true,
          },
          advanced: {
            loop: true,
            conditional: true,
            dynamicImage: true,
          },
        },
      },
      blockLibraries: [],
      addons: {
        blockLock: {
          enabled: false,
        },
        variableSystem: {
          enabled: false,
        },
      },
    },
  },
  mutations: {
    //Button
    addHeaderBtn(state) {
      state.editorConfig.settings.buttons.header.push({
        id: `yourBtn-${state.key}`,
        type: 'button',
        icon: 'at',
        label: '',
        color: '#000000',
        style: 'text',
      });

      state.idArr.push(`yourBtn-${state.key}`);
      state.key++;
    },
    removeHeaderBtn(state, payload) {
      state.editorConfig.settings.buttons.header = state.editorConfig.settings.buttons.header.filter(
        c => {
          if (c.id !== payload) return true;

          if (c.items)
            c.items.forEach(it => {
              state.idArr = state.idArr.filter(id => id !== it.id);
            });

          return false;
        }
      );

      state.idArr = state.idArr.filter(c => c !== payload);
    },
    updateHeaderBtnOrder(state, payload) {
      state.editorConfig.settings.buttons.header = payload;
    },
    updateHeaderBtn(state, payload) {
      state.editorConfig.settings.buttons.header = state.editorConfig.settings.buttons.header.map(
        c => {
          if (c.id === payload.id) {
            if ('newID' in payload) {
              state.idArr = state.idArr.map(c => {
                if (c === payload.id) return payload.newID;

                return c;
              });
              return { ...c, id: payload.newID };
            }

            return { ...c, ...payload };
          }

          return c;
        }
      );
    },

    //Dropdown
    addHeaderDropdown(state) {
      state.editorConfig.settings.buttons.header.push({
        id: `yourBtn-${state.key}`,
        type: 'dropdown',
        icon: 'at',
        label: '',
        color: '#000000',
        style: 'text',
        items: [],
      });

      state.idArr.push(`yourBtn-${state.key}`);
      state.key++;
    },

    removeHeaderDropdownBtn(state, payload) {
      state.editorConfig.settings.buttons.header = state.editorConfig.settings.buttons.header.map(
        c => {
          if (c.id === payload.id) {
            c.items = c.items.filter(c => c.id !== payload.obj.id);
            state.idArr = state.idArr.filter(c => c !== payload.obj.id);
          }

          return c;
        }
      );
    },

    addHeaderDropdownBtn(state, id) {
      state.editorConfig.settings.buttons.header = state.editorConfig.settings.buttons.header.map(
        c => {
          if (c.id === id) {
            c.items.push({
              id: `yourBtn-${state.key}`,
              icon: 'at',
              label: ``,
            });
          }

          return c;
        }
      );

      state.idArr.push(`yourBtn-${state.key}`);
      state.key++;
    },

    updateDropdownBtn(state, payload) {
      state.editorConfig.settings.buttons.header = state.editorConfig.settings.buttons.header.map(
        c => {
          if (c.id === payload.id) {
            c.items = c.items.map(i => {
              if (i.id === payload.obj.id) {
                if ('newID' in payload.obj) {
                  state.idArr = state.idArr.map(c => {
                    if (c === payload.obj.id) return payload.obj.newID;

                    return c;
                  });

                  return { ...i, id: payload.obj.newID };
                }

                return { ...i, ...payload.obj };
              }

              return i;
            });
          }

          return c;
        }
      );
    },
    toggleElement(state, payload) {
      console.log(payload);
      state.editorConfig.settings.elements[payload.type][
        payload.element
      ] = !state.editorConfig.settings.elements[payload.type][payload.element];
    },

    //BlockLibs
    addBlockLibs(state) {
      state.editorConfig.blockLibraries.push({
        id: `${state.blKey}`,
        label: `Block Library ${state.blKey}`,
        accessLevel: 'readOnly',
      });

      state.blIDArr.push(`${state.blKey}`);
      state.blKey++;
    },

    removeBlockLibs(state, payload) {
      state.editorConfig.blockLibraries = state.editorConfig.blockLibraries.filter(
        c => c.id !== payload
      );

      state.blIDArr = state.blIDArr.filter(c => c !== payload);
    },

    updateBlockLibsOrder(state, payload) {
      state.editorConfig.blockLibraries = payload;
    },
    updateBlockLibs(state, payload) {
      state.editorConfig.blockLibraries = state.editorConfig.blockLibraries.map(
        c => {
          if (c.id === payload.id) {
            if ('newID' in payload) {
              state.blIDArr = state.blIDArr.map(c => {
                if (c === payload.id) return payload.newID;

                return c;
              });
              return { ...c, id: payload.newID };
            }

            return { ...c, ...payload };
          }

          return c;
        }
      );
    },

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
  modules: {},
  getters: {
    getHeaderBtns: state => {
      return state.editorConfig.settings.buttons.header;
    },
    getElements: state => {
      return state.editorConfig.settings.elements;
    },
    getBlockLibs: state => {
      return state.editorConfig.blockLibraries;
    },
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
