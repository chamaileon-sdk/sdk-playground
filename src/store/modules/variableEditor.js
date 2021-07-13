export default {
  state: () => ({
    id: 0,
    idArr: [],
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
  },
  actions: {},
  getters: {
    headerButtons: state => state.settings.buttons.header,
    getVEConfigObj: state => state,
  },
};
