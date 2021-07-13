export default {
  state: () => ({
    id: 0,
    idArr: [],
    fid: 0,
    fidArr: [],
    tid: 0,
    tidArr: [],
    settings: {
      variablesToEdit: ['varName1', 'varName2'],
      buttons: {
        header: {
          left: [],
          right: [],
        },
        footer: {
          left: [],
          right: [],
        },
        textInsertPlugin: [],
      },
    },
  }),
  mutations: {
    //Left
    updateVariableEditorLeftOrder(state, payload) {
      state.settings.buttons.header.left = payload;
    },

    deleteVariableEditorLeftButton(state, payload) {
      state.settings.buttons.header.left = state.settings.buttons.header.left.filter(
        c => c.id !== payload
      );

      state.idArr = state.idArr.filter(c => c != payload);
    },

    addVariableEditorLeftButton(state) {
      state.settings.buttons.header.left.push({
        id: `ve-btn-${state.id}`,
        label: `Left ${state.id}`,
        icon: '',
      });
      state.idArr.push(`ve-btn-${state.id}`);
      state.id++;
    },

    updateVariableEditorLeftButton(state, payload) {
      state.settings.buttons.header.left = state.settings.buttons.header.left.map(
        c => {
          if (c.id === payload.id) {
            if (payload.newID) {
              state.idArr = state.idArr.filter(c => c !== payload.id);
              state.idArr.push(payload.newID);
              return { ...c, id: payload.newID };
            }

            return { ...c, ...payload };
          }

          return c;
        }
      );
    },

    //Right
    updateVariableEditorRightOrder(state, payload) {
      state.settings.buttons.header.right = payload;
    },

    deleteVariableEditorRightButton(state, payload) {
      state.settings.buttons.header.right = state.settings.buttons.header.right.filter(
        c => c.id !== payload
      );

      state.idArr = state.idArr.filter(c => c != payload);
    },

    addVariableEditorRightButton(state) {
      state.settings.buttons.header.right.push({
        id: `ve-btn-${state.id}`,
        label: `Right ${state.id}`,
        icon: '',
      });
      state.idArr.push(`ve-btn-${state.id}`);
      state.id++;
    },

    updateVariableEditorRightButton(state, payload) {
      state.settings.buttons.header.right = state.settings.buttons.header.right.map(
        c => {
          if (c.id === payload.id) {
            if (payload.newID) {
              state.idArr = state.idArr.filter(c => c !== payload.id);
              state.idArr.push(payload.newID);
              return { ...c, id: payload.newID };
            }

            return { ...c, ...payload };
          }

          return c;
        }
      );
    },

    //Footer left
    updateVEFooterLeftOrder(state, payload) {
      state.settings.buttons.footer.left = payload;
    },

    deleteVEFooterLeftButton(state, payload) {
      state.settings.buttons.footer.left = state.settings.buttons.footer.left.filter(
        c => c.id !== payload
      );

      state.fidArr = state.fidArr.filter(c => c != payload);
    },

    addVEFooterLeftButton(state) {
      state.settings.buttons.footer.left.push({
        id: `vf-btn-${state.fid}`,
        label: `Left ${state.fid}`,
        icon: '',
      });
      state.fidArr.push(`vf-btn-${state.fid}`);
      state.fid++;
    },

    updateVEFooterLeftButton(state, payload) {
      state.settings.buttons.footer.left = state.settings.buttons.footer.left.map(
        c => {
          if (c.id === payload.id) {
            if (payload.newID) {
              state.fidArr = state.fidArr.filter(c => c !== payload.id);
              state.fidArr.push(payload.newID);
              return { ...c, id: payload.newID };
            }

            return { ...c, ...payload };
          }

          return c;
        }
      );
    },

    updateVEFooterRightOrder(state, payload) {
      state.settings.buttons.footer.right = payload;
    },

    deleteVEFooterRightButton(state, payload) {
      state.settings.buttons.footer.right = state.settings.buttons.footer.right.filter(
        c => c.id !== payload
      );

      state.fidArr = state.fidArr.filter(c => c != payload);
    },

    addVEFooterRightButton(state) {
      state.settings.buttons.footer.right.push({
        id: `vf-btn-${state.fid}`,
        label: `Right ${state.fid}`,
        icon: '',
      });
      state.fidArr.push(`vf-btn-${state.fid}`);
      state.fid++;
    },

    updateVEFooterRightButton(state, payload) {
      state.settings.buttons.footer.right = state.settings.buttons.footer.right.map(
        c => {
          if (c.id === payload.id) {
            if (payload.newID) {
              state.fidArr = state.fidArr.filter(c => c !== payload.id);
              state.fidArr.push(payload.newID);
              return { ...c, id: payload.newID };
            }

            return { ...c, ...payload };
          }

          return c;
        }
      );
    },

    //Text Insert
    updateVETextInsertOrder(state, payload) {
      state.settings.buttons.textInsertPlugin = payload;
    },

    deleteVETextInsertButton(state, payload) {
      state.settings.buttons.textInsertPlugin = state.settings.buttons.textInsertPlugin.filter(
        c => c.id !== payload
      );

      state.tidArr = state.tidArr.filter(c => c != payload);
    },

    addVETextInsertButton(state) {
      state.settings.buttons.textInsertPlugin.push({
        id: `ti-btn-${state.tid}`,
        label: `Text Insert ${state.tid}`,
        icon: '',
      });
      state.tidArr.push(`ti-btn-${state.tid}`);
      state.tid++;
    },

    updateVETextInsertButton(state, payload) {
      state.settings.buttons.textInsertPlugin = state.settings.buttons.textInsertPlugin.map(
        c => {
          if (c.id === payload.id) {
            if (payload.newID) {
              state.tidArr = state.tidArr.filter(c => c !== payload.id);
              state.tidArr.push(payload.newID);
              return { ...c, id: payload.newID };
            }

            return { ...c, ...payload };
          }

          return c;
        }
      );
    },
  },
  actions: {},
  getters: {
    headerButtons: state => state.settings.buttons.header,
    footerButtons: state => state.settings.buttons.footer,
    getVEConfigObj: state => state,
  },
};
