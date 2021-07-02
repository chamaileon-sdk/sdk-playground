import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idArr: [],
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
  },
  actions: {},
  modules: {},
  getters: {
    getHeaderBtns: state => {
      return state.editorConfig.settings.buttons.header;
    },
    getElements: state => {
      return state.editorConfig.settings.elements;
    },
  },
});
