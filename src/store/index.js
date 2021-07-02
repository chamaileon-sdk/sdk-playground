import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    key: 0,
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

      state.key++;
    },
    removeHeaderBtn(state, payload) {
      state.editorConfig.settings.buttons.header = state.editorConfig.settings.buttons.header.filter(
        c => c.id !== payload
      );
    },
    updateHeaderBtnOrder(state, payload) {
      state.editorConfig.settings.buttons.header = payload;
    },
    updateHeaderBtn(state, payload) {
      state.editorConfig.settings.buttons.header = state.editorConfig.settings.buttons.header.map(
        c => {
          if (c.id === payload.id) {
            if ('newID' in payload) return { ...c, id: payload.newID };

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
        type: 'button',
        icon: 'at',
        label: '',
        color: '#000000',
        style: 'text',
        items: [],
      });
      state.key++;
    },

    removeHeaderDropdownBtn(state, payload) {
      console.log(payload);
      state.editorConfig.settings.buttons.header = state.editorConfig.settings.buttons.header.map(
        c => {
          if (c.id === payload.id) {
            c.items = c.items.filter(c => c.id !== payload.obj.id);
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

      state.key++;
    },

    updateDropdownBtn(state, payload) {
      state.editorConfig.settings.buttons.header = state.editorConfig.settings.buttons.header.map(
        c => {
          if (c.id === payload.id) {
            c.items = c.items.map(i => {
              if (i.id === payload.obj.id) {
                if ('newID' in payload.obj)
                  return { ...c, id: payload.obj.newID };

                return { ...i, ...payload.obj };
              }

              return i;
            });
          }

          return c;
        }
      );
    },
  },
  actions: {},
  modules: {},
  getters: {
    getHeaderBtns: state => {
      return state.editorConfig.settings.buttons.header;
    },
  },
});
