export default {
  state: () => ({
    idArr: [],
    key: 0,
    blIDArr: [],
    blKey: 0,
    tiIDArr: [],
    tiID: 0,
    document: {},
    user: {
      enabled: true,
      name: 'Your Username',
      avatar:
        'https://www.indiewire.com/wp-content/uploads/2019/03/shutterstock_5885988bd.jpg',
    },
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
        icon: 'table-lock',
        id: 'Block Lock',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sint exercitationem blanditiis vel facere consequuntur nisi mollitia magnam amet quibusdam tempore ullam quasi molestias nostrum corporis dolorem quis ea magni.',
        state: 'disabled',
      },
      variableSystem: {
        icon: 'iframe-variable-outline',
        id: 'Variable System',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sint exercitationem blanditiis vel facere consequuntur nisi mollitia magnam amet quibusdam tempore ullam quasi molestias nostrum corporis dolorem quis ea magni.',
        state: 'disabled',
      },
    },
    autoSaveInterval: 15000,
  }),
  mutations: {
    addEditorBtn(state) {
      state.settings.buttons.header.push({
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
    removeEditorBtn(state, payload) {
      state.settings.buttons.header = state.settings.buttons.header.filter(
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
    updateEditorBtnOrder(state, payload) {
      state.settings.buttons.header = payload;
    },
    updateEditorBtn(state, payload) {
      state.settings.buttons.header = state.settings.buttons.header.map(c => {
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
      });
    },

    //Dropdown
    addEditorDropdown(state) {
      state.settings.buttons.header.push({
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

    removeEditorDropdownBtn(state, payload) {
      state.settings.buttons.header = state.settings.buttons.header.map(c => {
        if (c.id === payload.id) {
          c.items = c.items.filter(c => c.id !== payload.obj.id);
          state.idArr = state.idArr.filter(c => c !== payload.obj.id);
        }

        return c;
      });
    },

    addEditorDropdownBtn(state, id) {
      state.settings.buttons.header = state.settings.buttons.header.map(c => {
        if (c.id === id) {
          c.items.push({
            id: `yourBtn-${state.key}`,
            icon: 'at',
            label: ``,
          });
        }

        return c;
      });

      state.idArr.push(`yourBtn-${state.key}`);
      state.key++;
    },

    updateEditorDropdownBtn(state, payload) {
      state.settings.buttons.header = state.settings.buttons.header.map(c => {
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
      });
    },

    //Elements
    toggleElement(state, payload) {
      state.settings.elements[payload.type][payload.element] = !state.settings
        .elements[payload.type][payload.element];
    },

    //BlockLibs
    addBlockLibs(state) {
      state.blockLibraries.push({
        id: `${state.blKey}`,
        label: `Block Library ${state.blKey}`,
        accessLevel: 'readOnly',
      });

      state.blIDArr.push(`${state.blKey}`);
      state.blKey++;
    },

    removeBlockLibs(state, payload) {
      state.blockLibraries = state.blockLibraries.filter(c => c.id !== payload);

      state.blIDArr = state.blIDArr.filter(c => c !== payload);
    },

    updateBlockLibsOrder(state, payload) {
      state.blockLibraries = payload;
    },
    updateBlockLibs(state, payload) {
      state.blockLibraries = state.blockLibraries.map(c => {
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
      });
    },

    //Text insert
    updateTextInsertOrder(state, payload) {
      state.settings.buttons.textInsert = payload;
    },

    deleteTextInsertButton(state, payload) {
      state.settings.buttons.textInsert = state.settings.buttons.textInsert.filter(
        c => c.id !== payload
      );

      state.tiIDArr = state.tiIDArr.filter(c => c != payload);
    },

    addTextInsertButton(state) {
      state.settings.buttons.textInsert.push({
        id: `ti-btn-${state.tiID}`,
        label: `Button`,
        icon: '',
      });
      state.tiIDArr.push(`ti-btn-${state.tiID}`);
      state.tiID++;
    },

    updateTextInsertButton(state, payload) {
      state.settings.buttons.textInsert = state.settings.buttons.textInsert.map(
        c => {
          if (c.id === payload.id) {
            if (payload.newID) {
              state.tiIDArr = state.tiIDArr.filter(c => c !== payload.id);
              state.tiIDArr.push(payload.newID);
              return { ...c, id: payload.newID };
            }

            return { ...c, ...payload };
          }

          return c;
        }
      );
    },

    //Addons
    updateAddonState(state, payload) {
      const obj = state.addons;
      for (const addon in obj) {
        if (obj[addon].id === payload.id)
          return (obj[addon].state = payload.state);
      }
    },

    //User
    updateUser(state, payload) {
      state.user = { ...state.user, ...payload };
    },

    //Autosave
    updateAutosave(state, payload) {
      state.autoSaveInterval = parseInt(payload);
    },
  },

  actions: {},
  getters: {
    getHeaderBtns: state => {
      return state.settings.buttons.header;
    },
    getElements: state => {
      return state.settings.elements;
    },
    getBlockLibs: state => {
      return state.blockLibraries;
    },
    getAddonStateById: state => id => {
      const obj = state.addons;
      for (const addon in obj) {
        if (obj[addon].id === id) return obj[addon].state;
      }
    },
  },
};
